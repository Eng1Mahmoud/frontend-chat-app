"use client";
import ChatWelcom from "@/components/chat-page/ChatWelcom";
import ChatHeader from "@/components/chat-page/ChatHeader";
import { useChat } from "@/context/ChatProvider";
import SendMessage from "@/components/chat-page/SendMessage";
import { ChevronDown } from "lucide-react";
import FindFriends from "@/components/chat-page/FindFriends";
import MessagesList from "@/components/chat-page/MessagesList";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useChatScroll } from "@/hooks/useChatScroll";

const ChatContent = () => {
  const { selectedUserForChat } = useChat() || {};
  const { messages, isOtherUserTyping } = useChatMessages();
  const {
    messagesEndRef,
    messagesContainerRef,
    showScrollToBottomButton,
    handleScroll,
    scrollToBottom,
  } = useChatScroll(messages, selectedUserForChat);

  return (
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
      {selectedUserForChat ? (
        <div className="flex-1 flex flex-col h-full min-h-0 relative bg-[url('/images/chat-bg.png')] bg-cover bg-center bg-fixed ">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-950/90 z-0" />

          <div className="relative z-10 flex-1 flex flex-col h-full min-h-0">
            <ChatHeader isOtherUserTyping={isOtherUserTyping} />

            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 pt-24 space-y-6 relative px-4 md:px-12 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent "
              onScroll={handleScroll}
            >
              <MessagesList
                messages={messages}
                messagesEndRef={messagesEndRef}
                isTyping={isOtherUserTyping}
              />
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

            <div className="mt-auto shrink-0 relative z-20 bg-slate-950/80 backdrop-blur-md border-t border-white/5">
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
