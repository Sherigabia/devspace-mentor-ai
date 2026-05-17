"use client";

import { CheckCircle2, PlayCircle, Lightbulb, Activity, ArrowRight } from "lucide-react";
import { DetailedSuggestion } from "./TaskDetailsModal";

interface ActiveTasksPanelProps {
  tasks: DetailedSuggestion[];
  onContinueContribution: (task: DetailedSuggestion) => void;
}

export function ActiveTasksPanel({ tasks, onContinueContribution }: ActiveTasksPanelProps) {
  if (!tasks || tasks.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#6366f1]/10 border border-[#6366f1]/20">
          <Activity className="h-5 w-5 text-[#6366f1]" />
        </div>
        <h2 className="text-xl font-bold text-[#e5e2e3]">My Active Contributions</h2>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="relative overflow-hidden rounded-2xl border border-[#262626] bg-[#131314] p-6 hover:border-[#464554] transition-all">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 h-48 w-48 bg-[#6366f1]/5 blur-[80px] pointer-events-none" />

            <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#6366f1] uppercase tracking-wider bg-[#6366f1]/10 px-2 py-0.5 rounded border border-[#6366f1]/20">
                      In Progress
                    </span>
                    <h3 className="text-lg font-bold text-[#e5e2e3]">{task.title}</h3>
                  </div>
                  <p className="text-sm text-[#908fa0] leading-relaxed">
                    {task.description}
                  </p>
                </div>

                {/* Progress Bar (Simulated 25%) */}
                <div className="space-y-2">
                   <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#908fa0]">Architecture Review</span>
                      <span className="text-[#c0c1ff]">25%</span>
                   </div>
                   <div className="h-1.5 w-full bg-[#262626] rounded-full overflow-hidden">
                      <div className="h-full w-1/4 bg-gradient-to-r from-[#6366f1] to-[#4cd7f6] rounded-full" />
                   </div>
                </div>

                {/* Inline AI Tip */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#c0c1ff]/5 border border-[#c0c1ff]/10">
                  <Lightbulb className="h-4 w-4 text-[#c0c1ff] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#e5e2e3] leading-relaxed">
                    <span className="font-bold text-[#c0c1ff] mr-1">Mentor Tip:</span>
                    Since you're working on <span className="font-mono text-[#908fa0]">{task.files?.[0]}</span>, check how the existing error handlers are typed before adding your tests.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between shrink-0">
                 <button 
                   onClick={() => onContinueContribution(task)}
                   className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#c0c1ff] text-[#0a0a0b] font-bold shadow-[0_0_20px_rgba(192,193,255,0.2)] hover:bg-[#a5a6ff] hover:shadow-[0_0_25px_rgba(192,193,255,0.4)] transition-all active:scale-95 w-full md:w-auto"
                 >
                   <PlayCircle className="h-5 w-5" />
                   Continue Workspace
                   <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
