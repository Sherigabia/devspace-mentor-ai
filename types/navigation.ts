import { LucideIcon } from "lucide-react";

/**
 * Navigation item interface for sidebar and navigation menus
 */
export interface NavigationItem {
  /** Display name of the navigation item */
  name: string;
  /** URL path for the navigation item */
  href: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Optional badge text (e.g., "New", "Beta") */
  badge?: string;
}

// Made with Bob
