"use client";
import { Iuser } from "@/types/apiFetch";
import { useChat } from "@/context/ChatProvider";
<<<<<<< HEAD
import { BadgeCheck } from "lucide-react";
=======
import { VerifiedIcon } from "lucide-react";
import { isUserOnline } from "@/utils/isUserOnline";
import { Avatar } from "../Avatar";
>>>>>>> feature/online-status-improvements
const UserListUI = ({ users }: { users: Iuser[] }) => {
  const { changedSelectedUserForChat, selectedUserForChat, onlineUsers = new Set<string>() } = useChat() || {};
  // handle select user for chat >>  store in global state (to be implemented)
  const handleSelectUser = (user: Iuser) => {
    changedSelectedUserForChat?.(user);
  };
  // active user style
  const isActiveUser = (user: Iuser) => {
    return selectedUserForChat?._id === user?._id;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold">Contacts</h2>
        <p className="text-sm text-muted-foreground">{users.length} contacts</p>
      </div>

      {/* Users List */}
      <div className="divide-y divide-border">
        {users.map((user, index) => (
          <div
<<<<<<< HEAD
            key={user._id}
            className={`flex items-center p-4 hover:bg-accent/50 transition-colors cursor-pointer ${isActiveUser(user) ? "bg-accent" : ""
              }`}
            onClick={() => handleSelectUser(user)}
          >
            {/* Avatar */}
            <div className="relative mr-3">
              <div
                className={`w-12 h-12 rounded-full ${getAvatarColor(index)} 
                                           flex items-center justify-center text-white font-medium`}
              >
                {getInitials(user.username)}
              </div>
            </div>

=======
            key={user?._id}
            className={`flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors cursor-pointer ${isActiveUser(user) ? "bg-accent" : ""
              }`}
            onClick={() => handleSelectUser(user)}
          >
            <Avatar user={user} onlineUsers={onlineUsers} />
>>>>>>> feature/online-status-improvements
            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-foreground truncate">
                  {user.username}
                </h3>
                {user.isVerified && (
<<<<<<< HEAD
                  <BadgeCheck className="w-4 h-4 text-blue-500" />
=======
                  <VerifiedIcon className="w-4 h-4 text-blue-500" />
>>>>>>> feature/online-status-improvements
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
<<<<<<< HEAD
=======

            {/* Status */}
            <div className="ml-3 text-right">
              <span
                className={`text-xs px-2 py-1 rounded ${isUserOnline(user?._id, onlineUsers)
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
              >
                {isUserOnline(user?._id, onlineUsers) ? "Online" : "Offline"}
              </span>
            </div>
>>>>>>> feature/online-status-improvements
          </div>
        ))}
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-muted-foreground">
            <p>No contacts found</p>
            <p className="text-sm mt-1">Add some friends to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListUI;
