"use client";
import { useEffect } from "react";
import { useChat } from "@/context/ChatProvider";
import { Iuser } from "@/types/apiFetch";

export const AvatarUI = ({ user }: { user: Iuser }) => {
  const { changedLogedinUser } = useChat() || {};
  const getInitials = (username: string) => {
    return username?.slice(0, 2).toUpperCase();
  };
  useEffect(() => {
    changedLogedinUser?.(user);
  }, [changedLogedinUser, user]);
  return (
    <div
      className="flex items-center space-x-3 p-3 rounded-xl bg-card border border-border/50 
                        hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] 
                        shadow-sm hover:shadow-md"
    >
      {/* Avatar */}
      <div className="relative">
        <div
          className={`w-12 h-12 rounded-full bg-gray-400
                               flex items-center justify-center text-white font-semibold text-sm
                               shadow-lg ring-2 ring-white/20`}
        >
          {getInitials(user?.username)}
        </div>

        {/* Online Status Indicator */}
        {user?.online && (
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full 
                                   border-2 border-white shadow-sm animate-pulse"
          ></div>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-foreground truncate">
            {user?.username}
          </h3>
          {user?.isVerified && (
            <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm"></div>
          )}
        </div>
        <div className="flex items-center space-x-2 mt-0.5">
          <span
            className={`text-xs font-medium ${
              user?.online
                ? "text-green-600 dark:text-green-400"
                : "text-muted-foreground"
            }`}
          >
            {user?.online ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
};
