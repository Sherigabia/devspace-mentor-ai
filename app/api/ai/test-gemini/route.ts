/**
 * Test Gemini Connection Endpoint
 * GET /api/ai/test-gemini
 * 
 * Tests the Google Gemini AI connection and returns detailed diagnostics
 */

import { NextResponse } from 'next/server';
import { isGeminiConfigured, validateGeminiConnection, generateWithGemini } from '@/lib/gemini';

export async function GET() {
  const diagnostics: Record<string, any> = {
    timestamp: new Date().toISOString(),
    configured: false,
    connectionTest: 'not_attempted',
    error: null,
    config: {
      hasApiKey: false,
    },
  };

  try {
    // Step 1: Check if environment variables are set
    console.log('[TEST] Checking Gemini configuration...');
    
    diagnostics.config.hasApiKey = !!process.env.GEMINI_API_KEY;

    console.log('[TEST] Config check:', diagnostics.config);

    // Step 2: Check if Gemini is configured
    diagnostics.configured = isGeminiConfigured();
    
    if (!diagnostics.configured) {
      console.log('[TEST] Gemini is not configured');
      return NextResponse.json(
        {
          success: false,
          message: 'Gemini AI is not properly configured. Please set GEMINI_API_KEY in your environment variables.',
          diagnostics,
        },
        { status: 200 }
      );
    }

    console.log('[TEST] Gemini is configured, testing connection...');

    // Step 3: Test actual connection with a simple prompt
    diagnostics.connectionTest = 'attempting';
    
    try {
      const testPrompt = 'Say "Hello" in one word.';
      console.log('[TEST] Sending test prompt to Gemini...');
      
      const response = await generateWithGemini(testPrompt, {
        maxTokens: 10,
        temperature: 0.1,
      });
      
      console.log('[TEST] Gemini response:', response);
      
      diagnostics.connectionTest = 'success';
      diagnostics.testResponse = response;

      return NextResponse.json(
        {
          success: true,
          message: 'Gemini AI connection successful!',
          diagnostics,
        },
        { status: 200 }
      );
    } catch (connectionError) {
      console.error('[TEST] Connection test failed:', connectionError);
      
      diagnostics.connectionTest = 'failed';
      diagnostics.error = {
        message: connectionError instanceof Error ? connectionError.message : 'Unknown error',
        stack: connectionError instanceof Error ? connectionError.stack : null,
      } as any;

      return NextResponse.json(
        {
          success: false,
          message: 'Gemini AI connection failed',
          diagnostics,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('[TEST] Test endpoint error:', error);
    
    diagnostics.error = {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : null,
    };

    return NextResponse.json(
      {
        success: false,
        message: 'Test failed with error',
        diagnostics,
      },
      { status: 500 }
    );
  }
}

// Made with Bob