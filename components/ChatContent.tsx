"use client";
import { useEffect, useState, useRef } from "react";
import ChatWelcom from "./ChatWelcom";
import ChatHeader from "./ChatHeader";
import { useChat } from "@/context/ChatProvider";
import SendMessage from "./SendMessage";
import { socket } from "@/socket";
import { getMessagesAction } from "@/actions/messageActions";
import { IMessage } from "@/types/apiFetch";
import { ChevronDown, ChevronUp } from "lucide-react";

const ChatContent = () => {
  const { selectedUserForChat, logedinUser } = useChat() || {};
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

  useEffect(() => {
    if (!selectedUserForChat) return;
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
      const isFromSelectedUser = message.sender === selectedUserForChat?._id;
      const isToSelectedUser = message.receiver === selectedUserForChat?._id;
      if (isFromSelectedUser || isToSelectedUser) {
        setMessages((prev) => [...prev, message]);
      }
    };
    socket.on("receive_message", onReceiveMessage);

    return () => {
      socket.off("receive_message", onReceiveMessage);
      setMessages([]);
    };
  }, [selectedUserForChat, logedinUser]);

  useEffect(() => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 200) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  // Show scroll button when user is not at the bottom of the chat
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10;
      setShowScrollToBottomButton(!isAtBottom);
      setShowScrollToTopButton(isAtBottom);
    }
  };

  // Scroll to bottom when user clicks on scroll button
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    messagesContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="h-screen flex flex-col">
      {selectedUserForChat ? (
        <div className="flex-1 flex flex-col h-full">
          <ChatHeader />
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:[width:0px] relative bg-[url('/images/chat-bg.png')] bg-cover bg-center bg-no-repeat"
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
                    <div className="absolute -top-0 -right-0 w-[12px] h-[12px] bg-[#D9FDD3] dark:bg-[#056162]" ></div>
                  )}
                  {/* Tail for received messages - top left */}
                  {msg.sender !== logedinUser?._id && (
                    <div className="absolute -top-0 -left-0 w-[12px] h-[12px] bg-gray-200 dark:bg-[#1F2C34]" ></div>
                  )}
                  <p className="text-sm leading-5 mb-1">{msg.text}</p>
                  <div className="flex justify-end items-center gap-1">
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {showScrollToBottomButton && (
            <ChevronDown
              onClick={scrollToBottom}
              className="absolute bottom-[80px] right-4 w-11 h-11 p-2.5 bg-white dark:bg-[#202C33] shadow-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2A3942] transition-all duration-200 rounded-full cursor-pointer"
            />
          )}
          {showScrollToTopButton && (
            <ChevronUp
              onClick={scrollToTop}
              className="absolute bottom-[140px] right-4 w-11 h-11 p-2.5 bg-white dark:bg-[#202C33] shadow-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2A3942] transition-all duration-200 rounded-full cursor-pointer"
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
