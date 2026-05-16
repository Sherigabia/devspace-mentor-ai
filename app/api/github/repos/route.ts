import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createGitHubService } from "@/services/github.service";

/**
 * GET /api/github/repos
 * Fetch user's GitHub repositories using Clerk OAuth token
 * Server-side only - never exposes GitHub token to client
 */
export async function GET(request: Request) {
  try {
    // Authenticate user via Clerk
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get GitHub OAuth token from Clerk
    const client = await clerkClient();
    const provider = "oauth_github";
    
    const clerkResponse = await client.users.getUserOauthAccessToken(
      userId,
      provider
    );

    if (!clerkResponse.data || clerkResponse.data.length === 0) {
      return NextResponse.json(
        {
          error: "GitHub not connected",
          message: "Please connect your GitHub account first"
        },
        { status: 400 }
      );
    }

    const token = clerkResponse.data[0].token;

    if (!token) {
      return NextResponse.json(
        { error: "GitHub token not found" },
        { status: 400 }
      );
    }

    // Create GitHub service with OAuth token
    const githubService = createGitHubService(token);

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get("sort") as "created" | "updated" | "pushed" | "full_name" | null;
    const direction = searchParams.get("direction") as "asc" | "desc" | null;
    const perPage = searchParams.get("per_page");
    const page = searchParams.get("page");

    // Fetch repositories from GitHub
    const repositories = await githubService.getUserRepositories({
      sort: sort || "updated",
      direction: direction || "desc",
      per_page: perPage ? parseInt(perPage) : 30,
      page: page ? parseInt(page) : 1,
    });

    // Return normalized repository list
    return NextResponse.json({
      repositories: repositories.map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        language: repo.language,
        updated_at: repo.updated_at,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        private: repo.private,
        html_url: repo.html_url,
        default_branch: repo.default_branch,
      })),
      count: repositories.length,
    });
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    
    return NextResponse.json(
      {
        error: "Failed to fetch repositories",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Made with Bob