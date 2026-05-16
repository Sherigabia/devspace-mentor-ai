// IBM watsonx.ai integration layer
// Server-side only - never expose credentials to client

import type {
  WatsonxGenerateRequest,
  WatsonxGenerateResponse,
} from '@/types/ai';

// Environment variable helpers
function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

// Watsonx configuration
const WATSONX_CONFIG = {
  apiKey: () => getEnvVar('WATSONX_API_KEY'),
  projectId: () => getEnvVar('WATSONX_PROJECT_ID'),
  url: () => getEnvVar('WATSONX_URL'),
};

// Default model configuration
export const GRANITE_MODELS = {
  CODE: 'ibm/granite-13b-chat-v2',
  INSTRUCT: 'ibm/granite-13b-instruct-v2',
} as const;

// Default generation parameters
const DEFAULT_PARAMS = {
  max_new_tokens: 1024,
  temperature: 0.7,
  top_p: 0.9,
  top_k: 50,
  repetition_penalty: 1.1,
};

/**
 * Generate text using IBM watsonx.ai Granite models
 * Server-side only
 */
export async function generateWithWatsonx(
  prompt: string,
  options?: {
    modelId?: string;
    maxTokens?: number;
    temperature?: number;
  }
): Promise<string> {
  try {
    // Validate configuration before making request
    if (!isWatsonxConfigured()) {
      throw new Error(
        'Watsonx.ai is not properly configured. Please check that WATSONX_API_KEY, WATSONX_PROJECT_ID, and WATSONX_URL are set in your environment variables.'
      );
    }

    const config = {
      apiKey: WATSONX_CONFIG.apiKey(),
      projectId: WATSONX_CONFIG.projectId(),
      url: WATSONX_CONFIG.url(),
    };

    const requestBody: WatsonxGenerateRequest = {
      model_id: options?.modelId || GRANITE_MODELS.INSTRUCT,
      input: prompt,
      parameters: {
        ...DEFAULT_PARAMS,
        max_new_tokens: options?.maxTokens || DEFAULT_PARAMS.max_new_tokens,
        temperature: options?.temperature || DEFAULT_PARAMS.temperature,
      },
      project_id: config.projectId,
    };

    const response = await fetch(`${config.url}/ml/v1/text/generation?version=2023-05-29`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log('[Watsonx] Request URL:', `${config.url}/ml/v1/text/generation?version=2023-05-29`);
    console.log('[Watsonx] Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Watsonx API error response:', errorText);
      
      // Provide more helpful error messages
      if (response.status === 401) {
        throw new Error('Watsonx authentication failed. Please check your WATSONX_API_KEY.');
      } else if (response.status === 404) {
        throw new Error('Watsonx endpoint not found. Please verify your WATSONX_URL and WATSONX_PROJECT_ID.');
      } else if (response.status === 429) {
        throw new Error('Watsonx rate limit exceeded. Please try again later.');
      }
      
      throw new Error(`Watsonx API error: ${response.status} - ${errorText}`);
    }

    const data: WatsonxGenerateResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error('No results returned from Watsonx API');
    }

    return data.results[0].generated_text.trim();
  } catch (error) {
    console.error('Watsonx generation error:', error);
    
    // Re-throw with more context if it's a generic error
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Failed to generate response from Watsonx.ai');
  }
}

/**
 * Generate text with streaming support (future enhancement)
 * Currently returns full response
 */
export async function generateStreamWithWatsonx(
  prompt: string,
  options?: {
    modelId?: string;
    maxTokens?: number;
    temperature?: number;
  }
): Promise<string> {
  // For now, use non-streaming version
  // Can be enhanced later with SSE support
  return generateWithWatsonx(prompt, options);
}

/**
 * Check if watsonx credentials are configured
 */
export function isWatsonxConfigured(): boolean {
  try {
    WATSONX_CONFIG.apiKey();
    WATSONX_CONFIG.projectId();
    WATSONX_CONFIG.url();
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate watsonx connection
 */
export async function validateWatsonxConnection(): Promise<boolean> {
  try {
    if (!isWatsonxConfigured()) {
      return false;
    }

    // Simple test prompt
    await generateWithWatsonx('Hello', {
      maxTokens: 10,
    });

    return true;
  } catch (error) {
    console.error('Watsonx connection validation failed:', error);
    return false;
  }
}

// Made with Bob
