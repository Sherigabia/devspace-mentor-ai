"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { RepositoryPicker } from "@/components/repository/RepositoryPicker";
import { RepositoryHeader } from "@/components/repository/RepositoryHeader";
import { AIInsightCard } from "@/components/repository/AIInsightCard";
import { TechStackList } from "@/components/repository/TechStackList";
import { InsightsPanel } from "@/components/repository/InsightsPanel";
import { ContributionSuggestions } from "@/components/repository/ContributionSuggestions";
import { AnalysisTimeline } from "@/components/repository/AnalysisTimeline";
import { QuickActionsPanel } from "@/components/repository/QuickActionsPanel";
import { useRepositoryStore } from "@/store/repository.store";

/**
 * Repository Analysis Page
 * Complete flow: GitHub → Picker → Auto AI Analysis → Display Results
 */

export default function RepositoryPage() {
  const { user, isLoaded } = useUser();
  
  const {
    selectedRepository,
    isAnalyzing,
    analysisStatus,
    analysisResult,
    analysisError,
    setAnalyzing,
    setAnalysisStatus,
    setAnalysisResult,
    setAnalysisError,
    resetAnalysis,
  } = useRepositoryStore();

  // Auto-trigger AI analysis when repository is selected
  useEffect(() => {
    if (selectedRepository && analysisStatus === "idle") {
      triggerAnalysis(selectedRepository.full_name);
    }
  }, [selectedRepository]);

  const triggerAnalysis = async (repoFullName: string) => {
    try {
      setAnalyzing(true);
      setAnalysisStatus("analyzing");
      setAnalysisError(null);

      const response = await fetch("/api/ai/analyze-repository", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repoFullName,
          forceRefresh: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Analysis failed");
      }

      const data = await response.json();
      
      setAnalysisResult(data.analysis);
      setAnalysisStatus("completed");
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysisError(error instanceof Error ? error.message : "Analysis failed");
      setAnalysisStatus("error");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleForceRefresh = () => {
    if (selectedRepository) {
      resetAnalysis();
      triggerAnalysis(selectedRepository.full_name);
    }
  };

  // Loading state while Clerk loads
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="w-12 h-12 text-gray-400" />
        <p className="text-gray-400">Please sign in to continue</p>
      </div>
    );
  }

  // No repository selected - show picker
  if (!selectedRepository) {
    return (
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-100">
            Select a Repository
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose a repository to analyze. We'll automatically generate AI-powered insights,
            documentation, and personalized learning paths.
          </p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <RepositoryPicker />
        </div>
      </div>
    );
  }

  // Repository selected - show analysis states
  
  // Analyzing state
  if (isAnalyzing || analysisStatus === "analyzing") {
    return (
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-100">
              Analyzing {selectedRepository.name}
            </h2>
            <p className="text-gray-400">
              Our AI is analyzing the repository structure, dependencies, and codebase...
            </p>
          </div>
        </div>

        {/* Analysis progress steps */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="space-y-4">
            <AnalysisStep label="Fetching repository data" status="completed" />
            <AnalysisStep label="Building context" status="completed" />
            <AnalysisStep label="AI analysis in progress" status="in-progress" />
            <AnalysisStep label="Generating insights" status="pending" />
            <AnalysisStep label="Caching results" status="pending" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (analysisStatus === "error" || analysisError) {
    return (
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-100">
              Analysis Failed
            </h2>
            <p className="text-gray-400">
              {analysisError || "Unable to analyze repository"}
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleForceRefresh}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={() => {
                resetAnalysis();
                useRepositoryStore.getState().selectRepository(null);
              }}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg font-medium transition-colors"
            >
              Choose Different Repository
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success - show analysis results
  if (analysisStatus === "completed" && analysisResult) {
    const {
      summary,
      techStack,
      modules,
      entryPoints,
      complexity,
      developerOnboarding,
      suggestedFirstIssues,
      learningPath,
    } = analysisResult;

    // Convert to display format
    const displayTechStack = techStack.map((tech) => ({
      id: tech.name,
      name: tech.name,
      category: tech.category as "framework" | "language" | "styling" | "database" | "tool",
      description: tech.purpose,
      color: "blue",
    }));

    const displayInsights = [
      {
        id: "complexity",
        title: "Project Complexity",
        description: `This project has ${complexity} complexity level`,
        type: "architecture" as const,
        priority: complexity === "high" ? "high" as const : "medium" as const,
        icon: "layers",
      },
      {
        id: "onboarding",
        title: "Developer Onboarding",
        description: developerOnboarding.substring(0, 150) + "...",
        type: "architecture" as const,
        priority: "high" as const,
        icon: "book-open",
      },
    ];

    const displayContributions = suggestedFirstIssues.map((issue, index) => ({
      id: `issue-${index}`,
      title: issue.title,
      description: issue.description,
      difficulty: issue.difficulty as "beginner" | "intermediate" | "advanced",
      estimatedTime: issue.estimatedTime,
      files: issue.files,
    }));

    const displaySteps = [
      { id: "1", label: "Repository fetched", status: "completed" as const, timestamp: new Date().toISOString() },
      { id: "2", label: "Context built", status: "completed" as const, timestamp: new Date().toISOString() },
      { id: "3", label: "AI analysis completed", status: "completed" as const, timestamp: new Date().toISOString() },
      { id: "4", label: "Results cached", status: "completed" as const, timestamp: new Date().toISOString() },
    ];

    return (
      <div className="space-y-8">
        {/* Repository Header */}
        <div className="flex items-center justify-between">
          <RepositoryHeader
            repository={{
              id: selectedRepository.id.toString(),
              name: selectedRepository.name,
              fullName: selectedRepository.full_name,
              description: selectedRepository.description || "",
              version: "1.0.0",
              language: selectedRepository.language || "Unknown",
              lastUpdated: selectedRepository.updated_at,
              stars: selectedRepository.stargazers_count,
              forks: selectedRepository.forks_count,
            }}
          />
          <button
            onClick={handleForceRefresh}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Analysis
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-6">
            <AIInsightCard
              summary={summary}
              metrics={[
                { label: "Complexity", value: complexity, color: "blue" },
                { label: "Tech Stack", value: techStack.length, color: "green" },
                { label: "Modules", value: modules.length, color: "purple" },
                { label: "Entry Points", value: entryPoints.length, color: "orange" },
              ]}
            />
            <TechStackList techStack={displayTechStack} />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <InsightsPanel insights={displayInsights} />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContributionSuggestions contributions={displayContributions} />
          <AnalysisTimeline steps={displaySteps} />
        </div>

        <QuickActionsPanel />
      </div>
    );
  }

  // Fallback
  return null;
}

// Helper component for analysis steps
function AnalysisStep({
  label,
  status,
}: {
  label: string;
  status: "pending" | "in-progress" | "completed";
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
          status === "completed"
            ? "bg-green-500/20 text-green-500"
            : status === "in-progress"
            ? "bg-blue-500/20 text-blue-500"
            : "bg-gray-700 text-gray-500"
        }`}
      >
        {status === "completed" ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : status === "in-progress" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-current" />
        )}
      </div>
      <span
        className={`text-sm ${
          status === "completed"
            ? "text-gray-300"
            : status === "in-progress"
            ? "text-blue-400 font-medium"
            : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

// Made with Bob