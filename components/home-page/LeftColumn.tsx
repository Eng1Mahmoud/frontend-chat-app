import { CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import { useChat } from "@/context/ChatProvider";
const LeftColumn = () => {
  const { logedinUser } = useChat() || {};
  return (
    <div className="space-y-8 text-center lg:text-left">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium animate-fade-in-up">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        v1.0 is now live
      </div>

      <h1 className="text-3xl md:text-7xl font-bold tracking-tight leading-tight">
        Connect with the <br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
          World Instantly
        </span>
      </h1>

      <p className="text-md text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
        Experience the future of messaging. Secure, fast, and designed for global connection. Join
        thousands of users chatting in real-time.
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
  );
};

export default LeftColumn;
