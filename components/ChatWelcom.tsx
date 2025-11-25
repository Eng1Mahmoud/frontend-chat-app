"use client";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import { MessageSquareText, Globe, Users } from "lucide-react";

const ChatWelcom = () => {
  const { setOpenMobile } = useSidebar() || {};
  return (
    <div className="flex flex-col items-center justify-center h-screen  relative overflow-hidden bg-gray-200 " >
      {/* Main content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Welcome icon */}
        <div className="mb-6 relative">
          <div className="w-24 h-24 mx-auto bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
            <MessageSquareText className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          {/* Floating decorative elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#25D366]/30 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-[#25D366]/20 rounded-full animate-bounce delay-75"></div>
        </div>

        {/* Welcome text */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Welcome to Global Chat
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
            Connect with people from around the world instantly
          </p>

          {/* Features */}
          <div className="space-y-3 mt-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <Globe className="w-5 h-5 text-[#25D366]" />
              <span>Chat with anyone, anywhere</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <Users className="w-5 h-5 text-[#25D366]" />
              <span>Real-time messaging</span>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-8">
          {/* Mobile: Show button to open sidebar */}
          <Button
            onClick={() => setOpenMobile?.(true)}
            className="md:hidden w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium py-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <Users className="w-5 h-5 mr-2" />
            Open User List
          </Button>

          {/* Desktop: Show instruction text */}
          <div className="hidden md:block p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              👈 Select a user from the sidebar to start chatting
            </p>
          </div>
        </div>


        {/* Decorative dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-[#25D366]/30 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-[#25D366]/50 rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-[#25D366]/30 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatWelcom;
