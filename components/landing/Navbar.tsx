"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, isLoaded } = useUser();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#262626] bg-[#0a0a0b]/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366f1] to-[#c0c1ff]">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#e5e2e3]">
            Devspace Mentor AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-[#908fa0] transition-colors hover:text-[#e5e2e3]">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-[#908fa0] transition-colors hover:text-[#e5e2e3]">
            How It Works
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-[#908fa0] transition-colors hover:text-[#e5e2e3]">
            Testimonials
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoaded && user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-[#c0c1ff] transition-colors hover:text-[#a5a6ff]"
              >
                Dashboard
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-[#908fa0] transition-colors hover:text-[#e5e2e3]">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-lg bg-[#6366f1] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#4f46e5] active:scale-95">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
