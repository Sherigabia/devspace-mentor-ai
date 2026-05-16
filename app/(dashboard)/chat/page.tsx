"use client";

import { useState } from "react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { Sparkles, FileCode, Zap } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  codeBlock?: {
    language: string;
    code: string;
    filename?: string;
  };
  badges?: Array<{
    text: string;
    variant: "primary" | "secondary" | "tertiary";
  }>;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "user",
      content:
        "Can you explain the current implementation of the `validateSession` middleware and suggest a more secure way to handle JWT expiration?",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      role: "assistant",
      content:
        "In your current AuthHandler.ts, the session validation is performed synchronously using a secret key. While functional, it lacks protection against token revocation and replay attacks. Here's an improved implementation:",
      timestamp: new Date().toISOString(),
      codeBlock: {
        language: "typescript",
        filename: "ImprovedAuthHandler.ts",
        code: `async function validateSession(token: string) {
  // 1. Decode without verification to check exp
  const decoded = jwt.decode(token);
  
  if (decoded.exp < Date.now() / 1000) {
    throw new AuthError('TOKEN_EXPIRED');
  }

  // 2. Verify with key & signature
  return await verifyAsync(token, process.env.JWT_SECRET);
}`,
      },
      badges: [
        { text: "Suggested Refactor", variant: "primary" },
        { text: "Performance Optimized", variant: "secondary" },
      ],
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I understand your question. Let me analyze the codebase and provide you with a detailed explanation...",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const suggestedPrompts = [
    "Analyze potential race conditions in the payment worker...",
    "How do I optimize the database indexing for the user table?",
    "Generate a Dockerfile for this service...",
    "Explain the authentication flow in this application",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="border-b border-[#262626]/20 bg-[#131314]/50 backdrop-blur-md px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#c0c1ff]/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-[#c0c1ff]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-100">AI Chat Assistant</h1>
              <p className="text-xs text-gray-400">Ask anything about your codebase</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
            <span className="text-xs text-gray-400">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
        {messages.length === 0 ? (
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#c0c1ff]/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-[#c0c1ff]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-100 mb-2">
              Start a conversation
            </h2>
            <p className="text-gray-400 mb-8">
              Ask me anything about your code, architecture, or best practices.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-left p-4 rounded-xl border border-[#262626]/20 hover:border-[#c0c1ff]/40 hover:bg-[#201f20] transition-all group"
                >
                  <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                    {prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} {...message} />
            ))}
            {isLoading && (
              <div className="flex gap-4 max-w-4xl mx-auto w-full">
                <div className="w-8 h-8 rounded-lg bg-[#c0c1ff]/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#c0c1ff] animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#c0c1ff] animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-[#c0c1ff] animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-[#c0c1ff] animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Suggested Prompts (when messages exist) */}
      {messages.length > 0 && (
        <div className="border-t border-[#262626]/20 bg-[#131314]/30 px-6 py-3">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-gray-500 mb-2">Suggested:</p>
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {suggestedPrompts.slice(0, 3).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(prompt)}
                  className="flex-shrink-0 px-3 py-1.5 text-xs bg-[#201f20] border border-[#262626]/20 rounded-lg hover:border-[#c0c1ff]/40 transition-colors text-gray-400 hover:text-gray-200"
                >
                  {prompt.slice(0, 50)}...
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />

      {/* Power Tip */}
      <div className="border-t border-[#262626]/20 bg-[#131314]/30 px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3 text-xs text-gray-500">
          <Zap className="w-4 h-4 text-[#4cd7f6]" />
          <p>
            <span className="font-medium text-gray-400">Power Tip:</span> Highlight any
            block of code and press{" "}
            <kbd className="bg-[#201f20] px-1.5 py-0.5 border border-[#262626]/30 rounded text-xs">
              Ctrl+K
            </kbd>{" "}
            to ask for a specific explanation or refactor.
          </p>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
