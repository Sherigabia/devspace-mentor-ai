"use client";

import Link from "next/link";
import { Bolt, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 bg-gradient-to-b from-[#6366f1]/20 to-transparent blur-[120px]" />
      
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#131314]/50 px-3 py-1 mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4cd7f6] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4cd7f6]"></span>
          </span>
          <span className="text-xs font-medium text-[#4cd7f6]">AI-Powered Repository Mentorship Live</span>
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-[#e5e2e3] sm:text-6xl md:text-7xl lg:leading-[1.1]">
          Understand any <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c0c1ff] to-[#4cd7f6]">codebase</span> in minutes.
        </h1>
        
        <p className="mx-auto mt-8 max-w-2xl text-lg text-[#908fa0] md:text-xl">
          The AI mentor that turns complex repositories into clear, actionable roadmaps for developers. Onboard faster, contribute better.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 rounded-xl bg-[#6366f1] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#4f46e5] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95"
          >
            Analyze Repository
            <Bolt className="h-4 w-4 transition-transform group-hover:scale-110" />
          </Link>
          <button className="flex items-center gap-2 rounded-xl border border-[#262626] bg-transparent px-8 py-4 text-sm font-bold text-[#e5e2e3] transition-all hover:bg-[#131314] active:scale-95">
            View Demo
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Dashboard Preview Visual */}
        <div className="mt-20 relative mx-auto max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent z-10" />
          <div className="relative rounded-2xl border border-[#262626] bg-[#131314]/80 p-2 shadow-2xl backdrop-blur-sm">
            <div className="overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0b]">
              <div className="flex h-8 items-center gap-2 border-b border-[#262626] bg-[#131314] px-4">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="ml-4 flex h-5 items-center rounded bg-[#0a0a0b] px-3 text-[10px] text-[#908fa0]">
                  devspace-mentor-ai / components / dashboard
                </div>
              </div>
              <div className="grid md:grid-cols-[240px_1fr] h-[400px]">
                <div className="border-r border-[#262626] p-4 hidden md:block">
                  <div className="h-4 w-32 rounded bg-[#131314] mb-4" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded bg-[#262626]" />
                        <div className="h-3 flex-1 rounded bg-[#131314]" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8">
                  <div className="h-8 w-48 rounded bg-[#131314] mb-8" />
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="h-24 rounded-lg bg-[#131314] border border-[#262626]" />
                    <div className="h-24 rounded-lg bg-[#131314] border border-[#262626]" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-[#131314]" />
                    <div className="h-4 w-5/6 rounded bg-[#131314]" />
                    <div className="h-4 w-4/6 rounded bg-[#131314]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 h-32 w-32 bg-[#4cd7f6]/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-[#c0c1ff]/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
