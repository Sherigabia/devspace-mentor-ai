/**
 * Repository Analysis Types
 * Type definitions for repository data structures
 */

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  version: string;
  language: string;
  lastUpdated: string;
  stars?: number;
  forks?: number;
}

export interface TechStackItem {
  id: string;
  name: string;
  category: "framework" | "language" | "styling" | "database" | "tool";
  description: string;
  icon?: string;
  color?: string;
}

export interface FileNode {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: FileNode[];
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: "optimization" | "security" | "architecture" | "performance";
  priority: "low" | "medium" | "high";
  icon: string;
}

export interface ArchitecturePattern {
  name: string;
  description: string;
  detected: boolean;
}

export interface ContributionSuggestion {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  files: string[];
}

export interface AnalysisMetric {
  label: string;
  value: string | number;
  color: string;
}

export interface AnalysisStep {
  id: string;
  label: string;
  status: "pending" | "in-progress" | "completed" | "error";
  timestamp?: string;
}

export interface RepositoryAnalysis {
  repository: Repository;
  techStack: TechStackItem[];
  fileStructure: FileNode[];
  aiSummary: string;
  insights: AIInsight[];
  architecturePatterns: ArchitecturePattern[];
  contributions: ContributionSuggestion[];
  metrics: AnalysisMetric[];
  analysisSteps: AnalysisStep[];
}

// Made with Bob