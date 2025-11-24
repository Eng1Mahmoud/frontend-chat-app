"use client";
import { useEffect } from "react";
import { useChat } from "@/context/ChatProvider";
import { Iuser } from "@/types/apiFetch";
import { isUserOnline } from "@/utils/isUserOnline";
import { VerifiedIcon } from "lucide-react";
import { Avatar } from "../Avatar";

export const LogdinUserUI = ({ user }: { user: Iuser }) => {
  const { changedLogedinUser, onlineUsers = new Set<string>() } = useChat() || {};

  useEffect(() => {
    changedLogedinUser?.(user);
  }, [changedLogedinUser, user]);
  return (
    <div
      className="flex items-center space-x-3 p-3 rounded-xl bg-card border border-border/50 
                        hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] 
                        shadow-sm hover:shadow-md"
    >
      <Avatar user={user} onlineUsers={onlineUsers} />
      {/* User Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-foreground truncate">
            {user?.username}
          </h3>
          {user?.isVerified && (
            <VerifiedIcon className="w-4 h-4 text-blue-500" />
          )}
        </div>
        <div className="flex items-center space-x-2 mt-0.5">
          <span
            className={`text-xs font-medium ${isUserOnline(user?._id, onlineUsers)
              ? "text-green-600 dark:text-green-400"
              : "text-muted-foreground"
              }`}
          >
            {isUserOnline(user?._id, onlineUsers) ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
};
