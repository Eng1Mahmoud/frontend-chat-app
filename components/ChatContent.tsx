"use client";
import { useEffect, useState, useRef } from "react";
import ChatWelcom from "./ChatWelcom";
import ChatHeader from "./ChatHeader";
import { useChat } from "@/context/ChatProvider";
import SendMessage from "./SendMessage";
import { socket } from "@/socket";
import { getMessagesAction } from "@/actions/messageActions";
import { IMessage } from "@/types/apiFetch";
import { ChevronDown, Check, CheckCheck } from "lucide-react";

const ChatContent = () => {
  const { selectedUserForChat, logedinUser } = useChat() || {};
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);


  useEffect(() => {
    if (!selectedUserForChat) return;

    const fetchMessages = async () => {
      try {
        const res = await getMessagesAction(selectedUserForChat?._id);
        if (res.success && res.data) {
          setMessages(res.data);
          // Mark messages as read when opening chat
          const unreadMessages = res.data.filter(
            (msg: IMessage) => msg.sender === selectedUserForChat._id && msg.status !== "read"
          );
          if (unreadMessages.length > 0) {
            socket.emit("mark_as_read", { senderId: selectedUserForChat._id });
            // Optimistically update local state
            setMessages((prev) =>
              prev.map((msg) =>
                msg.sender === selectedUserForChat._id ? { ...msg, status: "read" } : msg
              )
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchMessages();

    const onReceiveMessage = (message: IMessage) => {
      const isFromSelectedUser = message.sender === selectedUserForChat?._id;
      const isToSelectedUser = message.receiver === selectedUserForChat?._id;
      if (isFromSelectedUser || isToSelectedUser) {
        setMessages((prev) => [...prev, message]);

        // If the message is from the selected user, mark it as read immediately
        if (isFromSelectedUser) {
          socket.emit("mark_as_read", { senderId: selectedUserForChat._id });
        }
      }
    };

    const onUserTyping = (data: { userId: string }) => {
      if (data.userId === selectedUserForChat?._id) {
        setIsOtherUserTyping(true);
      }
    };

    const onUserStoppedTyping = (data: { userId: string }) => {
      if (data.userId === selectedUserForChat?._id) {
        setIsOtherUserTyping(false);
      }
    };

    const onMessagesReadUpdate = (data: { receiverId: string, status: string }) => {
      if (data.receiverId === selectedUserForChat?._id) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.receiver === selectedUserForChat._id ? { ...msg, status: "read" } : msg
          )
        );
      }
    };

    socket.on("receive_message", onReceiveMessage);
    socket.on("user_typing", onUserTyping);
    socket.on("user_stopped_typing", onUserStoppedTyping);
    socket.on("messages_read_update", onMessagesReadUpdate);

    return () => {
      socket.off("receive_message", onReceiveMessage);
      socket.off("user_typing", onUserTyping);
      socket.off("user_stopped_typing", onUserStoppedTyping);
      socket.off("messages_read_update", onMessagesReadUpdate);
      setMessages([]);
      setIsOtherUserTyping(false);
    };
  }, [selectedUserForChat, logedinUser]);

  // Scroll to bottom when chat is first opened
  useEffect(() => {
    if (selectedUserForChat && messagesEndRef.current) {
      // Use setTimeout to ensure messages are rendered first
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
      }, 100);
    }
  }, [selectedUserForChat]);

  // Auto-scroll when new messages arrive (only if user is near bottom)
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Show scroll button when user is not at the bottom of the chat
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 200;
      setShowScrollToBottomButton(!isAtBottom);
    }
  };

  // Scroll to bottom when user clicks on scroll button
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-screen flex flex-col">
      {selectedUserForChat ? (
        <div className="flex-1 flex flex-col h-full">
          <ChatHeader isOtherUserTyping={isOtherUserTyping} />
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 relative bg-[url('/images/chat-bg.png')] bg-cover bg-center bg-no-repeat px-4 md:px-12"
            onScroll={handleScroll}

          >
            <div className="w-full h-full bg-black opacity-20 fixed top-0 left-0 right-0 bottom-0 z-[-1] pointer-events-none" />
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === logedinUser?._id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-2 px-3 pb-1 transition-all duration-200 relative ${msg.sender === logedinUser?._id
                    ? "bg-[#D9FDD3] dark:bg-[#056162] text-gray-900 dark:text-white shadow-sm rounded-lg rounded-tr-none"
                    : "bg-gray-200 dark:bg-[#1F2C34] text-gray-900 dark:text-white shadow-sm rounded-lg rounded-tl-none"
                    }`}
                >
                  {/* Tail for sent messages - top right */}
                  {msg.sender === logedinUser?._id && (
                    <div className="absolute top-0 right-0 w-[12px] h-[12px] bg-[#D9FDD3] dark:bg-[#056162]" ></div>
                  )}
                  {/* Tail for received messages - top left */}
                  {msg.sender !== logedinUser?._id && (
                    <div className="absolute top-0 left-0 w-[12px] h-[12px] bg-gray-200 dark:bg-[#1F2C34]" ></div>
                  )}
                  <p className="text-sm leading-5 mb-1">{msg.text}</p>
                  <div className="flex justify-end items-center gap-1">
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.sender === logedinUser?._id && (
                      <span className="ml-1">
                        {msg.status === "read" ? (
                          <CheckCheck className="w-4 h-4 text-blue-500" />
                        ) : msg.status === "delivered" ? (
                          <CheckCheck className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Check className="w-4 h-4 text-gray-500" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {showScrollToBottomButton && (
            <ChevronDown
              onClick={scrollToBottom}
              className="absolute bottom-[120px] right-2 w-9 h-9 p-1.5  bg-white dark:bg-[#202C33] shadow-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2A3942] transition-all duration-200 rounded-full cursor-pointer"

            />
          )}
          <div className="mt-auto">
            <SendMessage />
          </div>
        </div>
      ) : (
        <ChatWelcom />
      )
      }
    </div >
  );
};

export default ChatContent;
