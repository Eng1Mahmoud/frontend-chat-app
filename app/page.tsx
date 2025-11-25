"use client";
import Link from "next/link";
import { useChat } from "@/context/ChatProvider";
export default function Home() {
  const { logedinUser } = useChat() || {};
  console.log(logedinUser);
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-slate-900 flex items-center justify-center p-6 w-full">
      <div className="max-w-4xl mx-auto text-center">

        {/* Hero Section */}
        <div className="space-y-12">

          {/* Logo */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
              Connect with the
              <span className="block mt-2">World Instantly</span>
            </h1>
            <p className="text-md md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Join thousands of people chatting globally in real-time.
              <span className="block mt-2 text-blue-300 font-semibold">
                Simple • Fast • Secure
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          {
            logedinUser ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/chat"
                  className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Go to Chat
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </Link>

                <Link
                  href="/login"
                  className="w-full sm:w-auto bg-transparent border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  Sign In
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
