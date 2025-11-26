"use client";
import { useChat } from "@/context/ChatProvider";
import { isUserOnline } from "@/utils/isUserOnline";
import { VerifiedIcon } from "lucide-react";
import { Avatar } from "./Avatar";
import { Iuser } from "@/types/apiFetch";

interface ChatHeaderProps {
  isOtherUserTyping: boolean;
}

const ChatHeader = ({ isOtherUserTyping }: ChatHeaderProps) => {
  const { selectedUserForChat, onlineUsers = new Set<string>() } = useChat() || {};
  const isOnline = isUserOnline(selectedUserForChat?._id as string, onlineUsers);

  return (
    <div className="relative w-full bg-slate-950/90 backdrop-blur-xl border-b border-white/10 px-5 py-4 sticky top-0 z-10 shadow-xl shadow-black/10">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-linear-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none" />

      <div className="relative flex items-center space-x-3">
        {/* Avatar with online glow */}
        <div className="relative shrink-0">
          {isOnline && (
            <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl animate-pulse" />
          )}
          <Avatar user={selectedUserForChat as Iuser} onlineUsers={onlineUsers} />
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h2 className="font-semibold text-white text-base truncate">
              {selectedUserForChat?.username}
            </h2>
            {selectedUserForChat?.isVerified && (
              <VerifiedIcon className="w-4 h-4 text-indigo-400 shrink-0" />
            )}
          </div>

          {/* Status/Typing Indicator */}
          <div className="flex items-center">
            {isOtherUserTyping ? (
              <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                <span className="text-xs font-medium text-indigo-400">typing</span>
                <div className="flex space-x-1">
                  <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            ) : (
              <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full ${isOnline
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-slate-800/50 border border-slate-700/50"
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-400 animate-pulse" : "bg-slate-500"
                  }`} />
                <span className={`text-xs font-medium ${isOnline ? "text-green-400" : "text-slate-500"
                  }`}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
