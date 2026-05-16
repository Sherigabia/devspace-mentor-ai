/**
 * Repository Context Builder Service
 * Converts GitHub repository data into structured AI-ready context
 * Server-side only
 */

import { GitHubService } from './github.service';
import type { GitHubRepository, GitHubTree, GitHubContent } from '@/types/github';

// Maximum file tree depth to prevent token overflow
const MAX_TREE_DEPTH = 3;
const MAX_FILES_TO_ANALYZE = 100;

// Key file patterns to identify
const KEY_FILE_PATTERNS = {
  readme: /^readme\.md$/i,
  packageJson: /^package\.json$/i,
  tsconfig: /^tsconfig\.json$/i,
  dockerfile: /^dockerfile$/i,
  gitignore: /^\.gitignore$/i,
  envExample: /^\.env\.example$/i,
  mainEntry: /^(index|main|app)\.(ts|js|tsx|jsx|py)$/i,
  config: /\.(config|rc)\.(ts|js|json)$/i,
};

// Language-specific entry point patterns
const ENTRY_POINT_PATTERNS: Record<string, RegExp[]> = {
  TypeScript: [/^src\/index\.tsx?$/, /^app\/page\.tsx?$/, /^pages\/index\.tsx?$/],
  JavaScript: [/^src\/index\.jsx?$/, /^app\/page\.jsx?$/, /^pages\/index\.jsx?$/],
  Python: [/^main\.py$/, /^app\.py$/, /^__main__\.py$/, /^manage\.py$/],
  Java: [/^Main\.java$/, /^Application\.java$/],
  Go: [/^main\.go$/],
};

export interface RepositoryContext {
  repoName: string;
  fullName: string;
  description: string;
  language: string;
  fileTree: FileTreeNode[];
  keyFiles: KeyFileInfo[];
  entryPoints: string[];
  dependencies: DependencyInfo[];
  structureSummary: string;
  stats: RepositoryStats;
}

export interface FileTreeNode {
  path: string;
  type: 'file' | 'dir';
  size?: number;
  depth: number;
}

export interface KeyFileInfo {
  path: string;
  type: string;
  importance: 'critical' | 'high' | 'medium';
  reason: string;
}

export interface DependencyInfo {
  name: string;
  version?: string;
  type: 'production' | 'development';
}

export interface RepositoryStats {
  totalFiles: number;
  totalDirectories: number;
  primaryLanguage: string;
  languages: Record<string, number>;
  hasTests: boolean;
  hasDocumentation: boolean;
}

/**
 * Build repository context for AI analysis
 */
export async function buildRepositoryContext(
  githubService: GitHubService,
  owner: string,
  repo: string
): Promise<RepositoryContext> {
  try {
    // Fetch repository metadata
    const repository = await githubService.getRepository(owner, repo);
    
    // Fetch file tree
    const tree = await fetchRepositoryTree(githubService, owner, repo, repository.default_branch || 'main');
    
    // Process file tree
    const fileTree = processFileTree(tree);
    
    // Identify key files
    const keyFiles = identifyKeyFiles(fileTree);
    
    // Identify entry points
    const entryPoints = identifyEntryPoints(fileTree, repository.language || 'Unknown');
    
    // Extract dependencies
    const dependencies = await extractDependencies(githubService, owner, repo, keyFiles);
    
    // Calculate stats
    const stats = calculateStats(fileTree, repository.language || 'Unknown');
    
    // Generate structure summary
    const structureSummary = generateStructureSummary(fileTree, stats);
    
    return {
      repoName: repository.name,
      fullName: repository.full_name,
      description: repository.description || '',
      language: repository.language || 'Unknown',
      fileTree,
      keyFiles,
      entryPoints,
      dependencies,
      structureSummary,
      stats,
    };
  } catch (error) {
    console.error('Error building repository context:', error);
    throw new Error('Failed to build repository context');
  }
}

/**
 * Fetch repository tree with error handling
 */
async function fetchRepositoryTree(
  githubService: GitHubService,
  owner: string,
  repo: string,
  branch: string
): Promise<GitHubTree> {
  try {
    return await githubService.getRepositoryTree(owner, repo, branch);
  } catch (error) {
    // Try with 'master' if 'main' fails
    if (branch === 'main') {
      return await githubService.getRepositoryTree(owner, repo, 'master');
    }
    throw error;
  }
}

/**
 * Process file tree and limit depth
 */
function processFileTree(tree: GitHubTree): FileTreeNode[] {
  const nodes: FileTreeNode[] = [];
  
  for (const item of tree.tree.slice(0, MAX_FILES_TO_ANALYZE)) {
    const depth = item.path.split('/').length - 1;
    
    if (depth <= MAX_TREE_DEPTH) {
      nodes.push({
        path: item.path,
        type: item.type === 'tree' ? 'dir' : 'file',
        size: item.size,
        depth,
      });
    }
  }
  
  return nodes;
}

/**
 * Identify key files in the repository
 */
function identifyKeyFiles(fileTree: FileTreeNode[]): KeyFileInfo[] {
  const keyFiles: KeyFileInfo[] = [];
  
  for (const node of fileTree) {
    if (node.type !== 'file') continue;
    
    const fileName = node.path.split('/').pop() || '';
    
    // Check for README
    if (KEY_FILE_PATTERNS.readme.test(fileName)) {
      keyFiles.push({
        path: node.path,
        type: 'documentation',
        importance: 'critical',
        reason: 'Project documentation and overview',
      });
    }
    
    // Check for package.json
    if (KEY_FILE_PATTERNS.packageJson.test(fileName)) {
      keyFiles.push({
        path: node.path,
        type: 'dependencies',
        importance: 'critical',
        reason: 'Project dependencies and scripts',
      });
    }
    
    // Check for tsconfig
    if (KEY_FILE_PATTERNS.tsconfig.test(fileName)) {
      keyFiles.push({
        path: node.path,
        type: 'configuration',
        importance: 'high',
        reason: 'TypeScript configuration',
      });
    }
    
    // Check for Dockerfile
    if (KEY_FILE_PATTERNS.dockerfile.test(fileName)) {
      keyFiles.push({
        path: node.path,
        type: 'deployment',
        importance: 'high',
        reason: 'Container configuration',
      });
    }
    
    // Check for config files
    if (KEY_FILE_PATTERNS.config.test(fileName)) {
      keyFiles.push({
        path: node.path,
        type: 'configuration',
        importance: 'medium',
        reason: 'Application configuration',
      });
    }
  }
  
  return keyFiles;
}

/**
 * Identify entry points based on language
 */
function identifyEntryPoints(fileTree: FileTreeNode[], language: string): string[] {
  const entryPoints: string[] = [];
  const patterns = ENTRY_POINT_PATTERNS[language] || [];
  
  for (const node of fileTree) {
    if (node.type !== 'file') continue;
    
    // Check language-specific patterns
    for (const pattern of patterns) {
      if (pattern.test(node.path)) {
        entryPoints.push(node.path);
      }
    }
    
    // Check generic main entry patterns
    if (KEY_FILE_PATTERNS.mainEntry.test(node.path.split('/').pop() || '')) {
      if (!entryPoints.includes(node.path)) {
        entryPoints.push(node.path);
      }
    }
  }
  
  return entryPoints;
}

/**
 * Extract dependencies from package.json or similar files
 */
async function extractDependencies(
  githubService: GitHubService,
  owner: string,
  repo: string,
  keyFiles: KeyFileInfo[]
): Promise<DependencyInfo[]> {
  const dependencies: DependencyInfo[] = [];
  
  // Find package.json
  const packageJsonFile = keyFiles.find(f => f.path.endsWith('package.json'));
  
  if (packageJsonFile) {
    try {
      const content = await githubService.getContents(owner, repo, packageJsonFile.path);
      
      if (!Array.isArray(content) && content.content) {
        const decoded = Buffer.from(content.content, 'base64').toString('utf-8');
        const packageJson = JSON.parse(decoded);
        
        // Extract production dependencies
        if (packageJson.dependencies) {
          for (const [name, version] of Object.entries(packageJson.dependencies)) {
            dependencies.push({
              name,
              version: version as string,
              type: 'production',
            });
          }
        }
        
        // Extract dev dependencies (limit to important ones)
        if (packageJson.devDependencies) {
          const importantDevDeps = ['typescript', 'eslint', 'prettier', 'jest', 'vitest'];
          for (const [name, version] of Object.entries(packageJson.devDependencies)) {
            if (importantDevDeps.some(dep => name.includes(dep))) {
              dependencies.push({
                name,
                version: version as string,
                type: 'development',
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Error extracting dependencies:', error);
    }
  }
  
  return dependencies;
}

/**
 * Calculate repository statistics
 */
function calculateStats(fileTree: FileTreeNode[], primaryLanguage: string): RepositoryStats {
  const stats: RepositoryStats = {
    totalFiles: 0,
    totalDirectories: 0,
    primaryLanguage,
    languages: {},
    hasTests: false,
    hasDocumentation: false,
  };
  
  for (const node of fileTree) {
    if (node.type === 'file') {
      stats.totalFiles++;
      
      // Check for tests
      if (node.path.includes('test') || node.path.includes('spec')) {
        stats.hasTests = true;
      }
      
      // Check for documentation
      if (node.path.toLowerCase().includes('readme') || node.path.includes('docs/')) {
        stats.hasDocumentation = true;
      }
      
      // Count file extensions
      const ext = node.path.split('.').pop();
      if (ext) {
        stats.languages[ext] = (stats.languages[ext] || 0) + 1;
      }
    } else {
      stats.totalDirectories++;
    }
  }
  
  return stats;
}

/**
 * Generate a human-readable structure summary
 */
function generateStructureSummary(fileTree: FileTreeNode[], stats: RepositoryStats): string {
  const topLevelDirs = new Set<string>();
  
  for (const node of fileTree) {
    const parts = node.path.split('/');
    if (parts.length > 0) {
      topLevelDirs.add(parts[0]);
    }
  }
  
  const summary = [
    `Repository contains ${stats.totalFiles} files across ${stats.totalDirectories} directories.`,
    `Primary language: ${stats.primaryLanguage}.`,
    `Top-level structure: ${Array.from(topLevelDirs).slice(0, 8).join(', ')}.`,
    stats.hasTests ? 'Includes test files.' : 'No test files detected.',
    stats.hasDocumentation ? 'Has documentation.' : 'Limited documentation.',
  ];
  
  return summary.join(' ');
}

// Made with Bob