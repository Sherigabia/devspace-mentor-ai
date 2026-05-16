"use client";

import { X, BrainCircuit, CheckCircle2, BookOpen, Layers, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface FolderAnalysis {
  name: string;
  aiInsight: string;
  patterns: string[];
  onboardingNotes: string;
  learningTopics: string[];
  complexity: "low" | "medium" | "high";
  relatedInsights: string[];
}

interface FolderAnalysisDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  folder: FolderAnalysis | null;
}

export function FolderAnalysisDrawer({ isOpen, onClose, folder }: FolderAnalysisDrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div 
        className={cn(
          "relative h-full w-full max-w-lg bg-[#0a0a0b] border-l border-[#262626] shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#262626] bg-[#131314]/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#c0c1ff]/10 border border-[#c0c1ff]/20">
              <BrainCircuit className="h-5 w-5 text-[#c0c1ff]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#e5e2e3] font-mono">{folder?.name}/</h2>
              <span className="text-[10px] font-bold text-[#908fa0] uppercase tracking-widest">Architectural Analysis</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#262626] text-[#908fa0] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 pb-12">
          {/* AI Insight Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#c0c1ff]">
              <Info className="h-4 w-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">AI Insight</h3>
            </div>
            <div className="p-5 rounded-2xl bg-[#c0c1ff]/5 border border-[#c0c1ff]/10">
              <p className="text-[#e5e2e3] text-sm leading-relaxed italic">
                "{folder?.aiInsight}"
              </p>
            </div>
          </section>

          {/* Complexity & Patterns */}
          <div className="grid grid-cols-2 gap-4">
            <section className="space-y-4 p-5 rounded-2xl border border-[#262626] bg-[#131314]/30">
              <h3 className="text-[10px] font-bold text-[#908fa0] uppercase tracking-widest">Complexity</h3>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase border",
                  folder?.complexity === "low" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                  folder?.complexity === "medium" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                  "bg-red-500/10 text-red-400 border-red-500/20"
                )}>
                  {folder?.complexity}
                </span>
              </div>
            </section>
            <section className="space-y-4 p-5 rounded-2xl border border-[#262626] bg-[#131314]/30">
              <h3 className="text-[10px] font-bold text-[#908fa0] uppercase tracking-widest">Status</h3>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-bold">OPTIMIZED</span>
              </div>
            </section>
          </div>

          {/* Patterns Detected */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#4cd7f6]">
              <Layers className="h-4 w-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Patterns Detected</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {folder?.patterns.map((pattern) => (
                <span key={pattern} className="px-3 py-1.5 rounded-lg bg-[#262626] text-[#e5e2e3] text-xs font-medium border border-[#464554]">
                  {pattern}
                </span>
              ))}
            </div>
          </section>

          {/* Onboarding Notes */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#ffb783]">
              <BookOpen className="h-4 w-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Developer Notes</h3>
            </div>
            <p className="text-[#908fa0] text-sm leading-relaxed">
              {folder?.onboardingNotes}
            </p>
          </section>

          {/* Suggested Learning */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-[#e5e2e3] uppercase tracking-wider">Suggested Learning</h3>
            <div className="space-y-2">
              {folder?.learningTopics.map((topic) => (
                <div key={topic} className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0b] border border-[#262626] group hover:border-[#c0c1ff]/30 transition-all cursor-pointer">
                  <div className="h-2 w-2 rounded-full bg-[#c0c1ff]" />
                  <span className="text-xs text-[#908fa0] group-hover:text-[#e5e2e3] transition-colors">{topic}</span>
                </div>
              ))}
            </div>
          </section>
          
          {/* Related Architecture Insights */}
          <section className="space-y-4 pt-4 border-t border-[#262626]">
            <h3 className="text-sm font-bold text-[#e5e2e3] uppercase tracking-wider">Related Insights</h3>
            <div className="space-y-3">
              {folder?.relatedInsights.map((insight) => (
                <div key={insight} className="text-xs text-[#908fa0] flex gap-2">
                  <span className="text-[#c0c1ff]">•</span>
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#262626] bg-[#131314]/50 flex gap-3">
          <button className="flex-1 py-3 rounded-xl bg-[#c0c1ff] text-[#0a0a0b] text-sm font-bold hover:bg-[#a5a6ff] transition-all active:scale-95">
            Open File Explorer
          </button>
          <button className="px-4 py-3 rounded-xl border border-[#262626] text-[#908fa0] hover:text-[#e5e2e3] transition-all active:scale-95">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
