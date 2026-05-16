import type {
  GitHubRepository,
  GitHubUser,
  GitHubTree,
  GitHubContent,
} from "@/types/github";

/**
 * GitHub Service
 * Handles all GitHub API interactions
 * All methods should be called from server-side API routes only
 */

const GITHUB_API_BASE = "https://api.github.com";

interface GitHubServiceConfig {
  token: string;
}

export class GitHubService {
  private token: string;

  constructor(config: GitHubServiceConfig) {
    this.token = config.token;
  }

  /**
   * Get authenticated user information
   */
  async getAuthenticatedUser(): Promise<GitHubUser> {
    const response = await fetch(`${GITHUB_API_BASE}/user`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get user repositories
   */
  async getUserRepositories(
    options: {
      sort?: "created" | "updated" | "pushed" | "full_name";
      direction?: "asc" | "desc";
      per_page?: number;
      page?: number;
    } = {}
  ): Promise<GitHubRepository[]> {
    const params = new URLSearchParams({
      sort: options.sort || "updated",
      direction: options.direction || "desc",
      per_page: String(options.per_page || 30),
      page: String(options.page || 1),
    });

    const response = await fetch(
      `${GITHUB_API_BASE}/user/repos?${params.toString()}`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get a specific repository
   */
  async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get repository tree (file structure)
   */
  async getRepositoryTree(
    owner: string,
    repo: string,
    branch: string = "main"
  ): Promise<GitHubTree> {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get file or directory contents
   */
  async getContents(
    owner: string,
    repo: string,
    path: string = ""
  ): Promise<GitHubContent | GitHubContent[]> {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get repository README
   */
  async getReadme(owner: string, repo: string): Promise<GitHubContent> {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get common headers for GitHub API requests
   */
  private getHeaders(): HeadersInit {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };
  }
}

/**
 * Create a GitHub service instance
 * Should only be called from server-side code
 */
export function createGitHubService(token: string): GitHubService {
  if (!token) {
    throw new Error("GitHub token is required");
  }

  return new GitHubService({ token });
}

// Made with Bob