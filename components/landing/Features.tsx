"use client";

import { 
  BarChart3, 
  MessageSquare, 
  Map, 
  FileCode2, 
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Repository Analysis",
    description: "Deep semantic analysis of your codebase to understand architecture, patterns, and dependencies.",
    icon: BarChart3,
    color: "text-[#c0c1ff]",
    bg: "bg-[#c0c1ff]/10",
    border: "border-[#c0c1ff]/20",
  },
  {
    title: "AI Code Explanations",
    description: "Ask questions about any part of the code and get natural language explanations with context.",
    icon: MessageSquare,
    color: "text-[#4cd7f6]",
    bg: "bg-[#4cd7f6]/10",
    border: "border-[#4cd7f6]/20",
  },
  {
    title: "Guided Learning Paths",
    description: "Personalized roadmaps to master specific features or areas of the codebase step-by-step.",
    icon: Map,
    color: "text-[#ffb783]",
    bg: "bg-[#ffb783]/10",
    border: "border-[#ffb783]/20",
  },
  {
    title: "Auto-Docs Generation",
    description: "Generate comprehensive onboarding documentation and architectural summaries automatically.",
    icon: FileCode2,
    color: "text-[#6366f1]",
    bg: "bg-[#6366f1]/10",
    border: "border-[#6366f1]/20",
  },
  {
    title: "Contribution Guide",
    description: "Identify beginner-friendly areas and get specific suggestions on where to start contributing.",
    icon: Lightbulb,
    color: "text-[#4cd7f6]",
    bg: "bg-[#4cd7f6]/10",
    border: "border-[#4cd7f6]/20",
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-[#0a0a0b]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#e5e2e3] sm:text-4xl">
            Everything you need to <span className="text-[#c0c1ff]">master</span> codebases
          </h2>
          <p className="mt-4 text-[#908fa0] max-w-2xl mx-auto">
            Powerful AI tools designed to help junior developers navigate complex projects with the confidence of a senior.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "group relative p-8 rounded-2xl border border-[#262626] bg-[#131314]/50 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-[#131314] hover:shadow-2xl",
                index === 3 || index === 4 ? "md:col-span-1" : ""
              )}
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", feature.bg, feature.border, "border")}>
                <feature.icon className={cn("h-6 w-6", feature.color)} />
              </div>
              <h3 className="text-xl font-semibold text-[#e5e2e3] mb-3">{feature.title}</h3>
              <p className="text-[#908fa0] leading-relaxed mb-6">{feature.description}</p>
              
              <div className="mt-auto flex items-center text-sm font-medium text-[#c0c1ff] opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            </div>
          ))}
          
          {/* A large "Bento" style card could go here if we wanted to match the reference even more closely, but this grid is clean and premium too */}
        </div>
      </div>
    </section>
  );
}
