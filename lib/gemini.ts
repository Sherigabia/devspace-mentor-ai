// Google Gemini AI integration layer
// Server-side only - never expose credentials to client

import { GoogleGenerativeAI } from '@google/generative-ai';

// Environment variable helper
function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

// Gemini configuration
const GEMINI_CONFIG = {
  apiKey: () => getEnvVar('GEMINI_API_KEY'),
};

// Default model
export const GEMINI_MODELS = {
  PRO: 'gemini-1.5-pro',
  FLASH: 'gemini-1.5-flash',
} as const;

/**
 * Generate text using Google Gemini AI
 * Server-side only
 */
export async function generateWithGemini(
  prompt: string,
  options?: {
    modelId?: string;
    maxTokens?: number;
    temperature?: number;
  }
): Promise<string> {
  try {
    // Validate configuration
    if (!isGeminiConfigured()) {
      throw new Error(
        'Gemini AI is not properly configured. Please check that GEMINI_API_KEY is set in your environment variables.'
      );
    }

    const apiKey = GEMINI_CONFIG.apiKey();
    const genAI = new GoogleGenerativeAI(apiKey);

    // Get the model
    const model = genAI.getGenerativeModel({
      model: options?.modelId || GEMINI_MODELS.PRO,
    });

    // Configure generation
    const generationConfig = {
      temperature: options?.temperature ?? 0.7,
      maxOutputTokens: options?.maxTokens ?? 2048,
      topP: 0.95,
      topK: 40,
    };

    console.log('[Gemini] Generating response...');
    console.log('[Gemini] Model:', options?.modelId || GEMINI_MODELS.PRO);
    console.log('[Gemini] API Key (first 10 chars):', apiKey.substring(0, 10) + '...');

    // Generate content
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error('No text returned from Gemini API');
    }

    console.log('[Gemini] Response generated successfully');
    return text.trim();
  } catch (error) {
    console.error('[Gemini] Generation error:', error);
    console.error('[Gemini] Error details:', JSON.stringify(error, null, 2));

    // Provide helpful error messages
    if (error instanceof Error) {
      console.error('[Gemini] Error message:', error.message);
      console.error('[Gemini] Error stack:', error.stack);
      
      if (error.message.includes('API_KEY') || error.message.includes('API key') || error.message.includes('401')) {
        throw new Error('Gemini authentication failed. Please check your GEMINI_API_KEY.');
      } else if (error.message.includes('quota') || error.message.includes('429')) {
        throw new Error('Gemini API quota exceeded. Please check your usage limits.');
      } else if (error.message.includes('SAFETY')) {
        throw new Error('Content was blocked by Gemini safety filters.');
      }
      throw error;
    }

    throw new Error('Failed to generate response from Gemini AI');
  }
}

/**
 * Generate text with streaming support
 * Returns full response (streaming can be added later)
 */
export async function generateStreamWithGemini(
  prompt: string,
  options?: {
    modelId?: string;
    maxTokens?: number;
    temperature?: number;
  }
): Promise<string> {
  // For now, use non-streaming version
  // Can be enhanced later with streaming support
  return generateWithGemini(prompt, options);
}

/**
 * Check if Gemini credentials are configured
 */
export function isGeminiConfigured(): boolean {
  try {
    GEMINI_CONFIG.apiKey();
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate Gemini connection
 */
export async function validateGeminiConnection(): Promise<boolean> {
  try {
    if (!isGeminiConfigured()) {
      return false;
    }

    // Simple test prompt
    await generateWithGemini('Say "Hello" in one word.', {
      maxTokens: 10,
      temperature: 0.1,
    });

    return true;
  } catch (error) {
    console.error('[Gemini] Connection validation failed:', error);
    return false;
  }
}

// Made with Bob