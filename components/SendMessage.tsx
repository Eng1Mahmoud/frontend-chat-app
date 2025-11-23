"use client";
import React, { useState, useRef } from "react";
import { socket } from "@/socket";
import { useChat } from "@/context/ChatProvider";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    setIsTyping(value.length > 0);
  };

  const { selectedUserForChat } = useChat() || {};

  const handleSendMessage = () => {
    if (message.trim() && selectedUserForChat) {
      socket.emit("send_message", {
        receiverId: selectedUserForChat._id,
        text: message,
      });
      setMessage("");
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-background/95 backdrop-blur-md border-t border-border/30 p-4 sticky bottom-0 z-10">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-t from-primary/3 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Main input container */}
        <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30">
          <div className="flex items-end space-x-3 p-4">
            {/* Message input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="w-full bg-transparent border-none outline-none resize-none text-foreground placeholder-muted-foreground text-base leading-6 max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted/20 scrollbar-track-transparent"
                rows={1}
                style={{ minHeight: "24px" }}
              />
            </div>

            {/* Send button */}
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
                message.trim()
                  ? "bg-linear-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-muted/30 text-muted-foreground cursor-not-allowed"
              }`}
            >
              {message.trim() ? (
                <svg
                  className="w-5 h-5 transform rotate-45"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
