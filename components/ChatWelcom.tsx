import React from "react";

const ChatWelcom = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  bg-linear-to-br from-background via-background/95 to-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.08),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,183,77,0.06),transparent_60%)]"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Welcome icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-linear-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-border/20">
            <svg
              className="w-12 h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          {/* Floating decorative elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-500/20 rounded-full animate-bounce delay-75"></div>
        </div>

        {/* Welcome text */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3">
            Welcome to Chat
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Select a friend from your contacts to start a conversation and
            connect with them instantly.
          </p>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatWelcom;
