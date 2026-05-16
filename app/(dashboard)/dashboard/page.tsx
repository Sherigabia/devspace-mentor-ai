"use client";

import Link from "next/link";
import { FolderGit, Lightbulb, GraduationCap, Sparkles, Shield, Zap, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentAnalysisCard } from "@/components/dashboard/RecentAnalysisCard";
import { AIInsightItem } from "@/components/dashboard/AIInsightItem";
import { LearningProgressCard } from "@/components/dashboard/LearningProgressCard";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-100 tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Welcome back! Here's your AI-powered development overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Repositories"
          value={12}
          icon={FolderGit}
          color="primary"
          trend={{ value: "+2 this week", isPositive: true }}
        />
        <StatCard
          label="AI Insights"
          value={24}
          icon={Lightbulb}
          color="secondary"
          trend={{ value: "+8 new", isPositive: true }}
        />
        <StatCard
          label="Learning Paths"
          value={8}
          icon={GraduationCap}
          color="tertiary"
          trend={{ value: "3 in progress", isPositive: true }}
        />
      </div>

      {/* Recent Analyses Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-100">Recent Analyses</h2>
          <Link
            href="/repository"
            className="text-sm text-[#c0c1ff] hover:text-[#a5a6ff] transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
          <RecentAnalysisCard
            title="E-Commerce Platform"
            language="React"
            health={92}
            issues="2 Fixes"
            languageColor="primary"
          />
          <RecentAnalysisCard
            title="Stripe API Wrapper"
            language="Node.js"
            health={88}
            issues="1 Security Fix"
            languageColor="tertiary"
          />
          <RecentAnalysisCard
            title="Inventory Schema"
            language="GraphQL"
            health={96}
            issues="Optimized"
            languageColor="secondary"
          />
        </div>
      </section>

      {/* Bento Layout: AI Insights & Learning Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights Overview */}
        <section className="lg:col-span-2 bg-[#201f20] border border-[#262626] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#c0c1ff]/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-[#c0c1ff]" />
              </div>
              <h3 className="text-lg font-bold text-gray-100">AI Insights Overview</h3>
            </div>
            <span className="text-xs text-gray-400">Last updated 2m ago</span>
          </div>
          <div className="space-y-4">
            <AIInsightItem
              icon={Lightbulb}
              iconColor="text-[#4cd7f6]"
              title="Redundant Hook Detection"
              description="In `useAuth.ts`, the `useEffect` hook can be simplified by removing the `token` dependency. This will reduce unnecessary re-renders in the main app layout."
              filePath="src/hooks/useAuth.ts"
            />
            <AIInsightItem
              icon={Shield}
              iconColor="text-[#ffb783]"
              title="Security Vulnerability Found"
              description="Detected a potential secret leak in `.github/workflows/deploy.yml`. Environment variables should be stored in GitHub Secrets rather than hardcoded."
              badge={{ text: "Action Required", variant: "error" }}
            />
            <AIInsightItem
              icon={Zap}
              iconColor="text-[#c0c1ff]"
              title="Performance Bottleneck"
              description="The `ListRenderer` component is re-rendering too frequently. Consider using `React.memo` or `useMemo` for the heavy sorting logic."
              badge={{ text: "Optimization", variant: "default" }}
            />
          </div>
        </section>

        {/* Sidebar: AI Assistant & Learning Progress */}
        <section className="space-y-6">
          {/* Lumina AI Assistant Card */}
          <div className="glass-surface p-6 rounded-xl border border-[#262626] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles className="w-16 h-16 text-[#4cd7f6]" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#4cd7f6] shadow-[0_0_8px_#4cd7f6]" />
              <h4 className="text-xs font-medium text-[#4cd7f6] tracking-widest uppercase">
                Lumina Assistant
              </h4>
            </div>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed italic">
              "You're making great progress on the React Native Core repo. I've prepared a
              personalized learning path based on your recent commits."
            </p>
            <Link
              href="/learning"
              className="block w-full py-3 bg-[#c0c1ff] text-[#0a0a0b] rounded-xl font-bold text-sm text-center hover:shadow-[0_0_20px_rgba(192,193,255,0.4)] transition-all"
            >
              Start Daily Lesson
            </Link>
          </div>

          {/* Learning Progress */}
          <LearningProgressCard
            items={[
              { label: "Design Patterns", progress: 75, color: "primary" },
              { label: "Performance Ops", progress: 42, color: "secondary" },
              { label: "Security Fundamentals", progress: 90, color: "tertiary" },
            ]}
          />
        </section>
      </div>

      {/* Quick Actions */}
      <section className="bg-[#201f20] border border-[#262626] rounded-xl p-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#c0c1ff]/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-[#c0c1ff]" />
          </div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">
            Ready to analyze a new repository?
          </h3>
          <p className="text-gray-400 mb-6">
            Connect your repository to begin analyzing code and generating AI-powered insights.
          </p>
          <Link
            href="/repository"
            className="inline-block px-6 py-2.5 bg-[#c0c1ff] hover:bg-[#a5a6ff] text-[#0a0a0b] font-medium rounded-lg transition-colors"
          >
            Connect Repository
          </Link>
        </div>
      </section>
    </div>
  );
}

// Made with Bob
