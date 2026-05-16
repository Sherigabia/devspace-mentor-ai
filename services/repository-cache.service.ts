/**
 * Repository Analysis Cache Service
 * Manages Supabase storage for AI analysis results
 * Prevents duplicate AI calls and improves performance
 * Server-side only
 */

import { supabase, TABLES } from '@/lib/supabase';
import type { AIRepositoryAnalysis } from './repository-ai-engine.service';

export interface CachedAnalysis {
  id: string;
  repository_id: string;
  user_id: string;
  analysis_type: 'full' | 'quick' | 'documentation' | 'learning_path';
  analysis_data: AIRepositoryAnalysis;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error_message?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface StoredRepository {
  id: string;
  user_id: string;
  repo_name: string;
  repo_full_name: string;
  repo_url: string;
  default_branch: string;
  language?: string;
  description?: string;
  stars: number;
  forks: number;
  last_synced_at?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Get cached analysis for a repository
 * Returns null if no valid cache exists
 */
export async function getCachedAnalysis(
  userId: string,
  repoFullName: string
): Promise<AIRepositoryAnalysis | null> {
  try {
    // First, get the repository record
    const { data: repo, error: repoError } = await supabase
      .from(TABLES.USER_REPOSITORIES)
      .select('id')
      .eq('user_id', userId)
      .eq('repo_full_name', repoFullName)
      .single();

    if (repoError || !repo) {
      return null;
    }

    // Get the most recent completed analysis
    const { data: analysis, error: analysisError } = await supabase
      .from(TABLES.REPOSITORY_ANALYSES)
      .select('*')
      .eq('repository_id', repo.id)
      .eq('user_id', userId)
      .eq('analysis_type', 'full')
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(1)
      .single();

    if (analysisError || !analysis) {
      return null;
    }

    // Check if cache is still fresh (less than 7 days old)
    const cacheAge = Date.now() - new Date(analysis.completed_at).getTime();
    const maxCacheAge = 7 * 24 * 60 * 60 * 1000; // 7 days

    if (cacheAge > maxCacheAge) {
      return null;
    }

    return analysis.analysis_data as AIRepositoryAnalysis;
  } catch (error) {
    console.error('Error getting cached analysis:', error);
    return null;
  }
}

/**
 * Store repository metadata
 * Creates or updates repository record
 */
export async function storeRepository(
  userId: string,
  repoData: {
    name: string;
    fullName: string;
    url: string;
    defaultBranch: string;
    language?: string;
    description?: string;
    stars: number;
    forks: number;
  }
): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from(TABLES.USER_REPOSITORIES)
      .upsert(
        {
          user_id: userId,
          repo_name: repoData.name,
          repo_full_name: repoData.fullName,
          repo_url: repoData.url,
          default_branch: repoData.defaultBranch,
          language: repoData.language,
          description: repoData.description,
          stars: repoData.stars,
          forks: repoData.forks,
          last_synced_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,repo_full_name',
        }
      )
      .select('id')
      .single();

    if (error) {
      console.error('Error storing repository:', error);
      return null;
    }

    return data.id;
  } catch (error) {
    console.error('Error storing repository:', error);
    return null;
  }
}

/**
 * Store AI analysis result
 * Creates a new analysis record
 */
export async function storeAnalysis(
  userId: string,
  repositoryId: string,
  analysis: AIRepositoryAnalysis
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from(TABLES.REPOSITORY_ANALYSES)
      .insert({
        repository_id: repositoryId,
        user_id: userId,
        analysis_type: 'full',
        analysis_data: analysis,
        status: 'completed',
        completed_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error storing analysis:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error storing analysis:', error);
    return false;
  }
}

/**
 * Mark analysis as failed
 * Updates analysis record with error information
 */
export async function markAnalysisFailed(
  userId: string,
  repositoryId: string,
  errorMessage: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from(TABLES.REPOSITORY_ANALYSES)
      .insert({
        repository_id: repositoryId,
        user_id: userId,
        analysis_type: 'full',
        analysis_data: {},
        status: 'failed',
        error_message: errorMessage,
      });

    if (error) {
      console.error('Error marking analysis as failed:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error marking analysis as failed:', error);
    return false;
  }
}

/**
 * Get user's repositories
 * Returns list of repositories for a user
 */
export async function getUserRepositories(
  userId: string
): Promise<StoredRepository[]> {
  try {
    const { data, error } = await supabase
      .from(TABLES.USER_REPOSITORIES)
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error getting user repositories:', error);
      return [];
    }

    return data as StoredRepository[];
  } catch (error) {
    console.error('Error getting user repositories:', error);
    return [];
  }
}

/**
 * Delete repository and all associated analyses
 * Cascade delete handled by database
 */
export async function deleteRepository(
  userId: string,
  repoFullName: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from(TABLES.USER_REPOSITORIES)
      .delete()
      .eq('user_id', userId)
      .eq('repo_full_name', repoFullName);

    if (error) {
      console.error('Error deleting repository:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting repository:', error);
    return false;
  }
}

/**
 * Check if analysis exists for repository
 * Returns true if any analysis exists (completed or failed)
 */
export async function hasAnalysis(
  userId: string,
  repoFullName: string
): Promise<boolean> {
  try {
    // Get repository ID
    const { data: repo, error: repoError } = await supabase
      .from(TABLES.USER_REPOSITORIES)
      .select('id')
      .eq('user_id', userId)
      .eq('repo_full_name', repoFullName)
      .single();

    if (repoError || !repo) {
      return false;
    }

    // Check for any analysis
    const { data, error } = await supabase
      .from(TABLES.REPOSITORY_ANALYSES)
      .select('id')
      .eq('repository_id', repo.id)
      .eq('user_id', userId)
      .eq('analysis_type', 'full')
      .limit(1)
      .single();

    return !error && !!data;
  } catch (error) {
    return false;
  }
}

/**
 * Invalidate cache for a repository
 * Deletes all analyses for the repository
 */
export async function invalidateCache(
  userId: string,
  repoFullName: string
): Promise<boolean> {
  try {
    // Get repository ID
    const { data: repo, error: repoError } = await supabase
      .from(TABLES.USER_REPOSITORIES)
      .select('id')
      .eq('user_id', userId)
      .eq('repo_full_name', repoFullName)
      .single();

    if (repoError || !repo) {
      return false;
    }

    // Delete all analyses
    const { error } = await supabase
      .from(TABLES.REPOSITORY_ANALYSES)
      .delete()
      .eq('repository_id', repo.id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error invalidating cache:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error invalidating cache:', error);
    return false;
  }
}

// Made with Bob