"use client";
import { useChat } from "@/context/ChatProvider";
import { isUserOnline } from "@/utils/isUserOnline";
import { VerifiedIcon, Menu } from "lucide-react";
import { Avatar } from "./Avatar";
import { Iuser } from "@/types/apiFetch";


interface ChatHeaderProps {
  isOtherUserTyping: boolean;
}

const ChatHeader = ({ isOtherUserTyping }: ChatHeaderProps) => {
  const { selectedUserForChat, onlineUsers = new Set<string>() } = useChat() || {};


  return (
    <div className="w-full bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-4 py-3 sticky top-0 z-10 shadow-xl shadow-white/3">
      <div className="flex items-center space-x-3">
        <Avatar user={selectedUserForChat as Iuser} onlineUsers={onlineUsers} />
        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h2 className="font-semibold text-white text-base truncate">
              {selectedUserForChat?.username}
            </h2>
            {selectedUserForChat?.isVerified && (
              <VerifiedIcon className="w-4 h-4 text-indigo-400" />
            )}
          </div>
          <div className="flex items-center space-x-1">
            {isOtherUserTyping ? (
              <div className="flex items-center space-x-1">
                <span className="text-sm text-indigo-400">typing</span>
                <div className="flex space-x-1">
                  <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            ) : (
              <span
                className={`text-sm ${isUserOnline(selectedUserForChat?._id as string, onlineUsers)
                  ? "text-indigo-400"
                  : "text-gray-500"
                  }`}
              >
                {isUserOnline(selectedUserForChat?._id as string, onlineUsers) ? "Online" : "Offline"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
