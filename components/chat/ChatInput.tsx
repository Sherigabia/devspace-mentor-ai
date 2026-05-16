"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Send, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Ask Mentor AI about your code...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 192)}px`;
  };

  return (
    <div className="p-6 border-t border-[#262626]/20 bg-[#131314]/50 backdrop-blur-md">
      <div className="max-w-4xl mx-auto relative group">
        <div className="flex items-end gap-2 bg-[#201f20] border border-[#262626]/20 rounded-2xl p-2 focus-within:border-[#c0c1ff] transition-all duration-300 shadow-lg">
          <button
            className="p-2 text-gray-400 hover:text-[#c0c1ff] transition-colors"
            disabled={disabled}
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-200 py-2 resize-none max-h-48 scrollbar-hide outline-none"
            placeholder={placeholder}
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className="bg-[#c0c1ff] text-[#0a0a0b] p-2 rounded-xl active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Lumina Indicator */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#2a2a2b]/80 border border-[#4cd7f6]/30 px-4 py-1.5 rounded-full backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
          <span className="text-xs font-medium text-[#4cd7f6]">
            Ready to analyze codebase
          </span>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
