import { TechStackItem } from "@/types/repository";
import { Layers, CheckCircle2 } from "lucide-react";

interface TechStackListProps {
  techStack: TechStackItem[];
}

export function TechStackList({ techStack }: TechStackListProps) {
  return (
    <div className="bg-[#161618]/70 backdrop-blur-xl border border-[#262626] rounded-xl p-6">
      <h3 className="text-2xl font-semibold text-[#e5e2e3] mb-6 flex items-center gap-2">
        <Layers className="w-6 h-6" />
        Tech Stack
      </h3>
      <div className="space-y-4">
        {techStack.map((tech) => (
          <div
            key={tech.id}
            className="flex items-center justify-between p-3 bg-[#201f20] rounded-lg border border-[#464554]/20 hover:border-[#464554]/40 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: tech.color }}
              >
                {tech.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-[#e5e2e3]">{tech.name}</div>
                <div className="text-xs text-[#908fa0]">{tech.description}</div>
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#908fa0]" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Made with Bob