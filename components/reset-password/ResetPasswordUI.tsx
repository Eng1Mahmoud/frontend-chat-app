"use client";
import Link from "next/link";
import { useActionState } from "react";
import { resetPasswordAction } from "@/actions/resetPassword";
import type { FormState } from "@/types/actions";
import { useSearchParams } from "next/navigation";
import { Lock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { AuthHeader } from "../ui/auth/AuthHeader";
import { AuthAlert } from "../ui/auth/AuthAlert";
import { AuthInput } from "../ui/auth/AuthInput";
import { AuthButton } from "../ui/auth/AuthButton";
import { AuthFooter } from "../ui/auth/AuthFooter";

const initialState: FormState = { success: false };

export default function ResetPasswordUI() {
  const [state, formAction, isPending] = useActionState(resetPasswordAction, initialState);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
        <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Invalid Request
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
            Missing or invalid reset token. Please request a new password reset link.
          </p>
        </div>
        <Link
          href="/forgot-password"
          className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 py-2"
        >
          Go to Forgot Password
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AuthHeader
        title="Reset Password"
        subtitle="Enter your new password below to secure your account."
      />

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="token" value={token} />

        {state.message && !state.success && <AuthAlert message={state.message} type="error" />}

        {state.success ? (
          <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex flex-col items-center gap-3 text-green-600 dark:text-green-400">
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="text-sm font-medium">{state.message}</div>
            </div>
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 hover:shadow-indigo-500/30 transition-all duration-200"
            >
              Go to Login <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <AuthInput
              id="password"
              name="password"
              type="password"
              label="New Password"
              placeholder="••••••••"
              error={state.fieldErrors?.password}
              icon={Lock}
            />

            <AuthInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              error={state.fieldErrors?.confirmPassword}
              icon={Lock}
            />

            <AuthButton isLoading={isPending} loadingText="Resetting...">
              Reset Password
            </AuthButton>
          </div>
        )}
      </form>

      {!state.success && <AuthFooter linkText="Back to Login" linkHref="/login" showArrow={true} />}
    </div>
  );
}
