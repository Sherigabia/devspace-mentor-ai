import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  codeBlock?: {
    language: string;
    code: string;
    filename?: string;
  };
  badges?: Array<{
    text: string;
    variant: "primary" | "secondary" | "tertiary";
  }>;
}

const badgeVariants = {
  primary: "bg-[#c0c1ff]/10 border-[#c0c1ff]/20 text-[#c0c1ff]",
  secondary: "bg-[#4cd7f6]/10 border-[#4cd7f6]/20 text-[#4cd7f6]",
  tertiary: "bg-[#ffb783]/10 border-[#ffb783]/20 text-[#ffb783]",
};

export function ChatMessage({ role, content, codeBlock, badges }: ChatMessageProps) {
  if (role === "user") {
    return (
      <div className="flex justify-end max-w-4xl mx-auto w-full">
        <div className="bg-[#201f20] rounded-2xl p-4 border border-[#262626]/20 max-w-[80%]">
          <p className="text-sm text-gray-200 leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 max-w-4xl mx-auto w-full">
      <div className="w-8 h-8 rounded-lg bg-[#c0c1ff]/10 flex items-center justify-center shrink-0">
        <Sparkles className="w-5 h-5 text-[#c0c1ff]" />
      </div>
      <div className="flex-1 space-y-4">
        <div className="prose prose-invert max-w-none">
          <p className="text-sm text-gray-300 leading-relaxed">{content}</p>
        </div>

        {codeBlock && (
          <div className="rounded-xl overflow-hidden border border-[#262626]/20 bg-[#0e0e0f] font-mono text-sm">
            <div className="bg-[#201f20] px-4 py-2 border-b border-[#262626]/20 flex justify-between items-center">
              <span className="text-gray-400 text-xs">
                {codeBlock.filename || codeBlock.language}
              </span>
              <button className="flex items-center gap-1.5 text-[#c0c1ff] text-xs hover:underline transition-all">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Code
              </button>
            </div>
            <div className="p-4 leading-relaxed overflow-x-auto">
              <pre className="text-gray-200">
                <code>{codeBlock.code}</code>
              </pre>
            </div>
          </div>
        )}

        {badges && badges.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={cn(
                  "px-3 py-1 border rounded-full text-xs flex items-center gap-1.5",
                  badgeVariants[badge.variant]
                )}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Made with Bob
