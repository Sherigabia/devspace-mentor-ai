"use client";

import { Layout, Maximize, UserPlus, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightItem {
  title: string;
  category: "organization" | "scalability" | "onboarding" | "maintainability";
  description: string;
}

interface ArchitectureInsightsProps {
  insights: InsightItem[];
}

const categoryConfig = {
  organization: { icon: Layout, color: "text-[#c0c1ff]", bg: "bg-[#c0c1ff]/10", border: "border-[#c0c1ff]/20" },
  scalability: { icon: Maximize, color: "text-[#4cd7f6]", bg: "bg-[#4cd7f6]/10", border: "border-[#4cd7f6]/20" },
  onboarding: { icon: UserPlus, color: "text-[#ffb783]", bg: "bg-[#ffb783]/10", border: "border-[#ffb783]/20" },
  maintainability: { icon: Heart, color: "text-[#6366f1]", bg: "bg-[#6366f1]/10", border: "border-[#6366f1]/20" },
};

export function ArchitectureInsights({ insights }: ArchitectureInsightsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#e5e2e3]">Architecture Insights</h2>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {insights.map((insight) => {
          const config = categoryConfig[insight.category];
          return (
            <div key={insight.title} className="p-6 rounded-2xl border border-[#262626] bg-[#131314]/30 hover:bg-[#131314] transition-all">
              <div className="flex items-start gap-4">
                <div className={cn("p-3 rounded-xl border", config.bg, config.border)}>
                  <config.icon className={cn("h-5 w-5", config.color)} />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col">
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest mb-1", config.color)}>
                      {insight.category}
                    </span>
                    <h3 className="text-base font-bold text-[#e5e2e3]">{insight.title}</h3>
                  </div>
                  <p className="text-sm text-[#908fa0] leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
