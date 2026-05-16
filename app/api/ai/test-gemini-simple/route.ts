/**
 * Simple Gemini Test
 * GET /api/ai/test-gemini-simple
 */

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        message: 'GEMINI_API_KEY not set',
      });
    }

    console.log('[Simple Test] API Key exists:', !!apiKey);
    console.log('[Simple Test] API Key length:', apiKey.length);
    console.log('[Simple Test] API Key starts with:', apiKey.substring(0, 10));

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    console.log('[Simple Test] Sending test prompt...');
    
    const result = await model.generateContent('Say hello');
    const response = await result.response;
    const text = response.text();

    console.log('[Simple Test] Success! Response:', text);

    return NextResponse.json({
      success: true,
      message: 'Gemini works!',
      response: text,
    });
  } catch (error: any) {
    console.error('[Simple Test] Error:', error);
    console.error('[Simple Test] Error message:', error?.message);
    console.error('[Simple Test] Error response:', error?.response?.data);
    
    return NextResponse.json({
      success: false,
      message: error?.message || 'Unknown error',
      details: {
        name: error?.name,
        message: error?.message,
        status: error?.status,
        statusText: error?.statusText,
      } as any,
    });
  }
}

// Made with Bob
