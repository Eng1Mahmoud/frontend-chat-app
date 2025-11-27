"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { MessageSquareText, Users } from "lucide-react";

const ChatWelcom = () => {
  const { setOpenMobile } = useSidebar() || {};

  return (
    <div className="flex flex-col items-center justify-center h-screen relative overflow-hidden bg-slate-950 text-white w-full">
      {/*  Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[140px] animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-[40%] left-[50%] w-[30%] h-[30%] bg-pink-500/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-[20%] left-[10%] w-2 h-2 bg-indigo-400/40 rounded-full animate-bounce"
          style={{ animationDuration: "3s", animationDelay: "0s" }}
        />
        <div
          className="absolute top-[60%] right-[15%] w-2 h-2 bg-purple-400/40 rounded-full animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-[30%] left-[20%] w-2 h-2 bg-pink-400/40 rounded-full animate-bounce"
          style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        {/* Welcome icon with enhanced styling */}
        <div className="mb-10 relative inline-block">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-50 animate-pulse" />

            {/* Main icon container */}
            <div className="relative w-28 h-28 mx-auto bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/30 transform hover:scale-110 hover:rotate-6 transition-all duration-500">
              <MessageSquareText
                className="w-14 h-14 text-white drop-shadow-lg"
                strokeWidth={1.5}
              />
              {/* floating decorative elements */}
              <div
                className="absolute -top-6 -right-6 w-10 h-10 bg-purple-500/20 rounded-full animate-bounce backdrop-blur-md border border-purple-400/30"
                style={{ animationDelay: "0.1s", animationDuration: "2s" }}
              />
              <div
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-indigo-500/20 rounded-full animate-bounce backdrop-blur-md border border-indigo-400/30"
                style={{ animationDelay: "0.3s", animationDuration: "2.5s" }}
              />
              <div
                className="absolute top-0 left-0 w-6 h-6 bg-pink-500/20 rounded-full animate-bounce backdrop-blur-md border border-pink-400/30"
                style={{ animationDelay: "0.5s", animationDuration: "3s" }}
              />
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <div className="mb-10 space-y-5">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-indigo-200 to-purple-200 leading-tight animate-fade-in">
            Welcome to World Chat App
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg mx-auto">
            Connect with friends, family, and colleagues instantly.
            <span className="block mt-2 text-indigo-300 font-medium">
              Secure, fast, and beautiful.
            </span>
          </p>
        </div>

        <div className="mt-8">
          {/* Mobile: button */}
          <Button
            onClick={() => setOpenMobile?.(true)}
            className="md:hidden w-full bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold py-7 rounded-2xl shadow-2xl shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50 active:scale-95 relative overflow-hidden group"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <Users className="w-5 h-5 mr-2 relative z-10" />
            <span className="relative z-10">Start Chatting</span>
          </Button>

          {/* Desktop: instruction */}
          <div className="hidden md:flex items-center justify-center gap-3 p-5 bg-linear-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-md rounded-2xl border border-indigo-500/30 text-indigo-200 shadow-lg hover:shadow-xl hover:border-indigo-400/50 transition-all duration-300">
            <span className="text-2xl animate-pulse">👈</span>
            <p className="text-base font-medium">Select a conversation to start messaging</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWelcom;
