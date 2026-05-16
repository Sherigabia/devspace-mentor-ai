import { supabase, TABLES } from "@/lib/supabase";
import type { StoredRepository } from "@/types/github";

/**
 * Repository Service
 * Handles database operations for user repositories
 */

type RepositoryInput = Omit<StoredRepository, "id" | "created_at" | "updated_at">;

export class RepositoryService {
  /**
   * Get all repositories for a user
   */
  async getUserRepositories(userId: string): Promise<StoredRepository[]> {
    const { data, error } = await supabase
      .from(TABLES.USER_REPOSITORIES)
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch repositories: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get a specific repository by ID
   */
  async getRepository(repositoryId: string): Promise<StoredRepository | null> {
    const { data, error } = await supabase
      .from(TABLES.USER_REPOSITORIES)
      .select("*")
      .eq("id", repositoryId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Not found
      }
      throw new Error(`Failed to fetch repository: ${error.message}`);
    }

    return data;
  }

  /**
   * Save or update a repository
   */
  async saveRepository(
    repository: RepositoryInput
  ): Promise<StoredRepository> {
    // Check if repository already exists
    const { data: existing } = await supabase
      .from(TABLES.USER_REPOSITORIES)
      .select("id")
      .eq("user_id", repository.user_id)
      .eq("repo_full_name", repository.repo_full_name)
      .single();

    if (existing) {
      // Update existing repository
      const { data, error } = await supabase
        .from(TABLES.USER_REPOSITORIES)
        .update({
          ...repository,
          last_synced_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update repository: ${error.message}`);
      }

      return data;
    } else {
      // Insert new repository
      const { data, error } = await supabase
        .from(TABLES.USER_REPOSITORIES)
        .insert({
          ...repository,
          last_synced_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to save repository: ${error.message}`);
      }

      return data;
    }
  }

  /**
   * Delete a repository
   */
  async deleteRepository(repositoryId: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.USER_REPOSITORIES)
      .delete()
      .eq("id", repositoryId);

    if (error) {
      throw new Error(`Failed to delete repository: ${error.message}`);
    }
  }

  /**
   * Update repository sync timestamp
   */
  async updateSyncTimestamp(repositoryId: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.USER_REPOSITORIES)
      .update({
        last_synced_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", repositoryId);

    if (error) {
      throw new Error(`Failed to update sync timestamp: ${error.message}`);
    }
  }
}

/**
 * Create a repository service instance
 */
export function createRepositoryService(): RepositoryService {
  return new RepositoryService();
}

// Made with Bob