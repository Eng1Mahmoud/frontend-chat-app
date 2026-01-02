"use client";
import Link from "next/link";
import { useChat } from "@/context/ChatProvider";
import { Zap } from "lucide-react";

const HeroCTA = () => {
    const { logedinUser } = useChat() || {};
    return (
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
    );
};

export default HeroCTA;
