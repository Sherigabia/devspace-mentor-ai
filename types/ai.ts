// AI-related types for IBM watsonx.ai integration

// Repository Analysis Types
export interface RepositoryAnalysisRequest {
  repositoryUrl: string;
  repositoryName: string;
  description?: string;
  primaryLanguage?: string;
  fileStructure?: string;
}

export interface TechnologyInsight {
  name: string;
  category: string;
  confidence: number;
  description: string;
}

export interface ArchitecturePattern {
  pattern: string;
  description: string;
  files: string[];
}

export interface KeyFile {
  path: string;
  purpose: string;
  importance: 'critical' | 'high' | 'medium';
}

export interface RepositoryAnalysisResponse {
  summary: string;
  technologies: TechnologyInsight[];
  architecturePatterns: ArchitecturePattern[];
  keyFiles: KeyFile[];
  recommendations: string[];
  complexity: 'beginner' | 'intermediate' | 'advanced';
  estimatedOnboardingTime: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  messages: ChatMessage[];
  repositoryContext?: {
    name: string;
    description?: string;
    technologies?: string[];
  };
  maxTokens?: number;
}

export interface ChatResponse {
  message: ChatMessage;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Documentation Generation Types
export interface DocumentationRequest {
  repositoryName: string;
  repositoryUrl: string;
  technologies: string[];
  architectureOverview?: string;
  targetAudience: 'beginner' | 'intermediate' | 'advanced';
}

export interface DocumentationSection {
  title: string;
  content: string;
  order: number;
}

export interface DocumentationResponse {
  title: string;
  introduction: string;
  sections: DocumentationSection[];
  gettingStarted: string;
  contributionGuidelines: string;
}

// Learning Path Types
export interface LearningPathRequest {
  repositoryName: string;
  technologies: string[];
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  focusAreas?: string[];
}

export interface LearningStep {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  resources: string[];
  prerequisites: string[];
}

export interface LearningPathResponse {
  title: string;
  description: string;
  totalEstimatedTime: string;
  steps: LearningStep[];
}

// Watsonx API Types
export interface WatsonxGenerateRequest {
  model_id: string;
  input: string;
  parameters?: {
    max_new_tokens?: number;
    temperature?: number;
    top_p?: number;
    top_k?: number;
    repetition_penalty?: number;
  };
  project_id: string;
}

export interface WatsonxGenerateResponse {
  model_id: string;
  created_at: string;
  results: Array<{
    generated_text: string;
    generated_token_count: number;
    input_token_count: number;
    stop_reason: string;
  }>;
}

// Error Types
export interface AIError {
  code: string;
  message: string;
  details?: unknown;
}
