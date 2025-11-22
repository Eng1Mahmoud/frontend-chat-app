"use client";
import { useChat } from "@/context/ChatProvider";

const ChatHeader = () => {
  const { selectedUserForChat } = useChat() || {};

  const getInitials = (username: string) => {
    return username?.slice(0, 2).toUpperCase();
  };

  return (
    <div className="w-full bg-linear-to-r from-background/98 via-background/95 to-background/98 backdrop-blur-md border-b border-border/30 shadow-lg shadow-black/5 px-6 py-4 sticky top-0 z-10 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="flex items-center space-x-4 relative z-10">
        {/* Avatar with online status */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm ring-2 ring-background shadow-sm">
            {getInitials(selectedUserForChat?.username as string)}
          </div>

          {/* Online Status Indicator */}
          {selectedUserForChat?.online && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background shadow-sm"></div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h2 className="font-semibold text-foreground text-lg truncate">
              {selectedUserForChat?.username}
            </h2>
            {selectedUserForChat?.isVerified && (
              <div
                className="w-2 h-2 bg-blue-500 rounded-full shadow-sm"
                title="Verified"
              ></div>
            )}
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <div
              className={`w-2 h-2 rounded-full ${
                selectedUserForChat?.online ? "bg-green-500" : "bg-gray-400"
              }`}
            ></div>
            <span
              className={`text-sm font-medium ${
                selectedUserForChat?.online
                  ? "text-green-600 dark:text-green-400"
                  : "text-muted-foreground"
              }`}
            >
              {selectedUserForChat?.online ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Optional actions space */}
        <div className="flex items-center space-x-2">
          {/* You can add more actions like call, video call, etc. */}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
