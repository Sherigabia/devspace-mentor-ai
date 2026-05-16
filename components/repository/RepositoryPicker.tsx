"use client";

import { useEffect, useState } from "react";
import { useRepositoryStore } from "@/store/repository.store";
import { GitFork, Star, Clock, Search, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * RepositoryPicker Component
 * Displays user's GitHub repositories and handles selection + auto-analysis
 */

interface RepositoryPickerProps {
  onRepositorySelect?: (repoFullName: string) => void;
}

export function RepositoryPicker({ onRepositorySelect }: RepositoryPickerProps) {
  const {
    repositories,
    selectedRepository,
    isLoading,
    error,
    setRepositories,
    selectRepository,
    setLoading,
    setError,
  } = useRepositoryStore();

  const [searchQuery, setSearchQuery] = useState("");

  // Fetch repositories on mount
  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/github/repos");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch repositories");
      }

      const data = await response.json();
      setRepositories(data.repositories);
    } catch (err) {
      console.error("Error fetching repositories:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch repositories");
    } finally {
      setLoading(false);
    }
  };

  const handleRepositorySelect = (repo: typeof repositories[0]) => {
    selectRepository(repo);
    
    // Trigger callback if provided
    if (onRepositorySelect) {
      onRepositorySelect(repo.full_name);
    }
  };

  // Filter repositories based on search
  const filteredRepositories = repositories.filter((repo) => {
    const query = searchQuery.toLowerCase();
    return (
      repo.name.toLowerCase().includes(query) ||
      repo.full_name.toLowerCase().includes(query) ||
      (repo.description && repo.description.toLowerCase().includes(query))
    );
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="text-sm text-gray-400">Loading your repositories...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10">
          <AlertCircle className="w-6 h-6 text-red-500" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-gray-200">Failed to load repositories</p>
          <p className="text-xs text-gray-400">{error}</p>
          <button
            onClick={fetchRepositories}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (repositories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800">
          <AlertCircle className="w-6 h-6 text-gray-400" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-gray-200">No repositories found</p>
          <p className="text-xs text-gray-400">
            Connect your GitHub account or create a repository to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Repository count */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {filteredRepositories.length} {filteredRepositories.length === 1 ? "repository" : "repositories"}
        </p>
        {selectedRepository && (
          <p className="text-xs text-blue-400">
            Selected: {selectedRepository.name}
          </p>
        )}
      </div>

      {/* Repository list */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredRepositories.map((repo) => {
          const isSelected = selectedRepository?.id === repo.id;

          return (
            <button
              key={repo.id}
              onClick={() => handleRepositorySelect(repo)}
              className={cn(
                "w-full p-4 rounded-lg border transition-all text-left group",
                isSelected
                  ? "bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/20"
                  : "bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600"
              )}
            >
              <div className="space-y-2">
                {/* Repository name and language */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-100 truncate group-hover:text-blue-400 transition-colors">
                      {repo.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">{repo.full_name}</p>
                  </div>
                  {repo.language && (
                    <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {repo.language}
                    </span>
                  )}
                </div>

                {/* Description */}
                {repo.description && (
                  <p className="text-xs text-gray-400 line-clamp-2">{repo.description}</p>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3" />
                    <span>{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(repo.updated_at)}</span>
                  </div>
                  {repo.private && (
                    <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-gray-700 text-gray-300">
                      Private
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* No results */}
      {filteredRepositories.length === 0 && searchQuery && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-400">No repositories match your search</p>
        </div>
      )}
    </div>
  );
}

// Made with Bob
