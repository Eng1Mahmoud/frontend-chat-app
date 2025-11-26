"use client";
import { useChat } from "@/context/ChatProvider";
import { Iuser } from "@/types/apiFetch";
import { isUserOnline } from "@/utils/isUserOnline";
import { logoutAction } from "@/actions/logout";
import { VerifiedIcon, LogOut, Sparkles } from "lucide-react";
import { Avatar } from "./Avatar";
import { Button } from "./ui/button";

export const LogedinUserUI = () => {
  const { logedinUser, changedLogedinUser, onlineUsers = new Set<string>() } = useChat() || {};

  const handleLogout = async () => {
    await logoutAction();
    changedLogedinUser?.(null);
  };

  const isOnline = isUserOnline(logedinUser?._id as string, onlineUsers);

  return (
    <div className="relative group">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        className="relative flex items-center space-x-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10 
                          backdrop-blur-sm hover:bg-slate-900/80 transition-all duration-300 hover:scale-[1.02] 
                          shadow-lg hover:shadow-xl hover:shadow-indigo-500/10"
      >
        {/* Avatar with glow effect when online */}
        <div className="relative">
          {isOnline && (
            <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl animate-pulse" />
          )}
          <Avatar user={logedinUser as Iuser} onlineUsers={onlineUsers} />
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-white truncate text-base">{logedinUser?.username}</h3>
            {logedinUser?.isVerified && (
              <div className="relative">
                <VerifiedIcon className="w-4 h-4 text-indigo-400" />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div
              className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-full ${
                isOnline
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-slate-800/50 border border-slate-700/50"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isOnline ? "bg-green-400 animate-pulse" : "bg-slate-500"
                }`}
              />
              <span
                className={`text-xs font-medium ${isOnline ? "text-green-400" : "text-slate-500"}`}
              >
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="icon"
          aria-label="Logout"
          title="Logout"
          className="cursor-pointer text-slate-400 hover:text-red-400 hover:bg-red-500/10 
                     transition-all duration-200 rounded-xl hover:scale-110 active:scale-95
                     border border-transparent hover:border-red-500/20"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
