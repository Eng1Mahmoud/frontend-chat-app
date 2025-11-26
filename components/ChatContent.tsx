"use client";
import { useEffect, useState, useRef } from "react";
import ChatWelcom from "./ChatWelcom";
import ChatHeader from "./ChatHeader";
import { useChat } from "@/context/ChatProvider";
import SendMessage from "./SendMessage";
import { socket } from "@/socket";
import { getMessagesAction } from "@/actions/messageActions";
import { IMessage } from "@/types/apiFetch";
import { ChevronDown, Check, CheckCheck, UserRoundSearch } from "lucide-react";
import FindFriends from "./chat-page/FindFriends";
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
    <div className="h-screen flex flex-col bg-slate-950">
      {selectedUserForChat ? (
        <div className="flex-1 flex flex-col h-full relative bg-[url('/images/chat-bg.png')] bg-cover bg-center bg-fixed ">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-950/90 z-0" />

          <div className="relative z-10 flex-1 flex flex-col h-full">
            <ChatHeader isOtherUserTyping={isOtherUserTyping} />

            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-6 relative px-4 md:px-12 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent "
              onScroll={handleScroll}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === logedinUser?._id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] md:max-w-[60%] p-4 rounded-4xl shadow-sm relative group transition-all duration-200 ${msg.sender === logedinUser?._id
                      ? "bg-linear-to-br from-indigo-600 to-purple-600 text-white  rounded-tr-none"
                      : "bg-slate-800/80 backdrop-blur-sm border border-white/5 text-gray-100  rounded-tl-none"
                      }`}
                  >
                    <p className="text-[15px] leading-relaxed mb-1.5">{msg.text}</p>
                    <div className={`flex items-center gap-1.5 text-[11px] ${msg.sender === logedinUser?._id ? "justify-end text-indigo-100/70" : "justify-start text-slate-400"
                      }`}>
                      <span>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {msg.sender === logedinUser?._id && (
                        <span className="ml-0.5">
                          {msg.status === "read" ? (
                            <CheckCheck className="w-3.5 h-3.5 text-blue-200" />
                          ) : msg.status === "delivered" ? (
                            <CheckCheck className="w-3.5 h-3.5 text-indigo-200/70" />
                          ) : (
                            <Check className="w-3.5 h-3.5 text-indigo-200/70" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* Sidebar toggle button - Find Friends */}
            <FindFriends />

            {showScrollToBottomButton && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-24 right-6 w-10 h-10 bg-slate-800 hover:bg-slate-700 text-white shadow-lg shadow-black/20 rounded-full flex items-center justify-center transition-all duration-200 border border-white/10 z-20"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            )}

            <div className="mt-auto relative z-20 bg-slate-950/80 backdrop-blur-md border-t border-white/5">
              <SendMessage />
            </div>
          </div>
        </div>
      ) : (
        <ChatWelcom />
      )}
    </div>
  );
};

export default ChatContent;
