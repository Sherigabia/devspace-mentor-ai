"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { navigationItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-[#131314] border-r border-[#262626] transition-all duration-300 ease-in-out flex flex-col",
          isCollapsed ? "w-20" : "w-60",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo/Brand Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#262626]">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 group"
            onClick={onMobileClose}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c0c1ff] to-[#6366f1] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-[#0a0a0b]" />
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-[#e5e2e3] text-sm whitespace-nowrap group-hover:text-[#c0c1ff] transition-colors">
                Devspace Mentor
              </span>
            )}
          </Link>

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-6 h-6 rounded hover:bg-[#262626] text-[#908fa0] hover:text-[#c0c1ff] transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onMobileClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative",
                      isActive
                        ? "bg-[#c0c1ff]/10 text-[#c0c1ff] shadow-sm"
                        : "text-[#908fa0] hover:text-[#e5e2e3] hover:bg-[#262626]"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#c0c1ff] rounded-r" />
                    )}

                    <Icon
                      className={cn(
                        "w-5 h-5 flex-shrink-0 transition-colors",
                        isActive ? "text-[#c0c1ff]" : "text-[#908fa0] group-hover:text-[#e5e2e3]"
                      )}
                    />

                    {!isCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-[#6366f1]/20 text-[#c0c1ff] rounded-full border border-[#6366f1]/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-[#262626] p-3">
          {isLoaded && user ? (
            <Link
              href="/settings"
              onClick={onMobileClose}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#908fa0] hover:text-[#e5e2e3] hover:bg-[#262626] transition-all group",
                isCollapsed && "justify-center"
              )}
              aria-label="User profile"
            >
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.fullName || user.username || "User"}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4cd7f6] to-[#6366f1] flex items-center justify-center flex-shrink-0 text-[#0a0a0b] font-semibold text-xs">
                  {(user.firstName || user.username || "D").substring(0, 2).toUpperCase()}
                </div>
              )}
              {!isCollapsed && (
                <div className="flex-1 text-left truncate">
                  <p className="text-[#e5e2e3] font-medium text-sm truncate group-hover:text-[#c0c1ff] transition-colors">
                    {user.fullName || user.username || "Developer"}
                  </p>
                  <p className="text-[#908fa0] text-xs truncate">
                    {user.primaryEmailAddress?.emailAddress || "dev@example.com"}
                  </p>
                </div>
              )}
            </Link>
          ) : (
            <div
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                isCollapsed && "justify-center"
              )}
            >
              <div className="w-8 h-8 rounded-full bg-[#262626] animate-pulse flex-shrink-0" />
              {!isCollapsed && (
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-[#262626] rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-[#262626] rounded animate-pulse w-1/2" />
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// Made with Bob
