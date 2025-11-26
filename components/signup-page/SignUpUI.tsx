"use client";
import Link from "next/link";
import { useActionState } from "react";
import { signupAction } from "@/actions/signup";
import type { FormState } from "@/types/actions";
const initialState: FormState = { success: false };
export default function SignUpUI() {
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Create your account
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
        Join ChatWave and start the conversation.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        {state.message && !state.success && (
          <div className="rounded-md bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 px-3 py-2 text-sm">
            {state.message}
          </div>
        )}
        {state.success && (
          <div className="rounded-md bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20 px-3 py-2 text-sm">
            {state.message ?? "Account created"}
          </div>
        )}
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="text-sm text-zinc-700 dark:text-zinc-300"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            defaultValue={state.values?.username}
            className="w-full rounded-lg border border-zinc-300/60 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2 outline-none ring-0 focus:border-indigo-500 focus:outline-none"
            placeholder="alex"
          />
          {state.fieldErrors?.username && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {state.fieldErrors.username}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm text-zinc-700 dark:text-zinc-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            className="w-full rounded-lg border border-zinc-300/60 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2 outline-none ring-0 focus:border-indigo-500 focus:outline-none"
            placeholder="you@example.com"
          />
          {state.fieldErrors?.email && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {state.fieldErrors.email}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm text-zinc-700 dark:text-zinc-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="w-full rounded-lg border border-zinc-300/60 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2 outline-none ring-0 focus:border-indigo-500 focus:outline-none"
            placeholder="••••••••"
          />
          {state.fieldErrors?.password && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {state.fieldErrors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-white shadow hover:bg-indigo-500 disabled:opacity-60"
        >
          {isPending ? "Creating…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-300">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-600 hover:text-indigo-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}
