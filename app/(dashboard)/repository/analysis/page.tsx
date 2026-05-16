"use client";

import { AnalysisHeader } from "@/components/repository/AnalysisHeader";
import { AnalysisSummary } from "@/components/repository/AnalysisSummary";
import { TechStackCards } from "@/components/repository/TechStackCards";
import { FolderIntelligence } from "@/components/repository/FolderIntelligence";
import { ImportantFiles } from "@/components/repository/ImportantFiles";
import { ArchitectureInsights } from "@/components/repository/ArchitectureInsights";
import { ContributionGuide } from "@/components/repository/ContributionGuide";

// Simulated Repository Data
const MOCK_REPO = {
  name: "devspace-mentor-ai",
  visibility: "public" as const,
  lastAnalyzed: "2 minutes ago",
  healthScore: 94,
  topTech: ["Next.js", "TypeScript", "Tailwind CSS"],
  summary: "Devspace Mentor AI is a sophisticated AI-powered developer productivity platform built on a modern Next.js 15 stack. The codebase follows a clean architecture pattern with clear separation of concerns between UI components, business logic services, and external integrations. It leverages shadcn/ui for a premium design system and IBM Watsonx for its core AI capabilities, providing a robust foundation for repository analysis and developer onboarding.",
  technologies: [
    { name: "Next.js", confidence: 100, category: "Framework", summary: "Used as the core application framework with App Router for server-side rendering and API routes." },
    { name: "TypeScript", confidence: 100, category: "Language", summary: "Provides type safety across the entire codebase, ensuring robust data structures and fewer runtime errors." },
    { name: "Tailwind CSS", confidence: 98, category: "Styling", summary: "Utilized for all visual styling, enabling a highly customized and responsive design system." },
    { name: "Clerk", confidence: 95, category: "Authentication", summary: "Handles user authentication, session management, and secure access to dashboard features." },
    { name: "Prisma", confidence: 92, category: "ORM", summary: "Acts as the database toolkit for PostgreSQL, providing typed database access and migration management." },
    { name: "Supabase", confidence: 90, category: "Database", summary: "Used as the primary cloud database and storage solution for repository metadata and analysis results." }
  ],
  folders: [
    { name: "app", purpose: "Routing and Page Layouts", complexity: "medium" as const, insight: "Contains the main application routes. Uses Next.js App Router conventions with clear logical grouping of dashboard features." },
    { name: "components", purpose: "Reusable UI Library", complexity: "low" as const, insight: "Well-organized component library following atomic design principles. High reuse potential and consistent styling." },
    { name: "hooks", purpose: "Custom React Logic", complexity: "medium" as const, insight: "Encapsulates complex state management and side effects, making components cleaner and easier to test." },
    { name: "lib", purpose: "External Integrations", complexity: "medium" as const, insight: "Core utilities and SDK initializations for Watsonx, Supabase, and other third-party services." },
    { name: "services", purpose: "Business Logic Layer", complexity: "high" as const, insight: "The 'brain' of the application. Handles complex data transformations and AI processing flows." }
  ],
  importantFiles: [
    { name: "next.config.ts", role: "Build Configuration", explanation: "Defines the build environment, API rewrites, and performance optimizations for the Next.js platform." },
    { name: "middleware.ts", role: "Request Interceptor", explanation: "Handles edge-level authentication checks and route protection before requests reach the server components." },
    { name: "AGENTS.md", role: "Development Standards", explanation: "A critical file defining the AI coding standards and development philosophy for the entire project team." },
    { name: "lib/watsonx.ts", role: "AI Core", explanation: "The primary integration point for IBM Watsonx AI services, managing prompt templates and response parsing." }
  ],
  insights: [
    { title: "Modular Architecture", category: "organization" as const, description: "The codebase is highly modular with a clear 'services' layer that abstracts business logic from UI components." },
    { title: "High Scalability Potential", category: "scalability" as const, description: "Use of server actions and optimized API routes allows for handling increased load without significant structural changes." },
    { title: "Onboarding Score: Excellent", category: "onboarding" as const, description: "Comprehensive documentation and consistent naming conventions make this a great codebase for junior developers to learn from." },
    { title: "Maintained by Standards", category: "maintainability" as const, description: "Strict TypeScript enforcement and automated linting ensure a high standard of code quality over time." }
  ],
  suggestions: [
    { title: "Add Unit Tests for Services", type: "Improvement", description: "The services layer currently lacks comprehensive unit tests. Adding tests for the AI parsing logic would increase reliability.", difficulty: "intermediate" as const, estimatedTime: "4 hours" },
    { title: "Extract Dashboard Layout", type: "Refactoring", description: "Some logic in the dashboard shell could be extracted into smaller, more reusable presentational components.", difficulty: "beginner" as const, estimatedTime: "2 hours" },
    { title: "Update README Examples", type: "Documentation", description: "The current README is good but could benefit from more detailed code examples for the new analysis features.", difficulty: "beginner" as const, estimatedTime: "1 hour" }
  ]
};

export default function AnalysisPage() {
  return (
    <div className="max-w-[1440px] mx-auto space-y-12 pb-20">
      {/* 1. Repository Header */}
      <AnalysisHeader 
        repoName={MOCK_REPO.name}
        visibility={MOCK_REPO.visibility}
        lastAnalyzed={MOCK_REPO.lastAnalyzed}
        healthScore={MOCK_REPO.healthScore}
        topTech={MOCK_REPO.topTech}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Summary and Tech Stack */}
        <div className="lg:col-span-8 space-y-12">
          {/* 2. AI Summary Card */}
          <AnalysisSummary summary={MOCK_REPO.summary} />
          
          {/* 3. Tech Stack Detection */}
          <TechStackCards technologies={MOCK_REPO.technologies} />
          
          {/* 4. Folder Structure Intelligence */}
          <FolderIntelligence folders={MOCK_REPO.folders} />
        </div>

        {/* Right Column: Insights and Files */}
        <div className="lg:col-span-4 space-y-12">
          {/* 6. Architecture Insights */}
          <ArchitectureInsights insights={MOCK_REPO.insights} />
          
          {/* 5. Important Files */}
          <ImportantFiles files={MOCK_REPO.importantFiles} />
        </div>
      </div>

      {/* 7. Contribution Suggestions */}
      <ContributionGuide suggestions={MOCK_REPO.suggestions} />
    </div>
  );
}
