/**
 * Repository Intelligence Pipeline Types
 * Type definitions for the complete analysis pipeline
 */

import type { AIRepositoryAnalysis } from '@/services/repository-ai-engine.service';
import type { RepositoryContext } from '@/services/repository-context.service';

/**
 * Pipeline request types
 */
export interface AnalyzeRepositoryRequest {
  owner: string;
  repo: string;
  githubToken: string;
  forceRefresh?: boolean;
}

/**
 * Pipeline response types
 */
export interface AnalyzeRepositoryResponse {
  analysis: AIRepositoryAnalysis;
  cached: boolean;
  message: string;
  repository: RepositoryMetadata;
}

export interface RepositoryMetadata {
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
}

/**
 * Pipeline error types
 */
export interface PipelineError {
  error: string;
  message: string;
  details?: string;
  fallback?: boolean;
}

/**
 * Pipeline stage status
 */
export type PipelineStage =
  | 'authenticating'
  | 'fetching_repository'
  | 'building_context'
  | 'analyzing_with_ai'
  | 'caching_results'
  | 'completed'
  | 'failed';

export interface PipelineStatus {
  stage: PipelineStage;
  progress: number;
  message: string;
  error?: string;
}

/**
 * Cache metadata
 */
export interface CacheMetadata {
  cached: boolean;
  cacheAge?: number;
  cacheExpiry?: string;
}

// Made with Bob