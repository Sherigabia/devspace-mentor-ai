import { Repository } from "@/types/repository";
import { GitFork, Rocket } from "lucide-react";

interface RepositoryHeaderProps {
  repository: Repository;
}

export function RepositoryHeader({ repository }: RepositoryHeaderProps) {
  return (
    <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-[#c0c1ff]/10 text-[#c0c1ff] border border-[#c0c1ff]/20 px-3 py-1 rounded-full text-sm font-medium">
            Active Repository
          </span>
          <span className="text-[#908fa0] text-sm">{repository.version}</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-[#e5e2e3] tracking-tight mb-2">
          {repository.name}
        </h1>
        <p className="text-[#908fa0] text-lg max-w-2xl">
          {repository.description}
        </p>
      </div>
      <div className="flex gap-3">
        <button className="bg-[#201f20] border border-[#464554] text-[#e5e2e3] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2a2a2b] transition-colors active:scale-95">
          <GitFork className="w-5 h-5" />
          <span className="font-medium">Fork</span>
        </button>
        <button className="bg-[#c0c1ff] text-[#0a0a0b] px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#a5a6ff] transition-colors active:scale-95 shadow-[0_0_15px_rgba(192,193,255,0.3)]">
          <Rocket className="w-5 h-5" />
          Deploy Now
        </button>
      </div>
    </div>
  );
}

// Made with Bob