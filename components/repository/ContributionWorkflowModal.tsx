"use client";

import { X, Layout, FileCode, Bot, GitPullRequest, CheckCircle2, ChevronRight, TerminalSquare, AlertTriangle, Sparkles, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { DetailedSuggestion } from "./TaskDetailsModal";

interface ContributionWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: DetailedSuggestion | null;
  onComplete?: (taskId: string) => void;
}

type Step = "understand" | "review" | "edit" | "analyze" | "submit";

export function ContributionWorkflowModal({ isOpen, onClose, task, onComplete }: ContributionWorkflowModalProps) {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>("understand");

  // Editor State
  const [code, setCode] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ score: number, strengths: string[], improvements: string[] } | null>(null);

  // Submit State
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && task) {
      setMounted(true);
      document.body.style.overflow = "hidden";
      setCurrentStep("understand");
      setCode(task.initialCode || `import { useEffect, useState } from 'react';

export function InteractiveEditor() {
  const [isEditing, setIsEditing] = useState(false);

  // TODO: Add your implementation here
  // You can freely edit this code!

  return (
    <div className="p-4">
      <h1>Ready for changes</h1>
    </div>
  );
}`);

      setAnalysisResult(null);
      setIsSubmitting(false);
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen, task]);

  if (!mounted && !isOpen) return null;

  const steps: { id: Step; label: string; icon: any }[] = [
    { id: "understand", label: "Understand Task", icon: Layout },
    { id: "review", label: "Review Architecture", icon: Layout },
    { id: "edit", label: "Edit File", icon: FileCode },
    { id: "analyze", label: "Analyze Contribution", icon: Sparkles },
    { id: "submit", label: "Submit Pull Request", icon: GitPullRequest },
  ];

  const handleSimulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        score: 92,
        strengths: ["Clean syntax", "Follows existing patterns", "Good variable naming"],
        improvements: ["Consider adding a fallback for edge cases", "Add a JSDoc comment for the function"]
      });
    }, 2000);
  };

  const handleSimulateCompletion = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (task && onComplete) onComplete(task.id);
      onClose();
    }, 2000);
  };

  // Generate line numbers array based on code lines
  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(15, lineCount) }, (_, i) => i + 1);

  // Sync scroll between textarea and line numbers
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const lineNumbersEle = target.previousElementSibling as HTMLDivElement;
    if (lineNumbersEle) {
      lineNumbersEle.scrollTop = target.scrollTop;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Modal Content - Full Screen Workspace */}
      <div
        className={cn(
          "relative w-[98vw] h-[96vh] max-w-[1600px] bg-[#0a0a0b] border border-[#262626] rounded-2xl shadow-2xl transition-all duration-300 transform flex flex-col overflow-hidden",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
        )}
      >
        {/* Workspace Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#262626] bg-[#131314]">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-[#4cd7f6]/20 text-[#4cd7f6]">
              <TerminalSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#e5e2e3]">Mentor Workspace</h2>
              <div className="flex items-center gap-2 text-xs text-[#908fa0]">
                <span>{task?.title}</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#4cd7f6] font-medium capitalize">{steps.find(s => s.id === currentStep)?.label}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#262626] text-[#908fa0] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Workspace Body - 3 Panels */}
        <div className="flex flex-1 overflow-hidden">

          {/* PANEL 1: Left Sidebar (Navigation & Progress) */}
          <div className="w-64 border-r border-[#262626] bg-[#0a0a0b] flex flex-col shrink-0">
            <div className="p-4 border-b border-[#262626]">
              <h3 className="text-xs font-bold text-[#908fa0] uppercase tracking-wider mb-4">Workflow Steps</h3>
              <div className="space-y-1 relative">
                {/* Progress Line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-[#262626]" />

                {steps.map((step, index) => {
                  const stepIndex = steps.findIndex(s => s.id === step.id);
                  const currentIndex = steps.findIndex(s => s.id === currentStep);
                  const isPast = stepIndex < currentIndex;
                  const isActive = step.id === currentStep;

                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(step.id)}
                      className="relative flex items-center gap-4 w-full text-left py-2 group"
                    >
                      {/* Node */}
                      <div className={cn(
                        "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                        isActive ? "bg-[#0a0a0b] border-[#4cd7f6] text-[#4cd7f6]" :
                          isPast ? "bg-[#4cd7f6] border-[#4cd7f6] text-[#0a0a0b]" :
                            "bg-[#0a0a0b] border-[#262626] text-[#464554] group-hover:border-[#464554]"
                      )}>
                        {isPast ? <CheckCircle2 className="w-4 h-4" /> : <step.icon className="w-3.5 h-3.5" />}
                      </div>

                      {/* Label */}
                      <span className={cn(
                        "text-sm font-medium transition-colors",
                        isActive ? "text-[#e5e2e3]" :
                          isPast ? "text-[#908fa0]" : "text-[#464554] group-hover:text-[#908fa0]"
                      )}>
                        {step.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 mt-auto">
              <div className="p-4 rounded-xl bg-[#131314] border border-[#262626] space-y-2">
                <div className="flex justify-between text-xs text-[#908fa0]">
                  <span>Est. Completion</span>
                  <span>{task?.estimatedTime}</span>
                </div>
                <div className="flex justify-between text-xs text-[#908fa0]">
                  <span>Difficulty</span>
                  <span className="capitalize text-amber-400">{task?.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 2: Center (Code Editor / Content) */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#0d0d0f] relative">

            {/* Fake Tab Bar */}
            <div className="flex bg-[#0a0a0b] border-b border-[#262626] shrink-0 overflow-x-auto custom-scrollbar">
              {(currentStep === "edit" || currentStep === "analyze") ? (
                <div className="flex items-center gap-2 px-4 py-2 border-r border-[#262626] bg-[#131314] text-[#e5e2e3] min-w-max border-t-2 border-t-[#4cd7f6]">
                  <FileCode className="w-4 h-4 text-[#4cd7f6]" />
                  <span className="text-xs font-mono">{task?.files?.[0] || 'repository.ts'}</span>
                  <X className="w-3 h-3 text-[#908fa0] hover:text-[#e5e2e3] cursor-pointer ml-2" />
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 border-r border-[#262626] bg-[#131314] text-[#e5e2e3] min-w-max border-t-2 border-t-[#c0c1ff]">
                  <Layout className="w-4 h-4 text-[#c0c1ff]" />
                  <span className="text-xs font-medium">Workspace Overview</span>
                </div>
              )}
            </div>

            {/* Editor Content Area */}
            <div className="flex-1 relative overflow-hidden flex flex-col">
              {(currentStep === "understand" || currentStep === "review") && (
                <div className="flex-1 overflow-y-auto p-8 max-w-3xl mx-auto space-y-8 animate-fade-in w-full">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-[#e5e2e3]">
                      {currentStep === "understand" ? "Understand the Task" : "Review Architecture"}
                    </h3>
                    <p className="text-[#908fa0] text-lg">
                      {currentStep === "understand"
                        ? "Review the requirements and goals before writing code."
                        : "Understand how your changes fit into the broader system."}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl border border-[#262626] bg-[#131314] space-y-4">
                    <h4 className="text-sm font-bold text-[#e5e2e3] uppercase tracking-wider border-b border-[#262626] pb-2">Description</h4>
                    <p className="text-sm text-[#908fa0] leading-relaxed">
                      {task?.description}
                    </p>
                  </div>

                  {currentStep === "review" && (
                    <div className="p-6 rounded-2xl border border-[#262626] bg-[#131314] space-y-4">
                      <h4 className="text-sm font-bold text-[#e5e2e3] uppercase tracking-wider border-b border-[#262626] pb-2">Why it matters</h4>
                      <p className="text-sm text-[#c0c1ff] leading-relaxed">
                        {task?.whyItMatters}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setCurrentStep(currentStep === "understand" ? "review" : "edit")}
                    className="px-6 py-3 rounded-xl bg-[#4cd7f6] text-[#0a0a0b] font-bold shadow-[0_0_20px_rgba(76,215,246,0.2)] hover:bg-[#3ac5e4] transition-all"
                  >
                    Proceed to {currentStep === "understand" ? "Architecture" : "Editor"}
                  </button>
                </div>
              )}

              {(currentStep === "edit" || currentStep === "analyze") && (
                <div className="flex-1 flex overflow-hidden bg-[#0d0d0f] font-mono text-sm leading-relaxed relative">
                  {/* Line Numbers */}
                  <div className="w-12 shrink-0 border-r border-[#262626] bg-[#0a0a0b] py-4 text-right text-[#464554] select-none overflow-hidden" aria-hidden="true">
                    {lineNumbers.map(n => (
                      <div key={n} className="pr-3 leading-[1.6rem]">{n}</div>
                    ))}
                  </div>
                  {/* Textarea Editor */}
                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onScroll={handleScroll}
                    spellCheck={false}
                    className="flex-1 bg-transparent text-[#e5e2e3] p-4 resize-none outline-none custom-scrollbar leading-[1.6rem] whitespace-pre"
                    disabled={currentStep === "analyze"}
                  />

                  {/* Overlay for Analyze Step */}
                  {currentStep === "analyze" && isAnalyzing && (
                    <div className="absolute inset-0 bg-[#0a0a0b]/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 z-10 animate-fade-in">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-[#262626] border-t-[#4cd7f6] animate-spin" />
                        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-[#4cd7f6]" />
                      </div>
                      <p className="text-[#e5e2e3] font-medium">AI Analyzing Contribution...</p>
                    </div>
                  )}
                </div>
              )}

              {currentStep === "submit" && (
                <div className="flex-1 overflow-y-auto p-8 max-w-3xl mx-auto space-y-8 animate-fade-in w-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#4cd7f6] flex items-center justify-center shadow-[0_0_40px_rgba(76,215,246,0.3)] mb-4">
                    <GitPullRequest className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#e5e2e3]">Ready to Submit</h3>
                  <p className="text-[#908fa0] text-lg max-w-md">
                    Your contribution has been analyzed and is ready to be merged into the repository.
                  </p>

                  <button
                    onClick={handleSimulateCompletion}
                    disabled={isSubmitting}
                    className="flex items-center gap-3 px-8 py-4 mt-8 rounded-xl bg-white text-[#0a0a0b] font-bold text-lg hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>Merging ...</>
                    ) : (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        Submit Pull Request
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* PANEL 3: Right Sidebar (AI Mentor Assistant) */}
          <div className="w-80 border-l border-[#262626] bg-[#0a0a0b] flex flex-col shrink-0 z-20">
            <div className="p-4 border-b border-[#262626] flex items-center gap-2 bg-[#131314]">
              <Bot className="w-5 h-5 text-[#c0c1ff]" />
              <h3 className="text-sm font-bold text-[#e5e2e3]">AI Mentor Assistant</h3>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">

              {/* Greeting */}
              <div className="space-y-2">
                <div className="inline-block px-4 py-2 rounded-2xl rounded-tl-sm bg-[#262626] text-sm text-[#e5e2e3]">
                  Hi! I'm your AI Mentor. I'll guide you through this contribution.
                </div>
              </div>

              {/* Context-Specific Advice */}
              {(currentStep === "understand" || currentStep === "review") && (
                <div className="space-y-2 animate-fade-in">
                  <div className="inline-block px-4 py-3 rounded-2xl rounded-tl-sm bg-[#c0c1ff]/10 border border-[#c0c1ff]/20 text-sm text-[#e5e2e3] leading-relaxed">
                    <p className="font-bold text-[#c0c1ff] mb-1">Mentor Note:</p>
                    {task?.aiNotes}
                  </div>
                </div>
              )}

              {currentStep === "edit" && (
                <div className="space-y-2 animate-fade-in">
                  <div className="inline-block px-4 py-3 rounded-2xl rounded-tl-sm bg-[#c0c1ff]/10 border border-[#c0c1ff]/20 text-sm text-[#e5e2e3] leading-relaxed">
                    <p className="font-bold text-[#c0c1ff] mb-1">Editor Active</p>
                    Make your changes in the editor. Follow the existing code style. Once you're done, click the <b>Analyze</b> button below to have me review your code.
                  </div>
                </div>
              )}

              {/* Analysis Results */}
              {currentStep === "analyze" && analysisResult && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">{analysisResult.score}/100</div>
                    <div className="text-xs text-green-500/70 font-bold uppercase tracking-wider">Contribution Score</div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#e5e2e3] uppercase tracking-wider">Strengths</h4>
                    {analysisResult.strengths.map((str, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-[#908fa0]">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-[#262626]">
                    <h4 className="text-xs font-bold text-[#e5e2e3] uppercase tracking-wider">Suggestions</h4>
                    {analysisResult.improvements.map((imp, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-[#908fa0]">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === "submit" && (
                <div className="space-y-2 animate-fade-in">
                  <div className="inline-block px-4 py-3 rounded-2xl rounded-tl-sm bg-green-500/10 border border-green-500/20 text-sm text-green-400 leading-relaxed">
                    Excellent work! Your code passes all checks. Click Submit to complete this task and improve your onboarding progress!
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Footer Action */}
            <div className="p-4 border-t border-[#262626] bg-[#131314]">
              {currentStep === "edit" && (
                <button
                  onClick={() => {
                    setCurrentStep("analyze");
                    handleSimulateAnalysis();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#4cd7f6] text-[#0a0a0b] font-bold shadow-[0_0_15px_rgba(76,215,246,0.2)] hover:bg-[#3ac5e4] transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Analyze Code
                </button>
              )}
              {currentStep === "analyze" && analysisResult && (
                <button
                  onClick={() => setCurrentStep("submit")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-[#0a0a0b] font-bold hover:bg-gray-200 transition-all"
                >
                  Proceed to Submit
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
