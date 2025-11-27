"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Iuser } from "@/types/apiFetch";
import { useChat } from "@/context/ChatProvider";
import { MessageSquareText, VerifiedIcon, Users, Sparkles } from "lucide-react";
import { Avatar } from "../Avatar";

const UserListUI = ({ users }: { users: Iuser[] }) => {
  const {
    changedSelectedUserForChat,
    selectedUserForChat,
    onlineUsers = new Set<string>(),
    unreadCounts = {},
  } = useChat() || {};
  const { setOpenMobile } = useSidebar();

  const handleSelectUser = (user: Iuser) => {
    changedSelectedUserForChat?.(user);
    setOpenMobile && setOpenMobile(false);
  };

  const isActiveUser = (user: Iuser) => {
    return selectedUserForChat?._id === user?._id;
  };

  return (
    <div className="w-full bg-slate-950 h-full flex flex-col">
      {/* Header */}
      <div className="relative p-5 bg-linear-to-br from-slate-900/80 to-slate-900/60 backdrop-blur-md border-b border-white/10">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />

        <div className="relative flex items-center space-x-3">
          {/* Icon with gradient background */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl blur-lg opacity-50 animate-pulse" />
            <div className="relative w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <MessageSquareText className="text-white w-5 h-5" strokeWidth={2} />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white">Global Chat</h2>
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Connect with <span className="font-semibold text-indigo-400">{users.length}+</span>{" "}
              people worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {users.map((user) => {
          const isActive = isActiveUser(user);
          const isOnline = onlineUsers.has(user._id);
          const unreadCount = unreadCounts[user._id] || 0;

          return (
            <div
              key={user?._id}
              className={`group relative flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-all duration-200 cursor-pointer border-l-4 ${isActive
                  ? "bg-indigo-600/10 border-l-indigo-500 shadow-lg shadow-indigo-500/5"
                  : "border-l-transparent hover:border-l-indigo-400/30"
                }`}
              onClick={() => handleSelectUser(user)}
            >
              {/* Hover gradient effect */}
              {!isActive && (
                <div className="absolute inset-0 bg-linear-to-r from-indigo-500/0 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              )}

              {/* Avatar with online glow */}
              <div className="relative shrink-0">
                {isOnline && (
                  <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md animate-pulse" />
                )}
                <Avatar user={user} onlineUsers={onlineUsers} />
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0 relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1.5 flex-1 min-w-0">
                    <h3
                      className={`font-semibold text-sm truncate ${isActive ? "text-white" : "text-slate-200 group-hover:text-white"
                        }`}
                    >
                      {user.username}
                    </h3>
                    {user.isVerified && (
                      <div className="relative shrink-0">
                        <VerifiedIcon className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                    )}
                  </div>
                  {/* Unread count badge */}
                  {unreadCount > 0 && (
                    <div className="shrink-0 ml-2">
                      <div className="min-w-[20px] h-5 px-1.5 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <span className="text-[10px] font-bold text-white">
                          {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p
                    className={`text-xs truncate ${isActive ? "text-slate-400" : "text-slate-500 group-hover:text-slate-400"
                      }`}
                  >
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/*  Empty State */}
      {users.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-slate-800/50 rounded-full flex items-center justify-center border border-white/10">
              <Users className="w-8 h-8 text-slate-600" />
            </div>
            <div className="space-y-1">
              <p className="text-slate-400 font-medium">No contacts found</p>
              <p className="text-sm text-slate-600">Add some friends to start chatting</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListUI;
