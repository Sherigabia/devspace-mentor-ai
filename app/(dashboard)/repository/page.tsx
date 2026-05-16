"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { RepositoryPicker } from "@/components/repository/RepositoryPicker";
import { AnalysisHeader } from "@/components/repository/AnalysisHeader";
import { AnalysisSummary } from "@/components/repository/AnalysisSummary";
import { TechStackCards } from "@/components/repository/TechStackCards";
import { FolderIntelligence } from "@/components/repository/FolderIntelligence";
import { ImportantFiles } from "@/components/repository/ImportantFiles";
import { ArchitectureInsights } from "@/components/repository/ArchitectureInsights";
import { ContributionGuide } from "@/components/repository/ContributionGuide";
import { useRepositoryStore } from "@/store/repository.store";
import { MOCK_ANALYSIS_DATA } from "@/constants/mock-data";

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

      // Simulate AI analysis delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Use mock data instead of calling the real API
      setAnalysisResult(MOCK_ANALYSIS_DATA);
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
    const data = analysisResult as typeof MOCK_ANALYSIS_DATA;

    return (
      <div className="max-w-[1440px] mx-auto space-y-12 pb-20">
        {/* 1. Repository Header */}
        <AnalysisHeader 
          repoName={selectedRepository.name}
          visibility={selectedRepository.private ? "private" : "public"}
          lastAnalyzed="Just now"
          healthScore={data.healthScore}
          topTech={data.topTech}
          onBack={() => {
            resetAnalysis();
            useRepositoryStore.getState().selectRepository(null);
          }}
          onRefresh={handleForceRefresh}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Summary and Tech Stack */}
          <div className="lg:col-span-8 space-y-12">
            {/* 2. AI Summary Card */}
            <AnalysisSummary summary={data.summary} />
            
            {/* 3. Tech Stack Detection */}
            <TechStackCards technologies={data.technologies} />
            
            {/* 4. Folder Structure Intelligence */}
            <FolderIntelligence folders={data.folders} />
          </div>

          {/* Right Column: Insights and Files */}
          <div className="lg:col-span-4 space-y-12">
            {/* 6. Architecture Insights */}
            <ArchitectureInsights insights={data.insights} />
            
            {/* 5. Important Files */}
            <ImportantFiles files={data.importantFiles} />
          </div>
        </div>

        {/* 7. Contribution Suggestions */}
        <ContributionGuide suggestions={data.suggestions} />
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