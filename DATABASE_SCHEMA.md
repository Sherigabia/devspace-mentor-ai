# Database Schema Documentation

This document describes the Supabase PostgreSQL database schema for Devspace Mentor AI.

## Tables

### user_repositories

Stores repositories that users have connected and analyzed.

```sql
CREATE TABLE user_repositories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  repo_name TEXT NOT NULL,
  repo_full_name TEXT NOT NULL,
  repo_url TEXT NOT NULL,
  default_branch TEXT NOT NULL,
  language TEXT,
  description TEXT,
  stars INTEGER DEFAULT 0,
  forks INTEGER DEFAULT 0,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT unique_user_repo UNIQUE (user_id, repo_full_name)
);

-- Index for faster user queries
CREATE INDEX idx_user_repositories_user_id ON user_repositories(user_id);

-- Index for faster repo lookups
CREATE INDEX idx_user_repositories_repo_full_name ON user_repositories(repo_full_name);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_repositories_updated_at
  BEFORE UPDATE ON user_repositories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### github_connections

Stores GitHub OAuth connection information (optional - for future OAuth implementation).

```sql
CREATE TABLE github_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  github_username TEXT NOT NULL,
  github_user_id TEXT NOT NULL,
  access_token_encrypted TEXT NOT NULL,
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster user queries
CREATE INDEX idx_github_connections_user_id ON github_connections(user_id);

-- Update timestamp trigger
CREATE TRIGGER update_github_connections_updated_at
  BEFORE UPDATE ON github_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### repository_analyses

Stores AI analysis results for repositories.

```sql
CREATE TABLE repository_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id UUID NOT NULL REFERENCES user_repositories(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  analysis_type TEXT NOT NULL, -- 'full', 'quick', 'documentation', 'learning_path'
  analysis_data JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Index for faster repository queries
CREATE INDEX idx_repository_analyses_repository_id ON repository_analyses(repository_id);

-- Index for faster user queries
CREATE INDEX idx_repository_analyses_user_id ON repository_analyses(user_id);

-- Index for status filtering
CREATE INDEX idx_repository_analyses_status ON repository_analyses(status);

-- Update timestamp trigger
CREATE TRIGGER update_repository_analyses_updated_at
  BEFORE UPDATE ON repository_analyses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Row Level Security (RLS)

Enable RLS on all tables to ensure users can only access their own data.

```sql
-- Enable RLS
ALTER TABLE user_repositories ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE repository_analyses ENABLE ROW LEVEL SECURITY;

-- Policies for user_repositories
CREATE POLICY "Users can view their own repositories"
  ON user_repositories FOR SELECT
  USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

CREATE POLICY "Users can insert their own repositories"
  ON user_repositories FOR INSERT
  WITH CHECK (user_id = current_setting('request.jwt.claims')::json->>'sub');

CREATE POLICY "Users can update their own repositories"
  ON user_repositories FOR UPDATE
  USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

CREATE POLICY "Users can delete their own repositories"
  ON user_repositories FOR DELETE
  USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

-- Policies for github_connections
CREATE POLICY "Users can view their own GitHub connection"
  ON github_connections FOR SELECT
  USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

CREATE POLICY "Users can insert their own GitHub connection"
  ON github_connections FOR INSERT
  WITH CHECK (user_id = current_setting('request.jwt.claims')::json->>'sub');

CREATE POLICY "Users can update their own GitHub connection"
  ON github_connections FOR UPDATE
  USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

CREATE POLICY "Users can delete their own GitHub connection"
  ON github_connections FOR DELETE
  USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

-- Policies for repository_analyses
CREATE POLICY "Users can view their own analyses"
  ON repository_analyses FOR SELECT
  USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

CREATE POLICY "Users can insert their own analyses"
  ON repository_analyses FOR INSERT
  WITH CHECK (user_id = current_setting('request.jwt.claims')::json->>'sub');

CREATE POLICY "Users can update their own analyses"
  ON repository_analyses FOR UPDATE
  USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

CREATE POLICY "Users can delete their own analyses"
  ON repository_analyses FOR DELETE
  USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
```

## Setup Instructions

1. Create a Supabase project at https://supabase.com
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL commands above in order
4. Add your Supabase credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Notes

- All timestamps are stored in UTC
- The `user_id` field corresponds to Clerk's user ID
- GitHub access tokens should be encrypted before storage (use Supabase's encryption features)
- The `analysis_data` JSONB field allows flexible storage of AI analysis results
- RLS policies ensure data isolation between users

## Future Enhancements

- Add tables for learning paths
- Add tables for documentation generations
- Add tables for chat history
- Add tables for user preferences
- Add full-text search indexes for repository content

Made with Bob