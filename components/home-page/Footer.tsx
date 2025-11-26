export function Footer() {
  return (
    <footer className="relative z-10 py-8 text-center text-sm text-gray-500 border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">World Chat App</span>. All rights reserved.
        </p>
        <p className="mt-2">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/Eng1Mahmoud"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Mahmoud Mohamed
          </a>
        </p>
      </div>
    </footer>
  );
}
