import { CheckCircle2 } from "lucide-react";
import HeroCTA from "./HeroCTA";
import { Iuser } from "@/types/apiFetch";

const LeftColumn = ({ user }: { user: Iuser | null }) => {
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

      <HeroCTA user={user} />

      <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-gray-500 text-sm">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          <span className="text-white">Free Forever</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          <span className="text-white">No Credit Card</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          <span className="text-white">Secure Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default LeftColumn;
