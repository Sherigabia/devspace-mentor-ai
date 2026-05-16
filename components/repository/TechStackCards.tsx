"use client";

import { CheckCircle2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechItem {
  name: string;
  confidence: number;
  category: string;
  summary: string;
}

interface TechStackCardsProps {
  technologies: TechItem[];
}

export function TechStackCards({ technologies }: TechStackCardsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#e5e2e3]">Tech Stack Detection</h2>
        <span className="text-xs text-[#908fa0]">Detected {technologies.length} core technologies</span>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech) => (
          <div key={tech.name} className="group p-5 rounded-xl border border-[#262626] bg-[#131314]/30 transition-all hover:bg-[#131314] hover:border-[#464554]">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#e5e2e3]">{tech.name}</h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#908fa0]">
                  {tech.category}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-[#c0c1ff]">{tech.confidence}%</span>
                <span className="text-[10px] text-[#908fa0]">Confidence</span>
              </div>
            </div>
            
            <p className="text-xs text-[#908fa0] leading-relaxed mb-4 line-clamp-2">
              {tech.summary}
            </p>
            
            <div className="h-1 w-full bg-[#262626] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#6366f1] to-[#4cd7f6] transition-all duration-1000" 
                style={{ width: `${tech.confidence}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
