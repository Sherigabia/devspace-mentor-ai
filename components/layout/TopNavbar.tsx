"use client";

import { Search, Bell, Menu } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface TopNavbarProps {
  onMobileMenuToggle: () => void;
}

export function TopNavbar({ onMobileMenuToggle }: TopNavbarProps) {
  const { user, isLoaded } = useUser();

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#131314]/80 backdrop-blur-xl border-b border-[#262626] flex items-center justify-between px-4 lg:px-6">
      {/* Left section - Mobile menu + Search */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu toggle */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#262626] text-[#908fa0] hover:text-[#e5e2e3] transition-colors"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#908fa0] pointer-events-none" />
          <input
            type="search"
            placeholder="Search repositories, docs..."
            className={cn(
              "w-full h-9 pl-10 pr-4 bg-[#0a0a0b] border border-[#262626] rounded-lg",
              "text-sm text-[#e5e2e3] placeholder:text-[#908fa0]",
              "focus:outline-none focus:ring-2 focus:ring-[#c0c1ff]/50 focus:border-[#c0c1ff]",
              "transition-all"
            )}
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right section - Notifications + User */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#262626] text-[#908fa0] hover:text-[#e5e2e3] transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {/* Notification badge */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#4cd7f6] rounded-full border-2 border-[#131314]" />
        </button>

        {/* User avatar with Clerk UserButton */}
        {isLoaded && user ? (
          <div className="flex items-center gap-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-[#e5e2e3]">
                {user.firstName || user.username || "User"}
              </p>
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "bg-[#131314] border border-[#262626]",
                  userButtonPopoverActionButton: "text-[#e5e2e3] hover:bg-[#262626]",
                  userButtonPopoverActionButtonText: "text-[#e5e2e3]",
                  userButtonPopoverActionButtonIcon: "text-[#908fa0]",
                  userButtonPopoverFooter: "hidden",
                },
              }}
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#262626] animate-pulse" />
        )}
      </div>
    </header>
  );
}

// Made with Bob
