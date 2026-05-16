"use client";

import Link from "next/link";
import { Bot, Globe, Code2, Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#262626] bg-[#0a0a0b] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366f1] to-[#c0c1ff]">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[#e5e2e3]">
                Devspace Mentor AI
              </span>
            </Link>
            <p className="text-[#908fa0] text-sm leading-relaxed max-w-xs mb-6">
              Empowering the next generation of developers to understand and contribute to complex codebases with AI.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-[#908fa0] hover:text-[#e5e2e3] transition-colors">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-[#908fa0] hover:text-[#e5e2e3] transition-colors">
                <Code2 className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-[#908fa0] hover:text-[#e5e2e3] transition-colors">
                <Users className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#e5e2e3] mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#features" className="text-sm text-[#908fa0] hover:text-[#e5e2e3] transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="text-sm text-[#908fa0] hover:text-[#e5e2e3] transition-colors">How It Works</Link></li>
              <li><Link href="#" className="text-sm text-[#908fa0] hover:text-[#e5e2e3] transition-colors">Security</Link></li>
              <li><Link href="#" className="text-sm text-[#908fa0] hover:text-[#e5e2e3] transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#e5e2e3] mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-[#908fa0] hover:text-[#e5e2e3] transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm text-[#908fa0] hover:text-[#e5e2e3] transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-[#908fa0] hover:text-[#e5e2e3] transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm text-[#908fa0] hover:text-[#e5e2e3] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#e5e2e3] mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-[#908fa0] hover:text-[#e5e2e3] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-[#908fa0] hover:text-[#e5e2e3] transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-[#908fa0] hover:text-[#e5e2e3] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#262626] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#908fa0]">
            © 2026 Devspace Mentor AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] text-[#262626] font-mono">STABLE v2.4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
