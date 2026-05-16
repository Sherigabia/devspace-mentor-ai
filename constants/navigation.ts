import {
  LayoutDashboard,
  FolderGit,
  MessageSquare,
  GraduationCap,
  FileText,
  Settings,
} from "lucide-react";
import { NavigationItem } from "@/types/navigation";

/**
 * Main navigation items for the application sidebar
 */
export const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Repository Analysis",
    href: "/repository",
    icon: FolderGit,
  },
  {
    name: "AI Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    name: "Learning Paths",
    href: "/learning",
    icon: GraduationCap,
  },
  {
    name: "Documentation",
    href: "/documentation",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

// Made with Bob
