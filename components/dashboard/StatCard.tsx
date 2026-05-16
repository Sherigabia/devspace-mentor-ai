import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: "primary" | "secondary" | "tertiary";
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const colorClasses = {
  primary: {
    text: "text-[#c0c1ff]",
    bg: "bg-[#c0c1ff]/10",
    border: "border-[#c0c1ff]/50",
  },
  secondary: {
    text: "text-[#4cd7f6]",
    bg: "bg-[#4cd7f6]/10",
    border: "border-[#4cd7f6]/50",
  },
  tertiary: {
    text: "text-[#ffb783]",
    bg: "bg-[#ffb783]/10",
    border: "border-[#ffb783]/50",
  },
};

export function StatCard({ label, value, icon: Icon, color, trend }: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <div
      className={cn(
        "bg-[#131314] border border-[#262626] rounded-xl p-6 transition-all hover:border-opacity-100",
        `hover:${colors.border}`
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-[#908fa0]">{label}</p>
          <h3 className={cn("text-3xl font-bold", colors.text)}>{value}</h3>
          {trend && (
            <p
              className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-400" : "text-red-400"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", colors.bg)}>
          <Icon className={cn("w-6 h-6", colors.text)} />
        </div>
      </div>
    </div>
  );
}

// Made with Bob
