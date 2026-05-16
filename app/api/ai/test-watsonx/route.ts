/**
 * Test Watsonx Connection Endpoint
 * GET /api/ai/test-watsonx
 * 
 * Tests the watsonx.ai connection and returns detailed diagnostics
 */

import { NextResponse } from 'next/server';
import { isWatsonxConfigured, validateWatsonxConnection, generateWithWatsonx } from '@/lib/watsonx';

export async function GET() {
  const diagnostics: Record<string, any> = {
    timestamp: new Date().toISOString(),
    configured: false,
    connectionTest: 'not_attempted',
    error: null,
    config: {
      hasApiKey: false,
      hasProjectId: false,
      hasUrl: false,
      url: null,
    },
  };

  try {
    // Step 1: Check if environment variables are set
    console.log('[TEST] Checking watsonx configuration...');
    
    diagnostics.config.hasApiKey = !!process.env.WATSONX_API_KEY;
    diagnostics.config.hasProjectId = !!process.env.WATSONX_PROJECT_ID;
    diagnostics.config.hasUrl = !!process.env.WATSONX_URL;
    diagnostics.config.url = process.env.WATSONX_URL || null;

    console.log('[TEST] Config check:', diagnostics.config);

    // Step 2: Check if watsonx is configured
    diagnostics.configured = isWatsonxConfigured();
    
    if (!diagnostics.configured) {
      console.log('[TEST] Watsonx is not configured');
      return NextResponse.json(
        {
          success: false,
          message: 'Watsonx.ai is not properly configured',
          diagnostics,
        },
        { status: 200 }
      );
    }

    console.log('[TEST] Watsonx is configured, testing connection...');

    // Step 3: Test actual connection with a simple prompt
    diagnostics.connectionTest = 'attempting';
    
    try {
      const testPrompt = 'Say "Hello" in one word.';
      console.log('[TEST] Sending test prompt to watsonx...');
      
      const response = await generateWithWatsonx(testPrompt, {
        maxTokens: 10,
        temperature: 0.1,
      });
      
      console.log('[TEST] Watsonx response:', response);
      
      diagnostics.connectionTest = 'success';
      diagnostics.testResponse = response;

      return NextResponse.json(
        {
          success: true,
          message: 'Watsonx.ai connection successful!',
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
          message: 'Watsonx.ai connection failed',
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