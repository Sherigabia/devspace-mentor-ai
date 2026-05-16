"use client";

import { useState } from "react";
import { AIInsight } from "@/types/repository";
import { Lightbulb, Shield, Zap, Code } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightsPanelProps {
  insights: AIInsight[];
}

const iconMap = {
  lightbulb: Lightbulb,
  security: Shield,
  speed: Zap,
  architecture: Code,
};

const colorMap = {
  optimization: {
    bg: "bg-[#c0c1ff]/10",
    border: "border-[#c0c1ff]/20",
    text: "text-[#c0c1ff]",
  },
  security: {
    bg: "bg-[#4cd7f6]/10",
    border: "border-[#4cd7f6]/20",
    text: "text-[#4cd7f6]",
  },
  performance: {
    bg: "bg-[#ffb783]/10",
    border: "border-[#ffb783]/20",
    text: "text-[#ffb783]",
  },
  architecture: {
    bg: "bg-[#c0c1ff]/10",
    border: "border-[#c0c1ff]/20",
    text: "text-[#c0c1ff]",
  },
};

export function InsightsPanel({ insights }: InsightsPanelProps) {
  const [activeTab, setActiveTab] = useState<
    "insights" | "documentation" | "onboarding"
  >("insights");

  return (
    <div className="bg-[#161618]/70 backdrop-blur-xl border border-[#262626] rounded-xl overflow-hidden flex flex-col min-h-[600px]">
      {/* Tabs */}
      <div className="flex border-b border-[#464554]/20 bg-[#1c1b1c]">
        <button
          onClick={() => setActiveTab("insights")}
          className={cn(
            "px-8 py-4 font-medium transition-all",
            activeTab === "insights"
              ? "border-b-2 border-[#c0c1ff] text-[#c0c1ff] bg-[#c0c1ff]/5"
              : "text-[#908fa0] hover:text-[#e5e2e3]"
          )}
        >
          Insights
        </button>
        <button
          onClick={() => setActiveTab("documentation")}
          className={cn(
            "px-8 py-4 font-medium transition-all",
            activeTab === "documentation"
              ? "border-b-2 border-[#c0c1ff] text-[#c0c1ff] bg-[#c0c1ff]/5"
              : "text-[#908fa0] hover:text-[#e5e2e3]"
          )}
        >
          Documentation
        </button>
        <button
          onClick={() => setActiveTab("onboarding")}
          className={cn(
            "px-8 py-4 font-medium transition-all",
            activeTab === "onboarding"
              ? "border-b-2 border-[#c0c1ff] text-[#c0c1ff] bg-[#c0c1ff]/5"
              : "text-[#908fa0] hover:text-[#e5e2e3]"
          )}
        >
          Onboarding
        </button>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8 overflow-y-auto flex-grow">
        {activeTab === "insights" && (
          <>
            {insights.map((insight) => {
              const Icon = iconMap[insight.icon as keyof typeof iconMap];
              const colors = colorMap[insight.type];

              return (
                <div
                  key={insight.id}
                  className="flex items-start gap-4 p-6 rounded-xl border border-[#464554]/10 bg-[#1c1b1c] hover:border-[#464554]/30 transition-all"
                >
                  <div
                    className={cn(
                      "p-2 rounded-lg border",
                      colors.bg,
                      colors.border
                    )}
                  >
                    <Icon className={cn("w-6 h-6", colors.text)} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-semibold text-[#e5e2e3] mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-[#908fa0] leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {activeTab === "documentation" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#c0c1ff]/10 flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-[#c0c1ff]" />
            </div>
            <h3 className="text-xl font-semibold text-[#e5e2e3] mb-2">
              Documentation Coming Soon
            </h3>
            <p className="text-[#908fa0]">
              AI-generated documentation will appear here
            </p>
          </div>
        )}

        {activeTab === "onboarding" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#4cd7f6]/10 flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-[#4cd7f6]" />
            </div>
            <h3 className="text-xl font-semibold text-[#e5e2e3] mb-2">
              Onboarding Guide Coming Soon
            </h3>
            <p className="text-[#908fa0]">
              Step-by-step onboarding guide will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Made with Bob