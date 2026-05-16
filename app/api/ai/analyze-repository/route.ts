/**
 * API Route: Analyze Repository
 * POST /api/ai/analyze-repository
 * 
 * Complete Repository Intelligence Pipeline:
 * GitHub → Context Builder → watsonx.ai → Structured Output → Supabase Cache
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createGitHubService } from '@/services/github.service';
import { buildRepositoryContext } from '@/services/repository-context.service';
import { analyzeRepositoryWithAI, validateAnalysisQuality } from '@/services/repository-ai-engine.service';
import {
  getCachedAnalysis,
  storeRepository,
  storeAnalysis,
  markAnalysisFailed,
} from '@/services/repository-cache.service';

interface AnalyzeRepositoryRequest {
  repoFullName: string;
  forceRefresh?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    console.log('[API] Starting repository analysis...');
    
    // Authenticate user
    const { userId } = await auth();
    
    if (!userId) {
      console.error('[API] Authentication failed: No userId');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('[API] User authenticated:', userId);

    // Parse request body
    const body: AnalyzeRepositoryRequest = await request.json();
    console.log('[API] Request body:', body);

    // Validate required fields
    if (!body.repoFullName) {
      console.error('[API] Missing repoFullName');
      return NextResponse.json(
        {
          error: 'Missing required field: repoFullName',
        },
        { status: 400 }
      );
    }

    // Parse owner and repo from full name
    const [owner, repo] = body.repoFullName.split('/');
    
    if (!owner || !repo) {
      console.error('[API] Invalid repo format:', body.repoFullName);
      return NextResponse.json(
        {
          error: 'Invalid repository full name format. Expected: owner/repo',
        },
        { status: 400 }
      );
    }

    console.log('[API] Analyzing repository:', owner, '/', repo);

    // Get GitHub OAuth token from Clerk
    console.log('[API] Fetching GitHub token from Clerk...');
    const { clerkClient } = await import('@clerk/nextjs/server');
    const client = await clerkClient();
    const provider = "oauth_github";
    
    const clerkResponse = await client.users.getUserOauthAccessToken(
      userId,
      provider
    );

    if (!clerkResponse.data || clerkResponse.data.length === 0) {
      console.error('[API] GitHub not connected for user');
      return NextResponse.json(
        {
          error: 'GitHub not connected',
          message: 'Please connect your GitHub account first'
        },
        { status: 400 }
      );
    }

    const githubToken = clerkResponse.data[0].token;

    if (!githubToken) {
      console.error('[API] GitHub token not found in Clerk response');
      return NextResponse.json(
        { error: 'GitHub token not found' },
        { status: 400 }
      );
    }

    console.log('[API] GitHub token obtained successfully');

    const repoFullName = body.repoFullName;

    // Check cache first (unless force refresh)
    if (!body.forceRefresh) {
      console.log('[API] Checking cache...');
      const cachedAnalysis = await getCachedAnalysis(userId, repoFullName);
      
      if (cachedAnalysis) {
        console.log('[API] Cache hit! Returning cached analysis');
        return NextResponse.json(
          {
            analysis: cachedAnalysis,
            cached: true,
            message: 'Analysis retrieved from cache',
          },
          { status: 200 }
        );
      }
      console.log('[API] Cache miss, proceeding with fresh analysis');
    }

    // STEP 1: Fetch repository data from GitHub
    console.log('[API] Step 1: Fetching repository data from GitHub...');
    const githubService = createGitHubService(githubToken);
    const repository = await githubService.getRepository(owner, repo);
    console.log('[API] Repository data fetched:', repository.name);

    // STEP 2: Store repository metadata in Supabase
    console.log('[API] Step 2: Storing repository metadata in Supabase...');
    const repositoryId = await storeRepository(userId, {
      name: repository.name,
      fullName: repository.full_name,
      url: repository.html_url,
      defaultBranch: repository.default_branch,
      language: repository.language || undefined,
      description: repository.description || undefined,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    });

    if (!repositoryId) {
      console.error('[API] Failed to store repository metadata');
      return NextResponse.json(
        { error: 'Failed to store repository metadata' },
        { status: 500 }
      );
    }
    console.log('[API] Repository stored with ID:', repositoryId);

    // STEP 3: Build repository context
    console.log('[API] Step 3: Building repository context...');
    const context = await buildRepositoryContext(
      githubService,
      owner,
      repo
    );
    console.log('[API] Context built successfully. Files:', context.stats.totalFiles);

    // STEP 4: Analyze with watsonx.ai
    console.log('[API] Step 4: Analyzing with watsonx.ai...');
    let analysis;
    try {
      analysis = await analyzeRepositoryWithAI(context);
      console.log('[API] AI analysis completed successfully');
      
      // Validate analysis quality
      const isQualityAnalysis = validateAnalysisQuality(analysis);
      
      if (!isQualityAnalysis) {
        console.warn('[API] Analysis quality below threshold');
      }
    } catch (aiError) {
      console.error('[API] AI analysis failed:', aiError);
      console.error('[API] Error details:', aiError instanceof Error ? aiError.stack : aiError);
      
      // Mark as failed in database
      await markAnalysisFailed(
        userId,
        repositoryId,
        aiError instanceof Error ? aiError.message : 'AI analysis failed'
      );
      
      return NextResponse.json(
        {
          error: 'analysis_unavailable',
          message: aiError instanceof Error ? aiError.message : 'Repository analysis could not be completed',
          details: aiError instanceof Error ? aiError.stack : String(aiError),
          fallback: true,
        },
        { status: 500 }
      );
    }

    // STEP 5: Store analysis in Supabase cache
    console.log('[API] Step 5: Caching analysis in Supabase...');
    const stored = await storeAnalysis(userId, repositoryId, analysis);
    
    if (!stored) {
      console.warn('[API] Failed to cache analysis, but returning result');
    } else {
      console.log('[API] Analysis cached successfully');
    }

    // Return successful response
    console.log('[API] Analysis complete! Returning results');
    return NextResponse.json(
      {
        analysis,
        cached: false,
        message: 'Analysis completed successfully',
        repository: {
          name: repository.name,
          fullName: repository.full_name,
          description: repository.description,
          language: repository.language,
          stars: repository.stargazers_count,
          forks: repository.forks_count,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] Repository analysis API error:', error);
    console.error('[API] Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    // Return safe error response
    return NextResponse.json(
      {
        error: 'analysis_failed',
        message: 'Failed to analyze repository',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

// Made with Bob
