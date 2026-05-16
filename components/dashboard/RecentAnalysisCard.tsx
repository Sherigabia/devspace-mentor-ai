import { Badge } from "lucide-react";
import Link from "next/link";

interface RecentAnalysisCardProps {
  title: string;
  language: string;
  health: number;
  issues: string;
  languageColor: "primary" | "secondary" | "tertiary";
}

const languageColors = {
  primary: "bg-[#c0c1ff]/20 border-[#c0c1ff]/30 text-[#c0c1ff]",
  secondary: "bg-[#4cd7f6]/20 border-[#4cd7f6]/30 text-[#4cd7f6]",
  tertiary: "bg-[#ffb783]/20 border-[#ffb783]/30 text-[#ffb783]",
};

export function RecentAnalysisCard({
  title,
  language,
  health,
  issues,
  languageColor,
}: RecentAnalysisCardProps) {
  return (
    <div className="min-w-[300px] md:min-w-[340px] bg-[#201f20] border border-[#262626] rounded-xl overflow-hidden group hover:border-[#c0c1ff]/50 transition-all">
      <div className="h-32 relative bg-gradient-to-br from-[#131314] to-[#201f20] flex items-center justify-center">
        <div className="text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
          📦
        </div>
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md ${languageColors[languageColor]}`}
          >
            {language}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h4 className="text-lg font-semibold text-gray-100 mb-3">{title}</h4>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-[#4cd7f6]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs text-gray-400">{health}% Health</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-[#ffb783]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-xs text-gray-400">{issues}</span>
          </div>
        </div>
        <Link
          href="/repository"
          className="block w-full py-2 text-center bg-[#464554]/30 hover:bg-[#c0c1ff] hover:text-[#0a0a0b] rounded-lg text-sm font-medium transition-all"
        >
          Open Analysis
        </Link>
      </div>
    </div>
  );
}

// Made with Bob
