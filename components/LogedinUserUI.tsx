"use client";
import { useChat } from "@/context/ChatProvider";
import { Iuser } from "@/types/apiFetch";
import { isUserOnline } from "@/utils/isUserOnline";
import { logoutAction } from "@/actions/logout";
import { VerifiedIcon, LogOut } from "lucide-react";
import { Avatar } from "./Avatar";
import { Button } from "./ui/button";

export const LogedinUserUI = () => {
  const { logedinUser, changedLogedinUser, onlineUsers = new Set<string>() } = useChat() || {};
  // handle logout
  const handleLogout = async () => {
    await logoutAction();
    changedLogedinUser?.(null);
  }
  return (
    <div
      className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/50 border border-white/5 
                        hover:bg-white/5 transition-all duration-200 hover:scale-[1.02] 
                        shadow-sm hover:shadow-md"
    >
      <Avatar user={logedinUser as Iuser} onlineUsers={onlineUsers} />
      {/* User Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-white truncate">
            {logedinUser?.username}
          </h3>
          {logedinUser?.isVerified && (
            <VerifiedIcon className="w-4 h-4 text-indigo-400" />
          )}
        </div>
        <div className="flex items-center space-x-2 mt-0.5">
          <span
            className={`text-xs font-medium ${isUserOnline(logedinUser?._id as string, onlineUsers)
              ? "text-indigo-400"
              : "text-slate-500"
              }`}
          >
            {isUserOnline(logedinUser?._id as string, onlineUsers) ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        variant="ghost" size="icon" aria-label="Logout"
        title="Logout"
        className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10"
      >
        <LogOut className="w-5 h-5" />
      </Button>
    </div>
  );
};
