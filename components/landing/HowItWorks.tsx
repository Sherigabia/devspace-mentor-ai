"use client";

import { Link2, Cpu, GraduationCap } from "lucide-react";

const steps = [
  {
    title: "Connect Repository",
    description: "Link your GitHub or GitLab repository in seconds. Our AI starts mapping the architecture immediately.",
    icon: Link2,
    color: "bg-[#6366f1]",
  },
  {
    title: "Analyze Codebase",
    description: "Get a deep dive into design patterns, logic flows, and key files. No more manual hunting through folders.",
    icon: Cpu,
    color: "bg-[#4cd7f6]",
  },
  {
    title: "Learn and Contribute",
    description: "Follow AI-generated learning paths and start making meaningful contributions faster than ever.",
    icon: GraduationCap,
    color: "bg-[#c0c1ff]",
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 border-y border-[#262626] bg-[#0a0a0b]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-[#e5e2e3] sm:text-4xl">
            From repo URL to <span className="text-[#4cd7f6]">contributing</span> in minutes
          </h2>
          <p className="mt-4 text-[#908fa0] max-w-2xl mx-auto">
            A simple, streamlined process to get you up to speed with any codebase.
          </p>
        </div>

        <div className="relative grid gap-12 md:grid-cols-3">
          {/* Connector line (desktop) */}
          <div className="absolute top-12 left-[20%] right-[20%] hidden h-px bg-gradient-to-r from-transparent via-[#262626] to-transparent md:block" />

          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              <div className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl ${step.color} shadow-2xl shadow-${step.color.split('[')[1].split(']')[0]}/20 mb-8`}>
                <step.icon className="h-10 w-10 text-[#0a0a0b]" />
                <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#262626] bg-[#131314] text-sm font-bold text-[#e5e2e3]">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#e5e2e3] mb-4">{step.title}</h3>
              <p className="text-[#908fa0] leading-relaxed max-w-[280px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
