"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Iuser } from "@/types/apiFetch";
import { useChat } from "@/context/ChatProvider";
import { MessageSquareText, VerifiedIcon } from "lucide-react";
import { Avatar } from "../Avatar";

const UserListUI = ({ users }: { users: Iuser[] }) => {
  const { changedSelectedUserForChat, selectedUserForChat, onlineUsers = new Set<string>() } = useChat() || {};
  const { setOpen, setOpenMobile } = useSidebar();
  // handle select user for chat >> store in global state (to be implemented)
  const handleSelectUser = (user: Iuser) => {
    changedSelectedUserForChat?.(user);
    // Close sidebar only on mobile screens
    setOpenMobile && setOpenMobile(false);
  };
  // active user style
  const isActiveUser = (user: Iuser) => {
    return selectedUserForChat?._id === user?._id;
  };

  return (
    <div className="w-full bg-slate-950 h-full">
      {/* Header */}
      <div className="p-4 bg-slate-900/50 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <MessageSquareText className="text-white w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">
              Global Chat
            </h2>
            <p className="text-xs text-slate-400">
              Connect with <span className="font-semibold text-indigo-400">{users.length}+</span> people worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="divide-y divide-white/5">
        {users.map((user, index) => (
          <div
            key={user?._id}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all duration-200 cursor-pointer border-l-4 ${isActiveUser(user)
              ? "bg-indigo-600/10 border-l-indigo-500"
              : "border-l-transparent"
              }`}
            onClick={() => handleSelectUser(user)}
          >
            <div className="relative">
              <Avatar user={user} onlineUsers={onlineUsers} />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-1.5">
                  <h3 className={`font-semibold text-sm truncate ${isActiveUser(user) ? "text-white" : "text-slate-200"}`}>
                    {user.username}
                  </h3>
                  {user.isVerified && (
                    <VerifiedIcon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-slate-500">
            <p>No contacts found</p>
            <p className="text-sm mt-1">Add some friends to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListUI;
