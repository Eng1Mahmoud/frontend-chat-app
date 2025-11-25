import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Auth • Chat App",
  description: "Sign in to your account or create a new one.",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-dvh grid md:grid-cols-2 bg-zinc-50 dark:bg-zinc-950 w-full">
      {/* Left brand panel */}
      <div className="relative hidden md:flex items-center justify-center overflow-hidden p-8">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20" />
        <svg
          className="absolute -top-24 -left-24 h-144 w-xl text-indigo-500/20 blur-3xl"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M45.4,-54.2C57.7,-43.6,64.7,-28.6,68.5,-12.7C72.3,3.2,72.8,20.1,65.5,34.2C58.1,48.2,43,59.4,26.4,64.5C9.8,69.6,-8.3,68.7,-24.4,62.5C-40.5,56.2,-54.6,44.5,-63,29.2C-71.4,13.9,-74.1,-5,-67.9,-20.9C-61.8,-36.8,-47,-49.7,-31.1,-60.1C-15.2,-70.5,1.8,-78.4,16.4,-75.7C30.9,-72.9,42.9,-59.6,45.4,-54.2Z"
            transform="translate(100 100)"
          />
        </svg>
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur flex items-center justify-center shadow-lg ring-1 ring-black/5">
            <span className="text-2xl">💬</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome to ChatWave
          </h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            Real-time conversations with a beautiful, modern interface.
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-zinc-50 dark:from-zinc-950" />
      </div>

      {/* Right form panel */}
      <div className="relative flex min-h-dvh items-center justify-center p-6">
        <div className="absolute inset-0 md:hidden bg-linear-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="relative z-10 w-full max-w-md">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
          <div className="rounded-2xl border border-zinc-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-6 shadow-xl">
            {children}
          </div>
          <p className="mt-6 text-center text-xs text-zinc-500">
            By continuing you agree to our
            <Link href="#" className="mx-1 underline">Terms</Link>
            and
            <Link href="#" className="ml-1 underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
