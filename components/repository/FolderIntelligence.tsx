"use client";

import { Folder, ArrowRight, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FolderAnalysisDrawer } from "./FolderAnalysisDrawer";

interface FolderItem {
  name: string;
  purpose: string;
  complexity: "low" | "medium" | "high";
  insight: string;
  aiInsight: string;
  patterns: string[];
  onboardingNotes: string;
  learningTopics: string[];
  relatedInsights: string[];
}

interface FolderIntelligenceProps {
  folders: FolderItem[];
}

export function FolderIntelligence({ folders }: FolderIntelligenceProps) {
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleExplore = (folder: FolderItem) => {
    setSelectedFolder(folder);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#4cd7f6]/10 border border-[#4cd7f6]/20">
          <BrainCircuit className="h-5 w-5 text-[#4cd7f6]" />
        </div>
        <h2 className="text-xl font-bold text-[#e5e2e3]">Folder Structure Intelligence</h2>
      </div>

      <div className="grid gap-4">
        {folders.map((folder) => (
          <div key={folder.name} className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-[#262626] bg-[#131314]/30 hover:border-[#464554] transition-all">
            <div className="flex flex-col gap-4 min-w-[200px]">
              <div className="flex items-center gap-3">
                <Folder className="h-5 w-5 text-[#c0c1ff]" />
                <h3 className="font-bold text-[#e5e2e3] font-mono">{folder.name}/</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#908fa0] font-bold uppercase tracking-wider">Complexity:</span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  folder.complexity === "low" ? "bg-green-500/10 text-green-400" :
                  folder.complexity === "medium" ? "bg-amber-500/10 text-amber-400" :
                  "bg-red-500/10 text-red-400"
                )}>
                  {folder.complexity}
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#e5e2e3]">{folder.purpose}</p>
                <p className="text-xs text-[#908fa0] leading-relaxed">
                  {folder.insight}
                </p>
              </div>
              <button 
                onClick={() => handleExplore(folder)}
                className="flex items-center gap-2 text-[10px] font-bold text-[#c0c1ff] uppercase tracking-widest hover:text-[#a5a6ff] transition-colors"
              >
                Explore Logic <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Analysis Drawer */}
      <FolderAnalysisDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        folder={selectedFolder} 
      />
    </div>
  );
}
