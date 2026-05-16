import { Sparkles } from "lucide-react";
import { AnalysisMetric } from "@/types/repository";

interface AIInsightCardProps {
  summary: string;
  metrics: AnalysisMetric[];
}

export function AIInsightCard({ summary, metrics }: AIInsightCardProps) {
  return (
    <div className="bg-[#161618]/70 backdrop-blur-xl border border-[#262626] rounded-xl p-6 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#c0c1ff]/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4cd7f6]/20 flex items-center justify-center border border-[#4cd7f6]/30">
              <Sparkles className="w-5 h-5 text-[#4cd7f6]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#e5e2e3]">
              AI Architectural Insight
            </h3>
          </div>
          <span className="text-[#4cd7f6] text-sm font-medium uppercase tracking-wider">
            Analysis Complete
          </span>
        </div>

        <div className="bg-[#0e0e0f]/50 rounded-lg p-6 mb-6">
          <p className="text-lg leading-relaxed italic text-[#e5e2e3]">
            "{summary}"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-[#201f20] rounded-lg p-4 border border-[#464554]/30"
            >
              <span className="text-[#908fa0] text-sm block mb-1">
                {metric.label}
              </span>
              <div
                className="text-2xl font-semibold"
                style={{ color: metric.color }}
              >
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Made with Bob