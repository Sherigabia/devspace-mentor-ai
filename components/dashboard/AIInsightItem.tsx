import { LucideIcon } from "lucide-react";

interface AIInsightItemProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  badge?: {
    text: string;
    variant: "default" | "warning" | "error";
  };
  filePath?: string;
}

const badgeVariants = {
  default: "bg-[#464554]/20 text-gray-300 border-[#464554]/30",
  warning: "bg-[#ffb783]/20 text-[#ffb783] border-[#ffb783]/30",
  error: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function AIInsightItem({
  icon: Icon,
  iconColor,
  title,
  description,
  badge,
  filePath,
}: AIInsightItemProps) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-[#131314] hover:bg-[#1c1b1c] transition-colors border border-[#262626]/50">
      <div className="mt-1 flex-shrink-0">
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="font-semibold text-gray-100 mb-1">{title}</h5>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {filePath && (
            <span className="px-2 py-0.5 rounded bg-[#464554]/20 text-xs font-mono border border-[#464554]/30 text-gray-300">
              {filePath}
            </span>
          )}
          {badge && (
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium border ${badgeVariants[badge.variant]}`}
            >
              {badge.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Made with Bob
