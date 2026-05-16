import { AnalysisStep } from "@/types/repository";
import { CheckCircle2, Loader2, XCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisTimelineProps {
  steps: AnalysisStep[];
}

export function AnalysisTimeline({ steps }: AnalysisTimelineProps) {
  const getStatusIcon = (status: AnalysisStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-[#4cd7f6]" />;
      case "in-progress":
        return <Loader2 className="w-5 h-5 text-[#c0c1ff] animate-spin" />;
      case "error":
        return <XCircle className="w-5 h-5 text-[#ffb4ab]" />;
      default:
        return <Circle className="w-5 h-5 text-[#464554]" />;
    }
  };

  return (
    <div className="bg-[#161618]/70 backdrop-blur-xl border border-[#262626] rounded-xl p-6">
      <h3 className="text-2xl font-semibold text-[#e5e2e3] mb-6">
        Analysis Timeline
      </h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-4">
            <div className="relative">
              {getStatusIcon(step.status)}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute left-1/2 top-6 w-0.5 h-8 -translate-x-1/2",
                    step.status === "completed"
                      ? "bg-[#4cd7f6]/30"
                      : "bg-[#464554]/30"
                  )}
                />
              )}
            </div>
            <div className="flex-grow pt-0.5">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "font-medium",
                    step.status === "completed"
                      ? "text-[#e5e2e3]"
                      : step.status === "in-progress"
                      ? "text-[#c0c1ff]"
                      : "text-[#908fa0]"
                  )}
                >
                  {step.label}
                </span>
                {step.timestamp && (
                  <span className="text-xs text-[#908fa0]">
                    {new Date(step.timestamp).toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Made with Bob