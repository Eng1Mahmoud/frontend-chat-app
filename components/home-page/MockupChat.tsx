const MockupChat = () => {
  return (
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

      {/* Mockup chat body */}
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
  );
};

export default MockupChat;
