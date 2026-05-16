// API Route: AI Chat Assistant
// POST /api/ai/chat

import { NextRequest, NextResponse } from 'next/server';
import { chatWithRepoAssistant } from '@/services/ai.service';
import type { ChatRequest } from '@/types/ai';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ChatRequest = await request.json();

    // Validate required fields
    if (!body.messages || body.messages.length === 0) {
      return NextResponse.json(
        {
          error: 'Missing required field: messages',
        },
        { status: 400 }
      );
    }

    // Call AI service
    const response = await chatWithRepoAssistant(body);

    // Return successful response
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Chat API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Made with Bob
