import { createClient } from "@supabase/supabase-js";

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

/**
 * Supabase client instance
 * Used for database operations throughout the application
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Database table names
 */
export const TABLES = {
  USER_REPOSITORIES: "user_repositories",
  GITHUB_CONNECTIONS: "github_connections",
  REPOSITORY_ANALYSES: "repository_analyses",
} as const;

// Made with Bob