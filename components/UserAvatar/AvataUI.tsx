"use client";
import { useEffect } from "react";
import { useChat } from "@/context/ChatProvider";
import { Iuser } from "@/types/apiFetch";
import { BadgeCheck } from "lucide-react";

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
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-foreground truncate">
            {user?.username}
          </h3>
          {user?.isVerified && (
            <BadgeCheck className="w-4 h-4 text-blue-500" />
          )}
        </div>
      </div>
    </div>
  );
};
