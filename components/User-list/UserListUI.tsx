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
    <div className="w-full bg-white dark:bg-[#111B21]">
      {/* Header */}
      <div className="p-4 bg-[#F0F2F5] dark:bg-[#202C33] border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
            <MessageSquareText color="white" size={15} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Global Chat
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Connect with <span className="font-semibold text-[#25D366]">{users.length}+</span> people worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {users.map((user, index) => (
          <div
            key={user?._id}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#202C33] transition-all duration-200 cursor-pointer border-l-4 ${isActiveUser(user)
              ? "bg-[#F0F2F5] dark:bg-[#2A3942] border-l-[#25D366]"
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
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                    {user.username}
                  </h3>
                  {user.isVerified && (
                    <VerifiedIcon className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  )}
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">
                  {/* Timestamp placeholder */}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
                {/* Unread count badge placeholder */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-gray-500 dark:text-gray-400">
            <p>No contacts found</p>
            <p className="text-sm mt-1">Add some friends to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListUI;
