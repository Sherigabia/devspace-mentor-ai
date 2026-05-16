import { Check, Play, Lock, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningPathStepProps {
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
  progress?: number;
  aiSuggestion?: string;
  onResume?: () => void;
}

export function LearningPathStep({
  title,
  description,
  status,
  progress,
  aiSuggestion,
  onResume,
}: LearningPathStepProps) {
  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isLocked = status === "locked";

  return (
    <div
      className={cn(
        "flex gap-8 relative z-10",
        isCurrent && "items-center bg-[#c0c1ff]/5 p-6 rounded-xl -ml-6 border border-[#c0c1ff]/20",
        isLocked && "opacity-40"
      )}
    >
      {/* Step Icon */}
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative",
          isCompleted &&
            "bg-[#c0c1ff] text-[#0a0a0b] shadow-[0_0_15px_rgba(192,193,255,0.4)]",
          isCurrent && "bg-[#201f20] border-2 border-[#c0c1ff] text-[#c0c1ff]",
          isLocked && "bg-[#201f20] border border-[#464554]/50 text-gray-500"
        )}
      >
        {isCurrent && (
          <div className="absolute inset-0 rounded-full border-2 border-[#c0c1ff] animate-ping opacity-20" />
        )}
        {isCompleted && <Check className="w-6 h-6" strokeWidth={3} />}
        {isCurrent && <Play className="w-5 h-5" fill="currentColor" />}
        {isLocked && <Lock className="w-5 h-5" />}
      </div>

      {/* Step Content */}
      <div className="flex flex-col gap-3 max-w-2xl flex-1">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className={cn("text-lg font-semibold", isCurrent && "text-gray-100")}>
            {title}
          </h3>
          <span
            className={cn(
              "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
              isCompleted && "bg-[#c0c1ff]/15 border-[#c0c1ff]/30 text-[#c0c1ff]",
              isCurrent && "bg-[#4cd7f6]/15 border-[#4cd7f6]/30 text-[#4cd7f6]",
              isLocked && "bg-gray-800 border-gray-700 text-gray-500"
            )}
          >
            {isCompleted && "Completed"}
            {isCurrent && "In Progress"}
            {isLocked && "Locked"}
          </span>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>

        {/* Progress Bar for Current Step */}
        {isCurrent && progress !== undefined && (
          <>
            <div className="w-full bg-[#2a2a2b] h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-[#c0c1ff] h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {progress}% Complete • {Math.ceil((100 - progress) / 20)} Modules remaining
              </span>
              {onResume && (
                <button
                  onClick={onResume}
                  className="bg-[#c0c1ff] text-[#0a0a0b] px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
                >
                  Resume Learning
                </button>
              )}
            </div>
          </>
        )}

        {/* Action Buttons for Completed */}
        {isCompleted && (
          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#c0c1ff] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Review Material
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#c0c1ff] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Resources
            </button>
          </div>
        )}

        {/* Lock Info */}
        {isLocked && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Requires completion of previous module
          </div>
        )}
      </div>

      {/* AI Suggestion Badge */}
      {isCurrent && aiSuggestion && (
        <div className="ml-auto glass-surface p-4 rounded-lg border border-[#c0c1ff]/20 flex flex-col items-center gap-2 max-w-[120px]">
          <div className="text-[10px] text-[#4cd7f6] font-bold uppercase">AI Suggestion</div>
          <Lightbulb className="w-8 h-8 text-[#4cd7f6]" />
          <div className="text-xs text-center text-gray-400">{aiSuggestion}</div>
        </div>
      )}
    </div>
  );
}

// Made with Bob
