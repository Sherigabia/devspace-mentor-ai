"use client";

import { Shield, Clock, Heart, Code2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisHeaderProps {
  repoName: string;
  visibility: "public" | "private";
  lastAnalyzed: string;
  healthScore: number;
  topTech: string[];
  onBack?: () => void;
  onRefresh?: () => void;
}

export function AnalysisHeader({
  repoName,
  visibility,
  lastAnalyzed,
  healthScore,
  topTech,
  onBack,
  onRefresh,
}: AnalysisHeaderProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between p-6 rounded-2xl border border-[#262626] bg-[#131314]/50 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-[#e5e2e3] tracking-tight">
            {repoName}
          </h1>
          <span className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-semibold border",
            visibility === "public" 
              ? "bg-green-500/10 text-green-400 border-green-500/20" 
              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
          )}>
            {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-[#908fa0]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#c0c1ff]" />
            <span>Analyzed {lastAnalyzed}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#4cd7f6]" />
            <div className="flex items-center gap-3">
              <span className="whitespace-nowrap">Health Score:</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-16 bg-[#262626] rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-1000",
                      healthScore >= 90 ? "bg-green-400" : healthScore >= 70 ? "bg-amber-400" : "bg-red-400"
                    )}
                    style={{ width: `${healthScore}%` }}
                  />
                </div>
                <span className={cn(
                  "font-bold text-xs",
                  healthScore >= 90 ? "text-green-400" : healthScore >= 70 ? "text-amber-400" : "text-red-400"
                )}>
                  {healthScore}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#ffb783]" />
            <div className="flex gap-2">
              {topTech.map((tech) => (
                <span key={tech} className="px-2 py-0.5 rounded-md bg-[#262626] text-[#e5e2e3] text-[10px] font-medium border border-[#464554]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#262626] bg-[#0a0a0b] text-sm font-medium text-[#908fa0] hover:text-[#e5e2e3] hover:bg-[#131314] transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Switch Repo
          </button>
        )}
        <button 
          onClick={onRefresh}
          className="px-4 py-2 rounded-xl border border-[#262626] bg-[#0a0a0b] text-sm font-medium text-[#e5e2e3] hover:bg-[#131314] transition-all active:scale-95"
        >
          Refresh Analysis
        </button>
        <button className="px-6 py-2 rounded-xl bg-[#6366f1] text-sm font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:bg-[#4f46e5] transition-all active:scale-95">
          Generate Docs
        </button>
      </div>
    </div>
  );
}
