"use client";

import { FileCode, ShieldCheck, Zap } from "lucide-react";

interface FileItem {
  name: string;
  role: string;
  explanation: string;
}

interface ImportantFilesProps {
  files: FileItem[];
}

export function ImportantFiles({ files }: ImportantFilesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#ffb783]/10 border border-[#ffb783]/20">
          <ShieldCheck className="h-5 w-5 text-[#ffb783]" />
        </div>
        <h2 className="text-xl font-bold text-[#e5e2e3]">Critical Architecture Files</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {files.map((file) => (
          <div key={file.name} className="p-5 rounded-xl border border-[#262626] bg-[#0a0a0b] hover:border-[#464554] transition-all group">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-[#262626] text-[#908fa0] group-hover:text-[#e5e2e3] transition-colors">
                <FileCode className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <div>
                  <h3 className="text-sm font-bold text-[#e5e2e3] font-mono">{file.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Zap className="h-3 w-3 text-[#ffb783]" />
                    <span className="text-[10px] text-[#908fa0] uppercase font-bold tracking-tight">{file.role}</span>
                  </div>
                </div>
                <p className="text-xs text-[#908fa0] leading-relaxed">
                  {file.explanation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
