import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createRepositoryService } from "@/services/repository.service";

/**
 * GET /api/repositories
 * Fetch user's stored repositories from database
 */
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const repositoryService = createRepositoryService();
    const repositories = await repositoryService.getUserRepositories(userId);

    return NextResponse.json({
      repositories,
      count: repositories.length,
    });
  } catch (error) {
    console.error("Error fetching repositories:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to fetch repositories",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/repositories
 * Save a repository to database
 */
export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      "repo_name",
      "repo_full_name",
      "repo_url",
      "default_branch",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const repositoryService = createRepositoryService();
    const repository = await repositoryService.saveRepository({
      user_id: userId,
      repo_name: body.repo_name,
      repo_full_name: body.repo_full_name,
      repo_url: body.repo_url,
      default_branch: body.default_branch,
      language: body.language || null,
      description: body.description || null,
      stars: body.stars || 0,
      forks: body.forks || 0,
      last_synced_at: null,
    });

    return NextResponse.json({
      repository,
      message: "Repository saved successfully",
    });
  } catch (error) {
    console.error("Error saving repository:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to save repository",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/repositories
 * Delete a repository from database
 */
export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const repositoryId = searchParams.get("id");

    if (!repositoryId) {
      return NextResponse.json(
        { error: "Repository ID is required" },
        { status: 400 }
      );
    }

    const repositoryService = createRepositoryService();
    
    // Verify repository belongs to user
    const repository = await repositoryService.getRepository(repositoryId);
    
    if (!repository) {
      return NextResponse.json(
        { error: "Repository not found" },
        { status: 404 }
      );
    }

    if (repository.user_id !== userId) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    await repositoryService.deleteRepository(repositoryId);

    return NextResponse.json({
      message: "Repository deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting repository:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to delete repository",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Made with Bob