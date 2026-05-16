// API Route: Generate Documentation
// POST /api/ai/generate-docs

import { NextRequest, NextResponse } from 'next/server';
import { generateDocumentation } from '@/services/ai.service';
import type { DocumentationRequest } from '@/types/ai';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: DocumentationRequest = await request.json();

    // Validate required fields
    if (!body.repositoryName || !body.repositoryUrl || !body.technologies) {
      return NextResponse.json(
        {
          error: 'Missing required fields: repositoryName, repositoryUrl, and technologies',
        },
        { status: 400 }
      );
    }

    // Validate technologies array
    if (!Array.isArray(body.technologies) || body.technologies.length === 0) {
      return NextResponse.json(
        {
          error: 'technologies must be a non-empty array',
        },
        { status: 400 }
      );
    }

    // Call AI service
    const documentation = await generateDocumentation(body);

    // Return successful response
    return NextResponse.json(documentation, { status: 200 });
  } catch (error) {
    console.error('Documentation generation API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to generate documentation',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Made with Bob
