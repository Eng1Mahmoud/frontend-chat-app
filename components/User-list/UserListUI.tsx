"use client";
import { Iuser } from "@/types/apiFetch";
import { useChat } from "@/context/ChatProvider";
import { BadgeCheck } from "lucide-react";
const UserListUI = ({ users }: { users: Iuser[] }) => {
  const { changedSelectedUserForChat, selectedUserForChat } = useChat() || {};
  // Function to get initials from username
  const getInitials = (username: string) => {
    return username?.slice(0, 2).toUpperCase();
  };

  // Function to get a color based on index
  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-orange-500",
    ];
    return colors[index % colors.length];
  };

  // handle select user for chat >>  store in global state (to be implemented)
  const handleSelectUser = (user: Iuser) => {
    changedSelectedUserForChat?.(user);
  };
  // active user style
  const isActiveUser = (user: Iuser) => {
    return selectedUserForChat?._id === user._id;
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

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-foreground truncate">
                  {user.username}
                </h3>
                {user.isVerified && (
                  <BadgeCheck className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
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
