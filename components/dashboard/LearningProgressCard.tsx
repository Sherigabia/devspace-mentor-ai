interface LearningProgressItem {
  label: string;
  progress: number;
  color: "primary" | "secondary" | "tertiary";
}

interface LearningProgressCardProps {
  items: LearningProgressItem[];
}

const progressColors = {
  primary: {
    text: "text-[#c0c1ff]",
    bg: "bg-[#c0c1ff]",
  },
  secondary: {
    text: "text-[#4cd7f6]",
    bg: "bg-[#4cd7f6]",
  },
  tertiary: {
    text: "text-[#ffb783]",
    bg: "bg-[#ffb783]",
  },
};

export function LearningProgressCard({ items }: LearningProgressCardProps) {
  return (
    <div className="bg-[#201f20] border border-[#262626] rounded-xl p-6">
      <h4 className="text-lg font-bold text-gray-100 mb-4">Learning Progress</h4>
      <div className="space-y-5">
        {items.map((item, index) => {
          const colors = progressColors[item.color];
          return (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="text-xs text-gray-400">{item.label}</span>
                <span className={`text-xs font-medium ${colors.text}`}>
                  {item.progress}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#464554]/30 rounded-full overflow-hidden">
                <div
                  className={`h-full ${colors.bg} rounded-full transition-all duration-500`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Made with Bob
