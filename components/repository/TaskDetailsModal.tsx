"use client";

import { X, FileText, CheckCircle2, Timer, BookOpen, Layers, Lightbulb, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface DetailedSuggestion {
  id: string;
  title: string;
  type: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  whyItMatters?: string;
  skills?: string[];
  files?: string[];
  aiNotes?: string;
  checklist?: string[];
  learningTopics?: string[];
  initialCode?: string;
}

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: DetailedSuggestion | null;
  onClaim?: (taskId: string) => void;
}

export function TaskDetailsModal({ isOpen, onClose, task, onClaim }: TaskDetailsModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={cn(
          "relative w-full max-w-3xl max-h-[90vh] bg-[#0a0a0b] border border-[#262626] rounded-2xl shadow-2xl transition-all duration-300 transform flex flex-col overflow-hidden",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#262626] bg-[#131314]/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#4cd7f6]/10 border border-[#4cd7f6]/20">
              <FileText className="h-5 w-5 text-[#4cd7f6]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-[#4cd7f6] uppercase tracking-wider bg-[#4cd7f6]/10 px-2 py-0.5 rounded border border-[#4cd7f6]/20">
                  {task?.type}
                </span>
                <span className="text-[10px] font-bold text-[#908fa0] uppercase tracking-widest">Task Requirements</span>
              </div>
              <h2 className="text-xl font-bold text-[#e5e2e3]">{task?.title}</h2>
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
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          
          {/* Top Metadata */}
          <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl bg-[#131314]/30 border border-[#262626]">
             <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-[#908fa0]" />
                <span className="text-sm text-[#e5e2e3]"><span className="text-[#908fa0]">Est. Time:</span> {task?.estimatedTime}</span>
             </div>
             <div className="flex items-center gap-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase border",
                  task?.difficulty === "beginner" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                  task?.difficulty === "intermediate" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                  "bg-red-500/10 text-red-400 border-red-500/20"
                )}>
                  {task?.difficulty}
                </span>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <section className="space-y-3">
                <h3 className="text-sm font-bold text-[#e5e2e3] uppercase tracking-wider">Overview</h3>
                <p className="text-sm text-[#908fa0] leading-relaxed">
                  {task?.description}
                </p>
                {task?.whyItMatters && (
                   <p className="text-sm text-[#c0c1ff] leading-relaxed italic border-l-2 border-[#c0c1ff]/30 pl-3">
                     "Why it matters: {task.whyItMatters}"
                   </p>
                )}
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-2 text-[#ffb783]">
                  <PenTool className="h-4 w-4" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Required Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {task?.skills?.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-[#262626] text-[#e5e2e3] text-xs font-medium border border-[#464554]">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-2 text-[#4cd7f6]">
                  <Layers className="h-4 w-4" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Target Files</h3>
                </div>
                <div className="space-y-2">
                  {task?.files?.map((file) => (
                    <div key={file} className="p-3 rounded-lg bg-[#131314] border border-[#262626] font-mono text-xs text-[#e5e2e3]">
                      {file}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-[#c0c1ff]">
                  <Lightbulb className="h-4 w-4" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">AI Mentor Notes</h3>
                </div>
                <div className="p-4 rounded-xl bg-[#c0c1ff]/5 border border-[#c0c1ff]/20">
                  <p className="text-sm text-[#e5e2e3] leading-relaxed">
                    {task?.aiNotes}
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-bold text-[#e5e2e3] uppercase tracking-wider">Contribution Checklist</h3>
                <div className="space-y-2">
                  {task?.checklist?.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-3 rounded-lg border border-[#262626] bg-[#131314]/30">
                      <div className="h-4 w-4 rounded border border-[#464554] mt-0.5 shrink-0" />
                      <span className="text-sm text-[#908fa0]">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {task?.learningTopics && task.learningTopics.length > 0 && (
                <section className="space-y-3 pt-4 border-t border-[#262626]">
                  <div className="flex items-center gap-2 text-[#ffb783]">
                    <BookOpen className="h-4 w-4" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Suggested Learning</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {task.learningTopics.map(topic => (
                      <span key={topic} className="text-xs text-[#908fa0] underline decoration-[#464554] underline-offset-4 cursor-pointer hover:text-[#e5e2e3] transition-colors">
                        {topic}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#262626] bg-[#131314]/50 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-[#262626] text-[#908fa0] font-medium hover:text-[#e5e2e3] transition-all active:scale-95"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              if (task && onClaim) {
                onClaim(task.id);
                onClose();
              }
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#4cd7f6] text-[#0a0a0b] font-bold shadow-[0_0_20px_rgba(76,215,246,0.3)] hover:bg-[#3ac5e4] transition-all active:scale-95"
          >
            <CheckCircle2 className="h-4 w-4" />
            Claim Task
          </button>
        </div>
      </div>
    </div>
  );
}
