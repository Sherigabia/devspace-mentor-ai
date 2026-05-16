import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createGitHubService } from "@/services/github.service";

/**
 * GET /api/github/repo/[owner]/[repo]
 * Fetch specific repository details and structure
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ owner: string; repo: string }> }
) {
  try {
    // Authenticate user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Await params
    const { owner, repo } = await params;

    // Get GitHub token
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token") || request.headers.get("x-github-token");

    if (!token) {
      return NextResponse.json(
        { error: "GitHub token is required" },
        { status: 400 }
      );
    }

    // Create GitHub service
    const githubService = createGitHubService(token);

    // Fetch repository details
    const repository = await githubService.getRepository(owner, repo);

    // Optionally fetch tree structure
    const includeTree = searchParams.get("include_tree") === "true";
    let tree = null;

    if (includeTree) {
      try {
        tree = await githubService.getRepositoryTree(
          owner,
          repo,
          repository.default_branch
        );
      } catch (error) {
        console.error("Error fetching repository tree:", error);
        // Continue without tree if it fails
      }
    }

    // Optionally fetch README
    const includeReadme = searchParams.get("include_readme") === "true";
    let readme = null;

    if (includeReadme) {
      try {
        readme = await githubService.getReadme(owner, repo);
      } catch (error) {
        console.error("Error fetching README:", error);
        // Continue without README if it fails
      }
    }

    return NextResponse.json({
      repository,
      tree,
      readme,
    });
  } catch (error) {
    console.error("Error fetching repository:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to fetch repository",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Made with Bob