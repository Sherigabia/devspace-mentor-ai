"use client";

import { useState } from "react";
import { Lightbulb, CheckCircle2, Timer, FileText, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskDetailsModal, DetailedSuggestion } from "./TaskDetailsModal";
import { ActiveTasksPanel } from "./ActiveTasksPanel";
import { ContributionWorkflowModal } from "./ContributionWorkflowModal";

interface ContributionGuideProps {
  suggestions: DetailedSuggestion[];
}

export function ContributionGuide({ suggestions }: ContributionGuideProps) {
  const [activeTasks, setActiveTasks] = useState<DetailedSuggestion[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  // Modal States
  const [selectedTaskDetails, setSelectedTaskDetails] = useState<DetailedSuggestion | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [selectedWorkflowTask, setSelectedWorkflowTask] = useState<DetailedSuggestion | null>(null);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);

  // Toast State (Simple Local Implementation)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleViewRequirements = (task: DetailedSuggestion) => {
    setSelectedTaskDetails(task);
    setIsDetailsOpen(true);
  };

  const handleClaimTask = (taskId: string) => {
    const task = suggestions.find(s => s.id === taskId);
    if (task && !activeTasks.find(t => t.id === taskId)) {
      setActiveTasks(prev => [task, ...prev]);
      showToast(`Successfully claimed: ${task.title}`);
    }
  };

  const handleCompleteTask = (taskId: string) => {
    setActiveTasks(prev => prev.filter(t => t.id !== taskId));
    setCompletedTasks(prev => [...prev, taskId]);
    showToast(`Complete! PR Submitted for ${suggestions.find(s => s.id === taskId)?.title}`);
  };

  return (
    <div className="space-y-12 relative">
      {/* Toast Notification */}
      <div className={cn(
        "fixed bottom-8 right-8 z-[100] px-6 py-3 rounded-xl bg-[#4cd7f6] text-[#0a0a0b] font-bold shadow-2xl flex items-center gap-2 transition-all duration-300 transform",
        toastMessage ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
      )}>
        <CheckCircle2 className="w-5 h-5" />
        {toastMessage}
      </div>

      {/* Active Tasks Section */}
      {activeTasks.length > 0 && (
        <ActiveTasksPanel
          tasks={activeTasks}
          onContinueContribution={(task) => {
            setSelectedWorkflowTask(task);
            setIsWorkflowOpen(true);
          }}
        />
      )}

      {/* Roadmap Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#4cd7f6]/10 border border-[#4cd7f6]/20">
            <Lightbulb className="h-5 w-5 text-[#4cd7f6]" />
          </div>
          <h2 className="text-xl font-bold text-[#e5e2e3]">Contribution Roadmap</h2>
        </div>

        <div className="grid gap-4">
          {suggestions.map((suggestion) => {
            const isActive = activeTasks.some(t => t.id === suggestion.id);
            const isCompleted = completedTasks.includes(suggestion.id);

            return (
              <div key={suggestion.id} className={cn(
                "p-6 rounded-2xl border transition-all group",
                isActive ? "border-[#4cd7f6]/50 bg-[#131314]/50" :
                  isCompleted ? "border-green-500/20 bg-green-500/5" :
                    "border-[#262626] bg-[#131314]/30 hover:border-[#464554]"
              )}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#4cd7f6] uppercase tracking-wider bg-[#4cd7f6]/10 px-2 py-0.5 rounded border border-[#4cd7f6]/20">
                        {suggestion.type}
                      </span>
                      <h3 className={cn(
                        "text-lg font-bold group-hover:text-[#4cd7f6] transition-colors",
                        isCompleted ? "text-[#908fa0] line-through" : "text-[#e5e2e3]"
                      )}>
                        {suggestion.title}
                      </h3>
                      {isActive && (
                        <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#6366f1]/20 text-[#6366f1] border border-[#6366f1]/30">
                          IN PROGRESS
                        </span>
                      )}
                      {isCompleted && (
                        <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1">
                          <Check className="w-3 h-3" /> DONE
                        </span>
                      )}
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
                  <button
                    onClick={() => handleViewRequirements(suggestion)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#262626] text-[#e5e2e3] text-xs font-bold hover:bg-[#323232] transition-all active:scale-95"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    View Requirements
                  </button>

                  {!isActive && !isCompleted && (
                    <button
                      onClick={() => handleClaimTask(suggestion.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4cd7f6] text-[#0a0a0b] text-xs font-bold hover:bg-[#3ac5e4] transition-all active:scale-95"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Claim Task
                    </button>
                  )}
                  {isActive && (
                    <button
                      onClick={() => {
                        setSelectedWorkflowTask(suggestion);
                        setIsWorkflowOpen(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6366f1] text-white text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:bg-[#4f46e5] transition-all active:scale-95"
                    >
                      Continue Working
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <TaskDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        task={selectedTaskDetails}
        onClaim={handleClaimTask}
      />

      <ContributionWorkflowModal
        isOpen={isWorkflowOpen}
        onClose={() => setIsWorkflowOpen(false)}
        task={selectedWorkflowTask}
        onComplete={handleCompleteTask}
      />
    </div>
  );
}
