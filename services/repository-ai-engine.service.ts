/**
 * Repository AI Analysis Engine
 * Core intelligence layer that converts repository context into structured AI insights
 * Server-side only - enforces strict JSON output from AI
 */

import { generateWithGemini, GEMINI_MODELS } from '@/lib/gemini';
import type { RepositoryContext } from './repository-context.service';

// Strict output schema for AI analysis
export interface AIRepositoryAnalysis {
  summary: string;
  architecture: string;
  techStack: TechStackAnalysis[];
  modules: ModuleAnalysis[];
  entryPoints: EntryPointAnalysis[];
  complexity: 'low' | 'medium' | 'high';
  developerOnboarding: string;
  riskAreas: RiskArea[];
  suggestedFirstIssues: FirstIssue[];
  learningPath: LearningPathStep[];
}

export interface TechStackAnalysis {
  name: string;
  category: string;
  version?: string;
  purpose: string;
  confidence: number;
}

export interface ModuleAnalysis {
  name: string;
  path: string;
  purpose: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  dependencies: string[];
}

export interface EntryPointAnalysis {
  file: string;
  type: string;
  description: string;
  startHere: boolean;
}

export interface RiskArea {
  area: string;
  reason: string;
  severity: 'high' | 'medium' | 'low';
  recommendation: string;
}

export interface FirstIssue {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate';
  estimatedTime: string;
  files: string[];
  skills: string[];
}

export interface LearningPathStep {
  step: number;
  title: string;
  description: string;
  objectives: string[];
  resources: string[];
  estimatedTime: string;
  prerequisites: number[];
}

/**
 * Analyze repository using watsonx.ai
 * Returns structured JSON intelligence
 */
export async function analyzeRepositoryWithAI(
  context: RepositoryContext
): Promise<AIRepositoryAnalysis> {
  try {
    const prompt = buildAnalysisPrompt(context);
    
    const response = await generateWithGemini(prompt, {
      modelId: GEMINI_MODELS.FLASH, // Using Flash for faster, cost-effective analysis
      maxTokens: 4096,
      temperature: 0.3, // Lower temperature for more consistent structured output
    });
    
    // Parse and validate JSON response
    const analysis = parseAndValidateAnalysis(response);
    
    return analysis;
  } catch (error) {
    console.error('AI repository analysis error:', error);
    throw new Error('Failed to analyze repository with AI');
  }
}

/**
 * Build structured prompt for watsonx.ai
 * CRITICAL: Enforces JSON-only output
 */
function buildAnalysisPrompt(context: RepositoryContext): string {
  const { repoName, description, language, keyFiles, entryPoints, structureSummary, stats } = context;
  
  // Build tech stack summary
  const techStackSummary = context.dependencies
    .slice(0, 10)
    .map(dep => `${dep.name}${dep.version ? `@${dep.version}` : ''}`)
    .join(', ');
  
  // Build key files list
  const keyFilesList = keyFiles
    .map(f => `- ${f.path} (${f.type}, ${f.importance}): ${f.reason}`)
    .join('\n');
  
  // Build entry points list
  const entryPointsList = entryPoints.length > 0 
    ? entryPoints.join(', ') 
    : 'Not clearly identified';
  
  return `You are an expert software architect analyzing a codebase for junior developers.

REPOSITORY INFORMATION:
Name: ${repoName}
Description: ${description || 'No description provided'}
Primary Language: ${language}
Structure: ${structureSummary}

STATISTICS:
- Total Files: ${stats.totalFiles}
- Total Directories: ${stats.totalDirectories}
- Has Tests: ${stats.hasTests ? 'Yes' : 'No'}
- Has Documentation: ${stats.hasDocumentation ? 'Yes' : 'No'}

KEY DEPENDENCIES:
${techStackSummary || 'None detected'}

KEY FILES:
${keyFilesList || 'None identified'}

ENTRY POINTS:
${entryPointsList}

TASK:
Analyze this repository and provide structured intelligence for junior developers.

CRITICAL INSTRUCTIONS:
1. Return ONLY valid JSON
2. NO markdown formatting
3. NO code blocks
4. NO explanations outside JSON
5. Follow the exact schema below

REQUIRED JSON SCHEMA:
{
  "summary": "2-3 sentence overview for beginners",
  "architecture": "Architecture pattern description (e.g., MVC, modular, microservices)",
  "techStack": [
    {
      "name": "Technology name",
      "category": "framework|library|language|database|tool",
      "version": "version if known",
      "purpose": "What it does in this project",
      "confidence": 0.0-1.0
    }
  ],
  "modules": [
    {
      "name": "Module name",
      "path": "Directory path",
      "purpose": "What this module does",
      "importance": "critical|high|medium|low",
      "dependencies": ["other module names"]
    }
  ],
  "entryPoints": [
    {
      "file": "File path",
      "type": "main|api|component|config",
      "description": "What this entry point does",
      "startHere": true|false
    }
  ],
  "complexity": "low|medium|high",
  "developerOnboarding": "Step-by-step guide for beginners to understand this codebase",
  "riskAreas": [
    {
      "area": "Area name",
      "reason": "Why this is risky",
      "severity": "high|medium|low",
      "recommendation": "How to approach it"
    }
  ],
  "suggestedFirstIssues": [
    {
      "title": "Beginner-friendly task title",
      "description": "What to do",
      "difficulty": "beginner|intermediate",
      "estimatedTime": "Time estimate",
      "files": ["files to modify"],
      "skills": ["required skills"]
    }
  ],
  "learningPath": [
    {
      "step": 1,
      "title": "Step title",
      "description": "What to learn",
      "objectives": ["learning objectives"],
      "resources": ["files or docs to read"],
      "estimatedTime": "Time estimate",
      "prerequisites": [previous step numbers]
    }
  ]
}

Return ONLY the JSON object. Start with { and end with }. No other text.`;
}

/**
 * Parse and validate AI response
 * Ensures strict JSON schema compliance
 */
function parseAndValidateAnalysis(response: string): AIRepositoryAnalysis {
  try {
    // Clean response - remove any markdown or extra text
    let cleaned = response.trim();
    
    // Remove markdown code blocks if present
    cleaned = cleaned.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Find JSON object boundaries
    const startIndex = cleaned.indexOf('{');
    const endIndex = cleaned.lastIndexOf('}');
    
    if (startIndex === -1 || endIndex === -1) {
      throw new Error('No JSON object found in response');
    }
    
    cleaned = cleaned.substring(startIndex, endIndex + 1);
    
    // Parse JSON
    const parsed = JSON.parse(cleaned);
    
    // Validate required fields
    const required = [
      'summary',
      'architecture',
      'techStack',
      'modules',
      'entryPoints',
      'complexity',
      'developerOnboarding',
      'riskAreas',
      'suggestedFirstIssues',
      'learningPath',
    ];
    
    for (const field of required) {
      if (!(field in parsed)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Validate complexity value
    if (!['low', 'medium', 'high'].includes(parsed.complexity)) {
      parsed.complexity = 'medium'; // Default fallback
    }
    
    // Ensure arrays exist
    parsed.techStack = Array.isArray(parsed.techStack) ? parsed.techStack : [];
    parsed.modules = Array.isArray(parsed.modules) ? parsed.modules : [];
    parsed.entryPoints = Array.isArray(parsed.entryPoints) ? parsed.entryPoints : [];
    parsed.riskAreas = Array.isArray(parsed.riskAreas) ? parsed.riskAreas : [];
    parsed.suggestedFirstIssues = Array.isArray(parsed.suggestedFirstIssues) ? parsed.suggestedFirstIssues : [];
    parsed.learningPath = Array.isArray(parsed.learningPath) ? parsed.learningPath : [];
    
    return parsed as AIRepositoryAnalysis;
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    console.error('Raw response:', response);
    
    // Return safe fallback structure
    return createFallbackAnalysis();
  }
}

/**
 * Create fallback analysis when AI fails
 * Returns valid structure with minimal data
 */
function createFallbackAnalysis(): AIRepositoryAnalysis {
  return {
    summary: 'Repository analysis is currently unavailable. Please try again later.',
    architecture: 'Unable to determine architecture pattern.',
    techStack: [],
    modules: [],
    entryPoints: [],
    complexity: 'medium',
    developerOnboarding: 'Analysis unavailable. Please review the README and project documentation.',
    riskAreas: [],
    suggestedFirstIssues: [],
    learningPath: [],
  };
}

/**
 * Validate analysis quality
 * Returns true if analysis meets minimum quality standards
 */
export function validateAnalysisQuality(analysis: AIRepositoryAnalysis): boolean {
  // Check if analysis has meaningful content
  if (analysis.summary.length < 50) return false;
  if (analysis.techStack.length === 0) return false;
  if (analysis.developerOnboarding.length < 100) return false;
  
  return true;
}

// Made with Bob