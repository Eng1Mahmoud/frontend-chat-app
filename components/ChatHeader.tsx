"use client";
import { useChat } from "@/context/ChatProvider";
import { isUserOnline } from "@/utils/isUserOnline";
import { VerifiedIcon, Menu } from "lucide-react";
import { Avatar } from "./Avatar";
import { Iuser } from "@/types/apiFetch";
import { useSidebar } from "@/components/ui/sidebar";

interface ChatHeaderProps {
  isOtherUserTyping: boolean;
}

const ChatHeader = ({ isOtherUserTyping }: ChatHeaderProps) => {
  const { selectedUserForChat, onlineUsers = new Set<string>() } = useChat() || {};
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-full bg-[#F0F2F5] dark:bg-[#202C33] border-b border-gray-200 dark:border-gray-800 px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        {/* Sidebar toggle button */}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors "
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        <Avatar user={selectedUserForChat as Iuser} onlineUsers={onlineUsers} />
        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h2 className="font-semibold text-gray-900 dark:text-white text-base truncate">
              {selectedUserForChat?.username}
            </h2>
            {selectedUserForChat?.isVerified && (
              <VerifiedIcon className="w-4 h-4 text-green-500" />
            )}
          </div>
          <div className="flex items-center space-x-1">
            {isOtherUserTyping ? (
              <div className="flex items-center space-x-1">
                <span className="text-sm text-[#25D366]">typing</span>
                <div className="flex space-x-1">
                  <span className="w-1 h-1 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1 h-1 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1 h-1 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            ) : (
              <span
                className={`text-sm ${isUserOnline(selectedUserForChat?._id as string, onlineUsers)
                  ? "text-[#25D366]"
                  : "text-gray-500 dark:text-gray-400"
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
