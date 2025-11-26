"use client";
import { useActionState } from "react";
import { loginAction } from "@/actions/login";
import type { FormState } from "@/types/actions";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { AuthHeader } from "../ui/auth/AuthHeader";
import { AuthAlert } from "../ui/auth/AuthAlert";
import { AuthInput } from "../ui/auth/AuthInput";
import { AuthButton } from "../ui/auth/AuthButton";
import { AuthFooter } from "../ui/auth/AuthFooter";

const initialState: FormState = { success: false };

export default function LoginPageUI() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AuthHeader title="Welcome back" subtitle="Sign in to continue chatting." />

      <form action={formAction} className="space-y-6">
        {state.message && (
          <AuthAlert message={state.message} type={state.success ? "success" : "error"} />
        )}

        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          defaultValue={state.values?.email}
          error={state.fieldErrors?.email}
          icon={Mail}
          autoComplete="email"
        />

        <AuthInput
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          error={state.fieldErrors?.password}
          icon={Lock}
          autoComplete="current-password"
          rightElement={
            <Link
              href="/forgot-password"
              className="text-xs text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Forgot?
            </Link>
          }
        />

        <AuthButton isLoading={isPending} loadingText="Signing in...">
          Sign in
        </AuthButton>
      </form>

      <AuthFooter text="New here?" linkText="Create an account" linkHref="/signup" />
    </div>
  );
}
