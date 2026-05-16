"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={handleMobileClose}
      />

      {/* Main content area */}
      <div
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-60"
        )}
      >
        {/* Top navbar */}
        <TopNavbar onMobileMenuToggle={handleMobileMenuToggle} />

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// Made with Bob
