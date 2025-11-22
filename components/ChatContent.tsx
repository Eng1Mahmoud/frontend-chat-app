"use client";
import ChatWelcom from "./ChatWelcom";
import ChatHeader from "./ChatHeader";
import { useChat } from "@/context/ChatProvider";
import SendMessage from "./SendMessage";

const ChatContent = () => {
  const { selectedUserForChat } = useChat() || {};
  
  return (
    <div className="h-screen flex flex-col">
      {selectedUserForChat ? (
        <div className="flex-1 flex flex-col h-full">
          {/* Chat Header */}
          <ChatHeader />
          
          {/* Chat messages area - flex-1 to take remaining space */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Messages will go here */}
          
          </div>

          {/* Send message input - fixed at bottom */}
          <div className="mt-auto">
            <SendMessage />
          </div>
        </div>
      ) : (
        <ChatWelcom />
      )}
    </div>
  );
};

export default ChatContent;
