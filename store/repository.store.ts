import { create } from "zustand";
import type { GitHubRepository, StoredRepository } from "@/types/github";
import type { AIRepositoryAnalysis } from "@/services/repository-ai-engine.service";

/**
 * Repository Store
 * Global state management for repository data and AI analysis
 */

export type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";
export type AnalysisStatus = "idle" | "analyzing" | "completed" | "error";

interface RepositoryState {
  // GitHub repositories list
  repositories: GitHubRepository[];
  
  // Selected repository (for picker)
  selectedRepository: GitHubRepository | null;
  
  // User's stored repositories
  storedRepositories: StoredRepository[];
  
  // AI Analysis state
  isAnalyzing: boolean;
  analysisStatus: AnalysisStatus;
  analysisResult: AIRepositoryAnalysis | null;
  analysisError: string | null;
  
  // Loading states
  isLoading: boolean;
  isConnecting: boolean;
  
  // Connection status
  connectionStatus: ConnectionStatus;
  
  // Error state
  error: string | null;
}

interface RepositoryActions {
  // Set repositories from GitHub
  setRepositories: (repositories: GitHubRepository[]) => void;
  
  // Select a repository (triggers auto-analysis)
  selectRepository: (repository: GitHubRepository | null) => void;
  
  // Set stored repositories from database
  setStoredRepositories: (repositories: StoredRepository[]) => void;
  
  // Add a stored repository
  addStoredRepository: (repository: StoredRepository) => void;
  
  // Remove a stored repository
  removeStoredRepository: (repositoryId: string) => void;
  
  // Analysis actions
  setAnalyzing: (isAnalyzing: boolean) => void;
  setAnalysisStatus: (status: AnalysisStatus) => void;
  setAnalysisResult: (result: AIRepositoryAnalysis | null) => void;
  setAnalysisError: (error: string | null) => void;
  
  // Set loading state
  setLoading: (isLoading: boolean) => void;
  
  // Set connecting state
  setConnecting: (isConnecting: boolean) => void;
  
  // Set connection status
  setConnectionStatus: (status: ConnectionStatus) => void;
  
  // Set error
  setError: (error: string | null) => void;
  
  // Reset store
  reset: () => void;
  
  // Reset analysis state only
  resetAnalysis: () => void;
}

type RepositoryStore = RepositoryState & RepositoryActions;

const initialState: RepositoryState = {
  repositories: [],
  selectedRepository: null,
  storedRepositories: [],
  isAnalyzing: false,
  analysisStatus: "idle",
  analysisResult: null,
  analysisError: null,
  isLoading: false,
  isConnecting: false,
  connectionStatus: "disconnected",
  error: null,
};

export const useRepositoryStore = create<RepositoryStore>((set) => ({
  ...initialState,

  setRepositories: (repositories) =>
    set({ repositories, error: null }),

  selectRepository: (repository) =>
    set({ selectedRepository: repository }),

  setStoredRepositories: (repositories) =>
    set({ storedRepositories: repositories }),

  addStoredRepository: (repository) =>
    set((state) => ({
      storedRepositories: [...state.storedRepositories, repository],
    })),

  removeStoredRepository: (repositoryId) =>
    set((state) => ({
      storedRepositories: state.storedRepositories.filter(
        (repo) => repo.id !== repositoryId
      ),
    })),

  setAnalyzing: (isAnalyzing) =>
    set({ isAnalyzing }),

  setAnalysisStatus: (analysisStatus) =>
    set({ analysisStatus }),

  setAnalysisResult: (analysisResult) =>
    set({ analysisResult, analysisError: null }),

  setAnalysisError: (analysisError) =>
    set({ analysisError, analysisResult: null }),

  setLoading: (isLoading) =>
    set({ isLoading }),

  setConnecting: (isConnecting) =>
    set({ isConnecting }),

  setConnectionStatus: (connectionStatus) =>
    set({ connectionStatus }),

  setError: (error) =>
    set({ error }),

  reset: () =>
    set(initialState),

  resetAnalysis: () =>
    set({
      isAnalyzing: false,
      analysisStatus: "idle",
      analysisResult: null,
      analysisError: null,
    }),
}));

// Made with Bob