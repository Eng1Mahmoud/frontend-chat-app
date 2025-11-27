"use client";
import { useSendMessage } from "@/hooks/useSendMessage";

const SendMessage = () => {
  const {
    message,
    textareaRef,
    handleInputChange,
    handleSendMessage,
    handleKeyPress,
  } = useSendMessage();

  return (
    <div className="bg-transparent p-3 sticky bottom-0 z-10">
      <div className="relative max-w-4xl mx-auto">
        {/* Main input container */}
        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl shadow-sm transition-all focus-within:border-indigo-500/50 focus-within:bg-slate-800/80">
          <div className="flex items-end space-x-2 p-2">
            {/* Message input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="w-full bg-transparent border-none outline-none resize-none text-white placeholder-slate-400 text-[15px] leading-relaxed max-h-[120px] overflow-y-auto px-2 py-2"
                rows={1}
                style={{ minHeight: "24px" }}
              />
            </div>

            {/* Send button */}
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${message.trim()
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                }`}
            >
              {message.trim() ? (
                <svg
                  className="w-5 h-5 transform rotate-45 -translate-x-px translate-y-px"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
