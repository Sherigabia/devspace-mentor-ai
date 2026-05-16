# Authentication & GitHub Integration Setup Guide

This guide walks you through setting up authentication and GitHub repository connection for Devspace Mentor AI.

## Prerequisites

- Node.js 18+ installed
- A Clerk account (free tier available)
- A Supabase account (free tier available)
- A GitHub account

## Step 1: Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## Step 2: Set Up Clerk Authentication

1. Go to https://dashboard.clerk.com
2. Create a new application
3. Choose your authentication methods (Email, Google, GitHub, etc.)
4. Copy your API keys from the dashboard

## Step 3: Set Up Supabase Database

1. Go to https://supabase.com/dashboard
2. Create a new project
3. Wait for the database to be provisioned
4. Go to SQL Editor and run the schema from `DATABASE_SCHEMA.md`
5. Copy your project URL and anon key from Settings > API

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill in your credentials:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# watsonx.ai (if you have it)
WATSONX_API_KEY=...
WATSONX_PROJECT_ID=...
WATSONX_URL=https://us-south.ml.cloud.ibm.com
```

**Note:** The `WATSONX_URL` depends on your IBM Cloud region:
- US South: `https://us-south.ml.cloud.ibm.com`
- EU Germany: `https://eu-de.ml.cloud.ibm.com`
- Japan Tokyo: `https://jp-tok.ml.cloud.ibm.com`

Check your IBM Cloud dashboard for the correct endpoint.

## Step 5: Run the Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Authentication Flow

### Sign Up / Sign In

1. Users visit `/sign-in` or `/sign-up`
2. Clerk handles the authentication UI
3. After authentication, users are redirected to `/dashboard`
4. Protected routes require authentication (enforced by middleware)

### Protected Routes

The following routes require authentication:
- `/dashboard`
- `/repository`
- `/chat`
- `/learning`
- `/documentation`

## GitHub Integration Flow

### 1. Connect GitHub

Users need a GitHub Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - `repo` (Full control of private repositories)
   - `read:user` (Read user profile data)
4. Generate and copy the token

### 2. Repository Selection

1. User enters their GitHub token
2. System fetches their repositories via GitHub API
3. User selects a repository
4. Repository metadata is saved to Supabase

### 3. Repository Analysis

Once a repository is selected:
- Fetch repository structure from GitHub
- Build comprehensive context (files, dependencies, structure)
- Analyze with watsonx.ai Granite models
- Generate structured insights and recommendations
- Cache results in Supabase for faster subsequent loads
- Display AI-powered insights, tech stack, and learning paths

**Requirements:**
- GitHub OAuth token (via Clerk)
- Watsonx.ai credentials properly configured
- Supabase database with correct schema

**Analysis Flow:**
1. User selects repository
2. System fetches repo data via GitHub API
3. Context builder analyzes structure and dependencies
4. Watsonx.ai generates intelligent insights
5. Results cached in Supabase
6. UI displays comprehensive analysis

## API Routes

### Authentication

All API routes automatically check authentication via Clerk middleware.

### GitHub API Routes

- `GET /api/github/repos` - Fetch user repositories
- `GET /api/github/repo/[owner]/[repo]` - Fetch specific repository

### Repository Management

- `GET /api/repositories` - Get user's stored repositories
- `POST /api/repositories` - Save a repository
- `DELETE /api/repositories?id=xxx` - Delete a repository

## Security Notes

### ✅ Secure Practices

- GitHub tokens are passed via headers (not stored in frontend)
- All API routes require authentication
- Supabase RLS policies enforce data isolation
- Clerk handles session management securely

### ⚠️ Important

- Never commit `.env.local` to version control
- GitHub tokens should be encrypted before database storage
- Use environment variables for all secrets
- Validate all user inputs on the server

## State Management

### Zustand Store

The `useRepositoryStore` manages:
- GitHub repositories list
- Selected repository
- Connection status
- Loading states

Example usage:

```tsx
import { useRepositoryStore } from "@/store/repository.store";

function MyComponent() {
  const { repositories, selectedRepository, setRepositories } = useRepositoryStore();
  
  // Use the state...
}
```

## Database Schema

See `DATABASE_SCHEMA.md` for complete schema documentation.

### Key Tables

- `user_repositories` - Stores connected repositories
- `github_connections` - Stores GitHub OAuth data (optional)
- `repository_analyses` - Stores AI analysis results

## Troubleshooting

### Clerk Issues

**Problem:** "Clerk is not configured"
- Check that environment variables are set correctly
- Restart the dev server after adding env vars

**Problem:** Redirect loop
- Verify `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` is set to `/dashboard`

### Supabase Issues

**Problem:** "Failed to fetch repositories"
- Check Supabase URL and anon key
- Verify database tables are created
- Check RLS policies are enabled

**Problem:** "Unauthorized" errors
- Ensure user is authenticated
- Check that `user_id` matches Clerk user ID

### GitHub API Issues

**Problem:** "GitHub token is required"
- Token must be passed in request headers or query params
- Token needs `repo` scope

**Problem:** "Rate limit exceeded"
- GitHub API has rate limits (5000 requests/hour for authenticated users)
- Implement caching if needed

## Next Steps

After setup is complete:

1. ✅ Authentication working
2. ✅ GitHub connection working
3. ✅ Repository selection working
4. ⏳ Implement AI repository analysis
5. ⏳ Generate onboarding documentation
6. ⏳ Create learning paths
7. ⏳ Build AI chat assistant

## Support

For issues or questions:
- Check the console for error messages
- Review the API route logs
- Verify environment variables
- Check Clerk and Supabase dashboards

Made with Bob