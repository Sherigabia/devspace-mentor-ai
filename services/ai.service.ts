// AI Service Layer
// Handles all AI-related business logic and orchestration

import { generateWithWatsonx, isWatsonxConfigured } from '@/lib/watsonx';
import type {
  RepositoryAnalysisRequest,
  RepositoryAnalysisResponse,
  ChatRequest,
  ChatResponse,
  DocumentationRequest,
  DocumentationResponse,
  LearningPathRequest,
  LearningPathResponse,
  ChatMessage,
} from '@/types/ai';

// Mock mode flag
const USE_MOCK_MODE = !isWatsonxConfigured();

// ============================================================================
// Utilities
// ============================================================================

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Analyze a repository using AI
 */
export async function analyzeRepository(
  request: RepositoryAnalysisRequest
): Promise<RepositoryAnalysisResponse> {
  if (USE_MOCK_MODE) {
    return getMockRepositoryAnalysis(request);
  }

  try {
    const prompt = buildRepositoryAnalysisPrompt(request);
    const response = await generateWithWatsonx(prompt, {
      maxTokens: 2048,
      temperature: 0.7,
    });

    return parseRepositoryAnalysisResponse(response);
  } catch (error) {
    console.error('Repository analysis error:', error);
    // Fallback to mock on error
    return getMockRepositoryAnalysis(request);
  }
}

/**
 * Chat with AI repository assistant
 */
export async function chatWithRepoAssistant(
  request: ChatRequest
): Promise<ChatResponse> {
  if (USE_MOCK_MODE) {
    return getMockChatResponse(request);
  }

  try {
    const prompt = buildChatPrompt(request);
    const response = await generateWithWatsonx(prompt, {
      maxTokens: 1024,
      temperature: 0.8,
    });

    const message: ChatMessage = {
      id: generateId(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    return {
      message,
      usage: {
        promptTokens: 0, // Would be populated from actual API response
        completionTokens: 0,
        totalTokens: 0,
      },
    };
  } catch (error) {
    console.error('Chat error:', error);
    return getMockChatResponse(request);
  }
}

/**
 * Generate documentation for a repository
 */
export async function generateDocumentation(
  request: DocumentationRequest
): Promise<DocumentationResponse> {
  if (USE_MOCK_MODE) {
    return getMockDocumentation(request);
  }

  try {
    const prompt = buildDocumentationPrompt(request);
    const response = await generateWithWatsonx(prompt, {
      maxTokens: 3072,
      temperature: 0.6,
    });

    return parseDocumentationResponse(response, request);
  } catch (error) {
    console.error('Documentation generation error:', error);
    return getMockDocumentation(request);
  }
}

/**
 * Generate a learning path for a repository
 */
export async function generateLearningPath(
  request: LearningPathRequest
): Promise<LearningPathResponse> {
  if (USE_MOCK_MODE) {
    return getMockLearningPath(request);
  }

  try {
    const prompt = buildLearningPathPrompt(request);
    const response = await generateWithWatsonx(prompt, {
      maxTokens: 2048,
      temperature: 0.7,
    });

    return parseLearningPathResponse(response);
  } catch (error) {
    console.error('Learning path generation error:', error);
    return getMockLearningPath(request);
  }
}

// ============================================================================
// Prompt Builders
// ============================================================================

function buildRepositoryAnalysisPrompt(request: RepositoryAnalysisRequest): string {
  return `You are an expert software architect analyzing a codebase for junior developers.

Repository: ${request.repositoryName}
URL: ${request.repositoryUrl}
${request.description ? `Description: ${request.description}` : ''}
${request.primaryLanguage ? `Primary Language: ${request.primaryLanguage}` : ''}

Analyze this repository and provide:
1. A concise summary (2-3 sentences)
2. Key technologies used (with confidence scores)
3. Architecture patterns identified
4. Most important files to understand
5. Recommendations for getting started
6. Complexity level (beginner/intermediate/advanced)
7. Estimated onboarding time

Format your response as structured JSON.`;
}

function buildChatPrompt(request: ChatRequest): string {
  const context = request.repositoryContext
    ? `Repository Context: ${request.repositoryContext.name}
${request.repositoryContext.description || ''}
Technologies: ${request.repositoryContext.technologies?.join(', ') || 'Unknown'}

`
    : '';

  const conversationHistory = request.messages
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join('\n');

  return `${context}You are a helpful AI assistant specializing in code understanding and developer onboarding.
Be concise, beginner-friendly, and actionable.

${conversationHistory}

assistant:`;
}

function buildDocumentationPrompt(request: DocumentationRequest): string {
  return `Generate comprehensive onboarding documentation for junior developers.

Repository: ${request.repositoryName}
URL: ${request.repositoryUrl}
Technologies: ${request.technologies.join(', ')}
Target Audience: ${request.targetAudience}
${request.architectureOverview ? `Architecture: ${request.architectureOverview}` : ''}

Create documentation with:
1. Introduction
2. Getting Started guide
3. Architecture overview
4. Key concepts
5. Development workflow
6. Contribution guidelines

Keep it beginner-friendly and actionable.`;
}

function buildLearningPathPrompt(request: LearningPathRequest): string {
  return `Create a structured learning path for a junior developer to understand this codebase.

Repository: ${request.repositoryName}
Technologies: ${request.technologies.join(', ')}
User Level: ${request.userLevel}
${request.focusAreas ? `Focus Areas: ${request.focusAreas.join(', ')}` : ''}

Generate a step-by-step learning path with:
- Clear learning objectives
- Estimated time for each step
- Prerequisites
- Recommended resources
- Hands-on exercises

Make it practical and achievable.`;
}

// ============================================================================
// Response Parsers
// ============================================================================

function parseRepositoryAnalysisResponse(response: string): RepositoryAnalysisResponse {
  // In production, parse structured JSON from AI response
  // For now, return structured mock
  return {
    summary: response.substring(0, 200),
    technologies: [],
    architecturePatterns: [],
    keyFiles: [],
    recommendations: [],
    complexity: 'intermediate',
    estimatedOnboardingTime: '2-3 days',
  };
}

function parseDocumentationResponse(
  response: string,
  request: DocumentationRequest
): DocumentationResponse {
  return {
    title: `${request.repositoryName} Documentation`,
    introduction: response.substring(0, 300),
    sections: [],
    gettingStarted: 'Getting started guide...',
    contributionGuidelines: 'Contribution guidelines...',
  };
}

function parseLearningPathResponse(response: string): LearningPathResponse {
  return {
    title: 'Learning Path',
    description: response.substring(0, 200),
    totalEstimatedTime: '2 weeks',
    steps: [],
  };
}

// ============================================================================
// Mock Responses
// ============================================================================

function getMockRepositoryAnalysis(
  request: RepositoryAnalysisRequest
): RepositoryAnalysisResponse {
  return {
    summary: `${request.repositoryName} is a modern web application built with industry-standard technologies. The codebase follows best practices and is well-structured for maintainability.`,
    technologies: [
      {
        name: request.primaryLanguage || 'TypeScript',
        category: 'Language',
        confidence: 0.95,
        description: 'Primary programming language',
      },
      {
        name: 'React',
        category: 'Framework',
        confidence: 0.9,
        description: 'UI framework for building components',
      },
      {
        name: 'Next.js',
        category: 'Framework',
        confidence: 0.85,
        description: 'Full-stack React framework',
      },
    ],
    architecturePatterns: [
      {
        pattern: 'Component-Based Architecture',
        description: 'UI built with reusable React components',
        files: ['components/', 'app/'],
      },
      {
        pattern: 'API Routes',
        description: 'Server-side API endpoints using Next.js',
        files: ['app/api/'],
      },
    ],
    keyFiles: [
      {
        path: 'app/layout.tsx',
        purpose: 'Root layout component',
        importance: 'critical',
      },
      {
        path: 'components/',
        purpose: 'Reusable UI components',
        importance: 'high',
      },
      {
        path: 'lib/',
        purpose: 'Utility functions and integrations',
        importance: 'high',
      },
    ],
    recommendations: [
      'Start by exploring the main layout and routing structure',
      'Review the component library to understand UI patterns',
      'Check the API routes to understand backend functionality',
      'Read the README for setup instructions',
    ],
    complexity: 'intermediate',
    estimatedOnboardingTime: '2-3 days',
  };
}

function getMockChatResponse(request: ChatRequest): ChatResponse {
  const lastMessage = request.messages[request.messages.length - 1];
  const message: ChatMessage = {
    id: generateId(),
    role: 'assistant',
    content: `I understand you're asking about: "${lastMessage.content}". ${
      request.repositoryContext
        ? `In the context of ${request.repositoryContext.name}, `
        : ''
    }I'd be happy to help explain this concept. This is a mock response - the actual AI integration will provide detailed, context-aware answers.`,
    timestamp: new Date(),
  };

  return {
    message,
    usage: {
      promptTokens: 50,
      completionTokens: 100,
      totalTokens: 150,
    },
  };
}

function getMockDocumentation(request: DocumentationRequest): DocumentationResponse {
  return {
    title: `${request.repositoryName} - Developer Documentation`,
    introduction: `Welcome to ${request.repositoryName}! This documentation will help you understand the codebase and start contributing. Built with ${request.technologies.join(', ')}, this project follows modern development practices.`,
    sections: [
      {
        title: 'Architecture Overview',
        content: 'The application follows a modular architecture with clear separation of concerns.',
        order: 1,
      },
      {
        title: 'Key Concepts',
        content: 'Understanding these core concepts will help you navigate the codebase effectively.',
        order: 2,
      },
      {
        title: 'Development Workflow',
        content: 'Follow these steps to set up your development environment and start coding.',
        order: 3,
      },
    ],
    gettingStarted: `1. Clone the repository\n2. Install dependencies\n3. Set up environment variables\n4. Run the development server\n5. Start exploring the code`,
    contributionGuidelines: `We welcome contributions! Please:\n- Follow the existing code style\n- Write tests for new features\n- Update documentation\n- Submit pull requests with clear descriptions`,
  };
}

function getMockLearningPath(request: LearningPathRequest): LearningPathResponse {
  return {
    title: `Learning Path: ${request.repositoryName}`,
    description: `A structured path to master ${request.repositoryName} at the ${request.userLevel} level.`,
    totalEstimatedTime: '2-3 weeks',
    steps: [
      {
        id: '1',
        title: 'Understand the Project Structure',
        description: 'Explore the folder structure and understand how files are organized.',
        estimatedTime: '2 hours',
        resources: ['README.md', 'Project documentation'],
        prerequisites: [],
      },
      {
        id: '2',
        title: 'Set Up Development Environment',
        description: 'Install dependencies and configure your local development setup.',
        estimatedTime: '1 hour',
        resources: ['Setup guide', 'Environment configuration'],
        prerequisites: ['1'],
      },
      {
        id: '3',
        title: 'Learn Core Technologies',
        description: `Study ${request.technologies.slice(0, 3).join(', ')} fundamentals.`,
        estimatedTime: '1 week',
        resources: ['Official documentation', 'Tutorial videos'],
        prerequisites: ['2'],
      },
      {
        id: '4',
        title: 'Build a Small Feature',
        description: 'Apply your knowledge by implementing a beginner-friendly feature.',
        estimatedTime: '3-5 days',
        resources: ['Contribution guide', 'Code examples'],
        prerequisites: ['3'],
      },
    ],
  };
}

// Made with Bob
