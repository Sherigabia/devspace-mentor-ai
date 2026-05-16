import {
  Repository,
  TechStackItem,
  FileNode,
  AIInsight,
  ArchitecturePattern,
  ContributionSuggestion,
  AnalysisMetric,
  AnalysisStep,
  RepositoryAnalysis,
} from "@/types/repository";

/**
 * Mock Repository Data
 * Sample data for repository analysis UI
 */

export const mockRepository: Repository = {
  id: "1",
  name: "next-dashboard-template",
  fullName: "vercel/next-dashboard-template",
  description:
    "A professional-grade, accessible dashboard starter kit optimized for enterprise workflows and data-heavy applications.",
  version: "v2.4.0-stable",
  language: "TypeScript",
  lastUpdated: "2024-01-15",
  stars: 1247,
  forks: 342,
};

export const mockTechStack: TechStackItem[] = [
  {
    id: "1",
    name: "Next.js 14",
    category: "framework",
    description: "App Router, SSR, RSC",
    color: "#000000",
  },
  {
    id: "2",
    name: "TypeScript",
    category: "language",
    description: "End-to-end typing",
    color: "#3178c6",
  },
  {
    id: "3",
    name: "Tailwind CSS",
    category: "styling",
    description: "Utility-first styling",
    color: "#38bdf8",
  },
  {
    id: "4",
    name: "Supabase",
    category: "database",
    description: "Auth & Postgres DB",
    color: "#3ecf8e",
  },
  {
    id: "5",
    name: "Zustand",
    category: "tool",
    description: "State management",
    color: "#c0c1ff",
  },
];

export const mockFileStructure: FileNode[] = [
  {
    name: "app",
    type: "folder",
    path: "/app",
    children: [
      {
        name: "(dashboard)",
        type: "folder",
        path: "/app/(dashboard)",
        children: [
          {
            name: "layout.tsx",
            type: "file",
            path: "/app/(dashboard)/layout.tsx",
          },
          {
            name: "page.tsx",
            type: "file",
            path: "/app/(dashboard)/page.tsx",
          },
        ],
      },
      {
        name: "api",
        type: "folder",
        path: "/app/api",
        children: [
          {
            name: "auth",
            type: "folder",
            path: "/app/api/auth",
          },
        ],
      },
    ],
  },
  {
    name: "components",
    type: "folder",
    path: "/components",
    children: [
      {
        name: "ui",
        type: "folder",
        path: "/components/ui",
      },
    ],
  },
  {
    name: "lib",
    type: "folder",
    path: "/lib",
  },
  {
    name: "tailwind.config.ts",
    type: "file",
    path: "/tailwind.config.ts",
  },
];

export const mockAISummary = `This project uses a modular architecture with a focus on server-side rendering. I've detected a highly optimized data-fetching pattern using Next.js Server Components, which reduces client-side JS by 40%. The directory structure follows the 'Atomic Design' principle, ensuring UI consistency across the dashboard.`;

export const mockInsights: AIInsight[] = [
  {
    id: "1",
    title: "Optimization Opportunity",
    description:
      "The AI noticed 3 repeated patterns in your `/components/ui` folder. Migrating these to a single generic component could reduce maintenance debt by 15%.",
    type: "optimization",
    priority: "medium",
    icon: "lightbulb",
  },
  {
    id: "2",
    title: "Security Audit",
    description:
      "All Supabase environment variables are properly masked. RLS (Row Level Security) is active on 12/12 database tables. No critical vulnerabilities found.",
    type: "security",
    priority: "low",
    icon: "security",
  },
  {
    id: "3",
    title: "Build Efficiency",
    description:
      "Caching is currently under-utilized for static assets. Enabling `next/image` optimization for external avatars could improve LCP by ~200ms.",
    type: "performance",
    priority: "medium",
    icon: "speed",
  },
];

export const mockArchitecturePatterns: ArchitecturePattern[] = [
  {
    name: "Server Components",
    description: "Next.js App Router with React Server Components",
    detected: true,
  },
  {
    name: "Atomic Design",
    description: "Component structure follows atomic design principles",
    detected: true,
  },
  {
    name: "Edge Optimized",
    description: "Optimized for edge runtime deployment",
    detected: true,
  },
];

export const mockContributions: ContributionSuggestion[] = [
  {
    id: "1",
    title: "Add dark mode toggle",
    description:
      "Implement a theme switcher component in the navigation bar",
    difficulty: "beginner",
    estimatedTime: "2-3 hours",
    files: ["components/layout/TopNavbar.tsx", "app/globals.css"],
  },
  {
    id: "2",
    title: "Improve error handling",
    description: "Add error boundaries to main dashboard components",
    difficulty: "intermediate",
    estimatedTime: "4-5 hours",
    files: ["app/(dashboard)/layout.tsx", "components/ErrorBoundary.tsx"],
  },
  {
    id: "3",
    title: "Add unit tests",
    description: "Write tests for utility functions in lib folder",
    difficulty: "beginner",
    estimatedTime: "3-4 hours",
    files: ["lib/utils.ts", "__tests__/utils.test.ts"],
  },
];

export const mockMetrics: AnalysisMetric[] = [
  {
    label: "Performance Score",
    value: "98/100",
    color: "#4cd7f6",
  },
  {
    label: "Type Safety",
    value: "100% TS",
    color: "#c0c1ff",
  },
  {
    label: "Bundle Size",
    value: "142 KB",
    color: "#ffb783",
  },
];

export const mockAnalysisSteps: AnalysisStep[] = [
  {
    id: "1",
    label: "Scanning repository structure",
    status: "completed",
    timestamp: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    label: "Analyzing dependencies",
    status: "completed",
    timestamp: "2024-01-15T10:00:15Z",
  },
  {
    id: "3",
    label: "Detecting architecture patterns",
    status: "completed",
    timestamp: "2024-01-15T10:00:30Z",
  },
  {
    id: "4",
    label: "Generating AI insights",
    status: "completed",
    timestamp: "2024-01-15T10:00:45Z",
  },
];

export const mockRepositoryAnalysis: RepositoryAnalysis = {
  repository: mockRepository,
  techStack: mockTechStack,
  fileStructure: mockFileStructure,
  aiSummary: mockAISummary,
  insights: mockInsights,
  architecturePatterns: mockArchitecturePatterns,
  contributions: mockContributions,
  metrics: mockMetrics,
  analysisSteps: mockAnalysisSteps,
};

// Made with Bob