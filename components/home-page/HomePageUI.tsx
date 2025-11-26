"use client";
import Link from "next/link";
import { useChat } from "@/context/ChatProvider";
import { ArrowRight } from "lucide-react";
import { Footer } from "./Footer";
import Image from "next/image";
import FeaturesGrid from "./FeaturesGrid";
import MockupChat from "./MockupChat";
import LeftColumn from "./LeftColumn";

export default function HomePageUI() {
  const { logedinUser } = useChat() || {};

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden w-full flex flex-col">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-blue-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/icon.png" alt="logo" width={50} height={50} className="cursor-pointer" />
        </div>
        <div className="flex items-center gap-4">
          {!logedinUser && (
            <Link
              href="/login"
              className="hidden sm:block text-gray-300 hover:text-white transition-colors font-medium"
            >
              Sign In
            </Link>
          )}
          <Link
            href={logedinUser ? "/chat" : "/signup"}
            className="bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            {logedinUser ? "Open Chat" : "Get Started"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-6 pb-24 lg:pt-10 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Left Column: Content */}
          <LeftColumn />

          {/* Right Column: Visual Mockup */}
          <div className="relative lg:h-[600px] flex items-center justify-center perspective-1000">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
            {/* Chat Interface Mockup */}
            <MockupChat />
          </div>
        </div>

        {/* Features Grid */}
        <FeaturesGrid />
      </main>

      <Footer />
    </div>
  );
}
