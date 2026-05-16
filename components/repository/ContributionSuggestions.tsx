import { ContributionSuggestion } from "@/types/repository";
import { Target, Clock, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContributionSuggestionsProps {
  contributions: ContributionSuggestion[];
}

const difficultyColors = {
  beginner: {
    bg: "bg-[#4cd7f6]/10",
    border: "border-[#4cd7f6]/20",
    text: "text-[#4cd7f6]",
  },
  intermediate: {
    bg: "bg-[#ffb783]/10",
    border: "border-[#ffb783]/20",
    text: "text-[#ffb783]",
  },
  advanced: {
    bg: "bg-[#ffb4ab]/10",
    border: "border-[#ffb4ab]/20",
    text: "text-[#ffb4ab]",
  },
};

export function ContributionSuggestions({
  contributions,
}: ContributionSuggestionsProps) {
  return (
    <div className="bg-[#161618]/70 backdrop-blur-xl border border-[#262626] rounded-xl p-6">
      <h3 className="text-2xl font-semibold text-[#e5e2e3] mb-6 flex items-center gap-2">
        <Target className="w-6 h-6" />
        Beginner Contribution Opportunities
      </h3>
      <div className="space-y-4">
        {contributions.map((contribution) => {
          const colors = difficultyColors[contribution.difficulty];

          return (
            <div
              key={contribution.id}
              className="p-4 rounded-lg border border-[#464554]/20 bg-[#201f20] hover:border-[#464554]/40 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-semibold text-[#e5e2e3]">
                  {contribution.title}
                </h4>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium border capitalize",
                    colors.bg,
                    colors.border,
                    colors.text
                  )}
                >
                  {contribution.difficulty}
                </span>
              </div>
              <p className="text-[#908fa0] text-sm mb-3">
                {contribution.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-[#908fa0]">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{contribution.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileCode className="w-4 h-4" />
                  <span>{contribution.files.length} files</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Made with Bob