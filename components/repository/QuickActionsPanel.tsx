import { Play, FileText, GraduationCap, Download } from "lucide-react";

export function QuickActionsPanel() {
  return (
    <div className="bg-[#161618]/70 backdrop-blur-xl border border-[#262626] rounded-xl p-6">
      <h3 className="text-2xl font-semibold text-[#e5e2e3] mb-6">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button className="flex items-center gap-3 p-4 bg-[#c0c1ff]/10 border border-[#c0c1ff]/20 rounded-lg text-[#c0c1ff] hover:bg-[#c0c1ff]/15 transition-colors active:scale-95">
          <Play className="w-5 h-5" />
          <span className="font-medium">Analyze Repository</span>
        </button>
        <button className="flex items-center gap-3 p-4 bg-[#201f20] border border-[#464554]/30 rounded-lg text-[#e5e2e3] hover:bg-[#2a2a2b] transition-colors active:scale-95">
          <FileText className="w-5 h-5" />
          <span className="font-medium">Generate Docs</span>
        </button>
        <button className="flex items-center gap-3 p-4 bg-[#201f20] border border-[#464554]/30 rounded-lg text-[#e5e2e3] hover:bg-[#2a2a2b] transition-colors active:scale-95">
          <GraduationCap className="w-5 h-5" />
          <span className="font-medium">Create Path</span>
        </button>
        <button className="flex items-center gap-3 p-4 bg-[#201f20] border border-[#464554]/30 rounded-lg text-[#e5e2e3] hover:bg-[#2a2a2b] transition-colors active:scale-95">
          <Download className="w-5 h-5" />
          <span className="font-medium">Export Report</span>
        </button>
      </div>
    </div>
  );
}

// Made with Bob