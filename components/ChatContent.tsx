"use client";
import { useEffect, useState } from "react";
import ChatWelcom from "./ChatWelcom";
import ChatHeader from "./ChatHeader";
import { useChat } from "@/context/ChatProvider";
import SendMessage from "./SendMessage";
import { socket } from "@/socket";
import { getMessagesAction } from "@/actions/messageActions";
import { IMessage } from "@/types/apiFetch";

const ChatContent = () => {
  const { selectedUserForChat, logedinUser } = useChat() || {};
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!selectedUserForChat) return;
    // Fetch message history
    const fetchMessages = async () => {
      try {
        const res = await getMessagesAction(selectedUserForChat?._id);
        if (res.success && res.data) {
          setMessages(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();

    const onReceiveMessage = (message: IMessage) => {
      // 1. Check if the message is relevant to the OPEN chat this to prevent adding messages that come from other person while i chat with another person
      const isFromSelectedUser = message.sender === selectedUserForChat?._id;
      const isToSelectedUser = message.receiver === selectedUserForChat?._id;

      if (isFromSelectedUser || isToSelectedUser) {
        setMessages((prev) => [...prev, message]);
      }
    };
    socket.on("receive_message", onReceiveMessage);

    return () => {
      // remove event listeners
      socket.off("receive_message", onReceiveMessage);
      setMessages([]); // Clear messages when switching users or unmounting
    };
  }, [selectedUserForChat, logedinUser]);

  return (
    <div className="h-screen flex flex-col">
      {selectedUserForChat ? (
        <div className="flex-1 flex flex-col h-full">
          {/* Chat Header */}
          <ChatHeader />

          {/* Chat messages area - flex-1 to take remaining space */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === logedinUser?._id ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${msg.sender === logedinUser?._id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                    }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs opacity-70">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
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
