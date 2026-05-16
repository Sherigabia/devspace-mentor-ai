/**
 * GitHub Integration Types
 * Type definitions for GitHub API interactions
 */

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  default_branch: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  created_at: string;
  private: boolean;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
}

export interface GitHubTreeItem {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
}

export interface GitHubTree {
  sha: string;
  url: string;
  tree: GitHubTreeItem[];
  truncated: boolean;
}

export interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: "file" | "dir";
  content?: string;
  encoding?: string;
}

export interface StoredRepository {
  id: string;
  user_id: string;
  repo_name: string;
  repo_full_name: string;
  repo_url: string;
  default_branch: string;
  language: string | null;
  description: string | null;
  stars: number;
  forks: number;
  last_synced_at: string | null;
  created_at: string;
  updated_at: string;
}

// Made with Bob