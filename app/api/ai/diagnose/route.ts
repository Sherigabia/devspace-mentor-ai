/**
 * Complete Diagnostic Endpoint
 * GET /api/ai/diagnose
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
    },
    envVars: {
      GEMINI_API_KEY: {
        exists: !!process.env.GEMINI_API_KEY,
        length: process.env.GEMINI_API_KEY?.length || 0,
        preview: process.env.GEMINI_API_KEY?.substring(0, 15) + '...' || 'NOT SET',
      },
      CLERK_SECRET_KEY: {
        exists: !!process.env.CLERK_SECRET_KEY,
      },
      SUPABASE_URL: {
        exists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      },
    },
    packages: {
      geminiInstalled: false,
    },
  };

  try {
    // Check if @google/generative-ai is installed
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    diagnostics.packages.geminiInstalled = true;

    // Try to create instance
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        
        console.log('[Diagnose] Attempting Gemini API call...');
        const result = await model.generateContent('Hello');
        const response = await result.response;
        const text = response.text();
        
        return NextResponse.json({
          success: true,
          message: 'Everything works!',
          geminiResponse: text,
          diagnostics,
        });
      } catch (geminiError: any) {
        console.error('[Diagnose] Gemini error:', geminiError);
        
        return NextResponse.json({
          success: false,
          message: 'Gemini API call failed',
          error: {
            message: geminiError?.message,
            name: geminiError?.name,
            stack: geminiError?.stack,
            cause: geminiError?.cause,
            response: geminiError?.response?.data,
          },
          diagnostics,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'GEMINI_API_KEY not set',
        diagnostics,
      });
    }
  } catch (importError: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to import @google/generative-ai',
      error: importError?.message,
      diagnostics,
    });
  }
}

// Made with Bob
