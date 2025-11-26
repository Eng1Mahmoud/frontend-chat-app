"use client";
import Link from "next/link";
import { useChat } from "@/context/ChatProvider";
import {
  MessageCircle,
  Shield,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function HomePageUI() {
  const { logedinUser } = useChat() || {};

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden w-full">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-blue-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
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
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              v1.0 is now live
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
              Connect with the <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
                World Instantly
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the future of messaging. Secure, fast, and designed for global connection. Join thousands of users chatting in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href={logedinUser ? "/chat" : "/signup"}
                className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Start Chatting Now
                <Zap className="w-5 h-5 fill-current" />
              </Link>
              {!logedinUser && (
                <Link
                  href="/login"
                  className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white rounded-2xl font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                >
                  Log In
                </Link>
              )}
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Secure Encryption</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="relative lg:h-[600px] flex items-center justify-center perspective-1000">
            {/* Abstract decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />

            {/* Chat Interface Mockup */}
            <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-500 ease-out">
              {/* Mockup Header */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold">
                    JS
                  </div>
                  <div>
                    <div className="font-semibold text-white">Jane Smith</div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      Online
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                </div>
              </div>

              {/* Mockup Body */}
              <div className="p-6 space-y-4 h-[350px] overflow-hidden relative">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-pink-500 to-rose-500 shrink-0" />
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none text-sm text-gray-200 max-w-[80%]">
                    Hey! Have you seen the new update? 🚀
                  </div>
                </div>
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-indigo-500 to-blue-500 shrink-0" />
                  <div className="bg-indigo-600 p-3 rounded-2xl rounded-tr-none text-sm text-white max-w-[80%] shadow-lg shadow-indigo-500/20">
                    Yeah! The new design looks absolutely stunning. ✨
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-pink-500 to-rose-500 shrink-0" />
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none text-sm text-gray-200 max-w-[80%]">
                    I love the glassmorphism effects!
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-pink-500 to-rose-500 shrink-0" />
                  <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Lightning Fast</h3>
            <p className="text-gray-400">Real-time message delivery with zero latency. Experience instant communication.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Secure & Private</h3>
            <p className="text-gray-400">End-to-end encryption ensures your conversations stay private and secure.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Global Reach</h3>
            <p className="text-gray-400">Connect with friends and family anywhere in the world without barriers.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
