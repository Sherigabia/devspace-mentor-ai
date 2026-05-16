"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRepositoryStore } from "@/store/repository.store";

// GitHub icon as SVG component
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

interface GitHubConnectProps {
  onConnect: (token: string) => Promise<void>;
}

export function GitHubConnect({ onConnect }: GitHubConnectProps) {
  const [token, setToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(false);
  const { isConnecting, connectionStatus } = useRepositoryStore();

  const handleConnect = async () => {
    if (!token.trim()) return;
    await onConnect(token);
  };

  if (connectionStatus === "connected") {
    return (
      <div className="flex items-center gap-3 p-4 bg-[#131314] border border-[#262626] rounded-lg">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4cd7f6] to-[#6366f1] flex items-center justify-center">
          <GithubIcon className="w-5 h-5 text-[#0a0a0b]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-[#e5e2e3]">
            GitHub Connected
          </p>
          <p className="text-xs text-[#908fa0]">
            You can now select repositories
          </p>
        </div>
        <div className="w-2 h-2 bg-[#4cd7f6] rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-[#131314] border border-[#262626] rounded-lg">
        <div className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center">
          <GithubIcon className="w-5 h-5 text-[#908fa0]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-[#e5e2e3]">
            Connect GitHub
          </p>
          <p className="text-xs text-[#908fa0]">
            Connect your GitHub account to analyze repositories
          </p>
        </div>
        {!showTokenInput && (
          <button
            onClick={() => setShowTokenInput(true)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium text-sm transition-all",
              "bg-gradient-to-r from-[#4cd7f6] to-[#6366f1]",
              "text-[#0a0a0b] hover:opacity-90"
            )}
          >
            Connect
          </button>
        )}
      </div>

      {showTokenInput && (
        <div className="p-4 bg-[#131314] border border-[#262626] rounded-lg space-y-4">
          <div>
            <label
              htmlFor="github-token"
              className="block text-sm font-medium text-[#e5e2e3] mb-2"
            >
              GitHub Personal Access Token
            </label>
            <input
              id="github-token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className={cn(
                "w-full px-3 py-2 bg-[#0a0a0b] border border-[#262626] rounded-lg",
                "text-sm text-[#e5e2e3] placeholder:text-[#908fa0]",
                "focus:outline-none focus:ring-2 focus:ring-[#c0c1ff]/50 focus:border-[#c0c1ff]",
                "transition-all"
              )}
              disabled={isConnecting}
            />
            <p className="mt-2 text-xs text-[#908fa0]">
              Create a token at{" "}
              <a
                href="https://github.com/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4cd7f6] hover:underline"
              >
                github.com/settings/tokens
              </a>{" "}
              with <code className="px-1 py-0.5 bg-[#262626] rounded">repo</code> scope
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleConnect}
              disabled={!token.trim() || isConnecting}
              className={cn(
                "flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all",
                "bg-gradient-to-r from-[#4cd7f6] to-[#6366f1]",
                "text-[#0a0a0b] hover:opacity-90",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-center gap-2"
              )}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect GitHub"
              )}
            </button>
            <button
              onClick={() => {
                setShowTokenInput(false);
                setToken("");
              }}
              disabled={isConnecting}
              className={cn(
                "px-4 py-2 rounded-lg font-medium text-sm transition-all",
                "bg-[#262626] text-[#e5e2e3] hover:bg-[#333333]",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Made with Bob