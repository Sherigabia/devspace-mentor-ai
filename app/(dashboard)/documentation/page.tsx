'use client';

import { useState } from 'react';
import { 
  FileText, 
  Eye, 
  Edit3, 
  Download, 
  Upload, 
  Copy, 
  Sparkles,
  Plus,
  GripVertical,
  ChevronRight
} from 'lucide-react';

export default function DocumentationPage() {
  const [viewMode, setViewMode] = useState<'preview' | 'edit'>('preview');
  const [activeSection, setActiveSection] = useState('setup');

  const sections = [
    { id: 'setup', label: '1. Setup', icon: '🚀' },
    { id: 'usage', label: '2. Usage', icon: '🛠' },
    { id: 'architecture', label: '3. Architecture', icon: '🏗' },
    { id: 'contributing', label: '4. Contributing', icon: '🤝' },
  ];

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#4cd7f6] text-sm font-medium uppercase tracking-widest">
              Documentation Tool
            </span>
            <div className="w-2 h-2 rounded-full bg-[#4cd7f6] shadow-[0_0_8px_rgba(76,215,246,0.6)]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
            README Generator
          </h1>
          <p className="text-gray-400 max-w-xl">
            AI-optimized documentation for your repository. Technical, precise, and standardized.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-[#1c1b1c] border border-[#464554] p-1 rounded-xl">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${
              viewMode === 'preview'
                ? 'bg-[#c0c1ff] text-[#07006c]'
                : 'text-gray-400 hover:bg-[#353436]'
            }`}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={() => setViewMode('edit')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${
              viewMode === 'edit'
                ? 'bg-[#c0c1ff] text-[#07006c]'
                : 'text-gray-400 hover:bg-[#353436]'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar - Sections Navigation */}
        <aside className="md:col-span-3 space-y-4">
          {/* Document Sections */}
          <div className="bg-[#1c1b1c] p-6 rounded-xl border border-[#464554]">
            <h3 className="text-[#c0c1ff] text-sm font-medium mb-4 uppercase tracking-tight">
              Document Sections
            </h3>
            <nav className="flex flex-col gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(section.id);
                  }}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all group ${
                    activeSection === section.id
                      ? 'bg-[#c0c1ff]/10 border-[#c0c1ff]/20 text-[#c0c1ff]'
                      : 'border-transparent text-gray-400 hover:bg-[#353436]'
                  }`}
                >
                  <span className="text-sm font-medium">{section.label}</span>
                  <GripVertical className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </nav>
            <button className="w-full mt-6 py-3 rounded-lg border-2 border-dashed border-[#464554] text-gray-400 text-sm font-medium hover:border-[#c0c1ff]/50 hover:text-[#c0c1ff] transition-all flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add Custom Section
            </button>
          </div>

          {/* AI Insights Card */}
          <div className="bg-[#1c1b1c] p-6 rounded-xl border border-[#464554] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-16 h-16 text-[#4cd7f6]" />
            </div>
            <h3 className="text-[#4cd7f6] text-sm font-medium mb-2 flex items-center gap-2 relative z-10">
              <Sparkles className="w-4 h-4" />
              Mentor Suggestion
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed relative z-10">
              "Your architecture section lacks a flow diagram. I can generate a Mermaid.js diagram based on your source code analysis."
            </p>
            <button className="mt-4 text-[#4cd7f6] text-sm font-medium flex items-center gap-1 hover:underline relative z-10">
              Apply Suggestion
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Main Preview Area */}
        <section className="md:col-span-9">
          <div className="bg-[#0e0e0f] rounded-xl border border-[#464554] overflow-hidden shadow-2xl">
            {/* Window Header */}
            <div className="bg-[#2a2a2b] px-6 py-3 flex justify-between items-center border-b border-[#464554]/30">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
                </div>
                <span className="ml-4 text-gray-400 text-sm font-mono">README.md</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm font-mono">Markdown • 2.4kb</span>
                <button className="text-gray-400 hover:text-[#c0c1ff] transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Markdown Content */}
            <div className="p-8 md:p-12 text-gray-300 space-y-8 overflow-y-auto max-h-[700px] custom-scrollbar">
              {/* Header Section */}
              <div className="border-b border-[#464554]/20 pb-8">
                <h1 className="text-4xl font-semibold text-white mb-2">
                  Devspace Documentation Generator
                </h1>
                <p className="text-gray-400 italic">
                  Automated, AI-driven technical documentation for modern developers.
                </p>
                <div className="flex gap-2 mt-4">
                  <span className="px-3 py-1 rounded bg-[#c0c1ff]/10 border border-[#c0c1ff]/30 text-[#c0c1ff] text-sm font-mono">
                    license: MIT
                  </span>
                  <span className="px-3 py-1 rounded bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 text-[#4cd7f6] text-sm font-mono">
                    version: 1.0.4
                  </span>
                </div>
              </div>

              {/* Setup Section */}
              <section id="setup">
                <h2 className="text-2xl font-semibold text-white border-b border-[#464554]/10 pb-2 mb-4">
                  🚀 Setup
                </h2>
                <p className="mb-4 text-gray-400">
                  Initialize the mentor environment by running the following command in your root directory:
                </p>
                <div className="bg-[#131314] p-6 rounded-lg border border-[#464554] relative group">
                  <pre className="text-sm font-mono text-[#4cd7f6]">
                    <code>npx @devspace/mentor-ai init --template-pro</code>
                  </pre>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-gray-400 hover:text-[#c0c1ff]">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Usage Section */}
              <section id="usage">
                <h2 className="text-2xl font-semibold text-white border-b border-[#464554]/10 pb-2 mb-4">
                  🛠 Usage
                </h2>
                <p className="mb-4 text-gray-400">
                  The documentation generator reads your source code comments and exports structured markdown files.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400">
                  <li>
                    <strong className="text-white">Auto-Scan:</strong> Scans <code className="text-[#4cd7f6] text-sm">/src</code> for technical debt and documentation gaps.
                  </li>
                  <li>
                    <strong className="text-white">GPT-4 Integration:</strong> Context-aware descriptions of complex logic.
                  </li>
                  <li>
                    <strong className="text-white">Multi-Format:</strong> Export to MD, HTML, or directly to Wiki.
                  </li>
                </ul>
              </section>

              {/* Architecture Section */}
              <section id="architecture">
                <h2 className="text-2xl font-semibold text-white border-b border-[#464554]/10 pb-2 mb-4">
                  🏗 Architecture
                </h2>
                <div className="w-full h-64 rounded-xl border border-[#464554]/30 overflow-hidden mb-4 bg-[#1c1b1c] flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p className="text-sm">Architecture diagram placeholder</p>
                  </div>
                </div>
                <p className="text-gray-400">
                  The system follows a modular micro-plugin architecture ensuring high extensibility for custom languages.
                </p>
              </section>
            </div>

            {/* Bottom Action Bar */}
            <div className="bg-[#2a2a2b] px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#464554]/30">
              <p className="text-sm font-mono text-gray-500">
                Last generated: 2 mins ago
              </p>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-6 py-3 rounded-lg border border-[#464554] text-white text-sm font-medium hover:bg-[#353436] transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download .md
                </button>
                <button className="flex-1 md:flex-none px-6 py-3 rounded-lg bg-[#c0c1ff] text-[#07006c] text-sm font-medium hover:shadow-[0_0_20px_rgba(192,193,255,0.3)] transition-all flex items-center justify-center gap-2 group">
                  <Upload className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Push to GitHub
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Made with Bob
