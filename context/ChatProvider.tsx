"use client";
import { Iuser } from "@/types/apiFetch";
import { createContext, useContext, useState } from "react";

export const ChatContext = createContext<ChatContextType | null>(null);
interface ChatProviderProps {
  children: React.ReactNode;
}

interface ChatContextType {
  logedinUser: Iuser | null;
  changedLogedinUser: (user: Iuser | null) => void;
  selectedUserForChat: Iuser | null;
  changedSelectedUserForChat: (chat: Iuser | null) => void;
  onlineUsers: Set<string>;
  setOnlineUsers: React.Dispatch<React.SetStateAction<Set<string>>>;
}
const ChatProvider = ({ children }: ChatProviderProps) => {
  const [logedinUser, setLogedinUser] = useState<Iuser | null>(null);
  const [selectedUserForChat, setSelectedUserForChat] = useState<Iuser | null>(
    null
  );
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  // change logedinUser and selectedChat types as per your requirement
  const changedLogedinUser = (user: Iuser | null) => {
    setLogedinUser(user);
  };
  // similarly for selectedChat if needed
  const changedSelectedUserForChat = (chat: Iuser | null) => {
    setSelectedUserForChat(chat);
  };
  return (
    <ChatContext
      value={{
        logedinUser,
        changedLogedinUser,
        selectedUserForChat,
        changedSelectedUserForChat,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      {children}
    </ChatContext>
  );
};

export default ChatProvider;

const useChat = () => {
  const context = useContext(ChatContext);
  return context;
};

export { useChat };
