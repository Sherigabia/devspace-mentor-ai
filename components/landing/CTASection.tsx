"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#262626] bg-gradient-to-br from-[#131314] to-[#0a0a0b] p-12 md:p-20 text-center">
          {/* Background glow */}
          <div className="absolute -top-24 -left-24 h-64 w-64 bg-[#6366f1]/10 blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 bg-[#4cd7f6]/10 blur-[100px]" />

          <h2 className="relative z-10 text-4xl font-bold tracking-tight text-[#e5e2e3] sm:text-5xl">
            Stop guessing. Start <span className="text-[#c0c1ff]">building</span>.
          </h2>
          <p className="relative z-10 mx-auto mt-6 max-w-2xl text-lg text-[#908fa0]">
            Join thousands of developers who are mastering complex repositories with AI precision. Your next contribution starts here.
          </p>

          <div className="relative z-10 mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl bg-[#6366f1] px-10 py-5 text-sm font-bold text-white transition-all hover:bg-[#4f46e5] active:scale-95"
            >
              Analyze My First Repo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="rounded-xl border border-[#262626] bg-[#131314] px-10 py-5 text-sm font-bold text-[#e5e2e3] transition-all hover:bg-[#201f20] active:scale-95">
              Talk to Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
