"use client";

import { Lightbulb, CheckCircle2, Timer, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Suggestion {
  title: string;
  type: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
}

interface ContributionGuideProps {
  suggestions: Suggestion[];
}

export function ContributionGuide({ suggestions }: ContributionGuideProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#4cd7f6]/10 border border-[#4cd7f6]/20">
          <Lightbulb className="h-5 w-5 text-[#4cd7f6]" />
        </div>
        <h2 className="text-xl font-bold text-[#e5e2e3]">Contribution Roadmap</h2>
      </div>

      <div className="grid gap-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.title} className="p-6 rounded-2xl border border-[#262626] bg-[#131314]/30 hover:border-[#464554] transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#4cd7f6] uppercase tracking-wider bg-[#4cd7f6]/10 px-2 py-0.5 rounded border border-[#4cd7f6]/20">
                    {suggestion.type}
                  </span>
                  <h3 className="text-lg font-bold text-[#e5e2e3] group-hover:text-[#4cd7f6] transition-colors">{suggestion.title}</h3>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-[#908fa0]">
                  <Timer className="h-3.5 w-3.5" />
                  <span>{suggestion.estimatedTime}</span>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase border",
                  suggestion.difficulty === "beginner" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                  suggestion.difficulty === "intermediate" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                  "bg-red-500/10 text-red-400 border-red-500/20"
                )}>
                  {suggestion.difficulty}
                </div>
              </div>
            </div>

            <p className="text-sm text-[#908fa0] leading-relaxed mb-6">
              {suggestion.description}
            </p>

            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#262626] text-[#e5e2e3] text-xs font-bold hover:bg-[#323232] transition-all active:scale-95">
                <FileText className="h-3.5 w-3.5" />
                View Requirements
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4cd7f6] text-[#0a0a0b] text-xs font-bold hover:bg-[#3ac5e4] transition-all active:scale-95">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Claim Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
