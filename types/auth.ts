/**
 * Authentication Types
 * Type definitions for user authentication and session management
 */

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  username: string | null;
}

export interface GitHubConnection {
  id: string;
  userId: string;
  githubUsername: string;
  githubUserId: string;
  accessToken: string; // Encrypted in database
  connectedAt: string;
  lastSyncedAt: string | null;
}

export interface UserSession {
  user: User;
  isAuthenticated: boolean;
  githubConnected: boolean;
}

// Made with Bob