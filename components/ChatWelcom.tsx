"use client";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import { MessageSquareText, Globe, Users, Zap } from "lucide-react";

const ChatWelcom = () => {
  const { setOpenMobile } = useSidebar() || {};
  return (
    <div className="flex flex-col items-center justify-center h-screen relative overflow-hidden bg-slate-950 text-white w-full">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Welcome icon */}
        <div className="mb-8 relative inline-block">
          <div className="w-24 h-24 mx-auto bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-500/25 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <MessageSquareText className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          {/* Floating decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/30 rounded-full animate-bounce delay-100 backdrop-blur-sm border border-white/10"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-indigo-500/30 rounded-full animate-bounce delay-300 backdrop-blur-sm border border-white/10"></div>
        </div>

        {/* Welcome text */}
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-indigo-200 to-purple-200">
            Welcome to ChatApp
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Connect with friends, family, and colleagues instantly. <br />
            Secure, fast, and beautiful.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <Globe className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
            <span className="text-sm text-gray-300">Global Reach</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <span className="text-sm text-gray-300">Instant Sync</span>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-4">
          {/* Mobile: Show button to open sidebar */}
          <Button
            onClick={() => setOpenMobile?.(true)}
            className="md:hidden w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-6 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-105"
          >
            <Users className="w-5 h-5 mr-2" />
            Start Chatting
          </Button>

          {/* Desktop: Show instruction text */}
          <div className="hidden md:flex items-center justify-center gap-2 p-4 bg-indigo-900/20 backdrop-blur-sm rounded-xl border border-indigo-500/20 text-indigo-200">
            <span className="animate-pulse">👈</span>
            <p className="text-sm font-medium">
              Select a conversation to start messaging
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWelcom;
