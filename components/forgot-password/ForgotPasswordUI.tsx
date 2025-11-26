"use client";
import { useActionState } from "react";
import { forgotPasswordAction } from "@/actions/forgotPassword";
import type { FormState } from "@/types/actions";
import { Mail } from "lucide-react";
import { AuthHeader } from "../ui/auth/AuthHeader";
import { AuthAlert } from "../ui/auth/AuthAlert";
import { AuthInput } from "../ui/auth/AuthInput";
import { AuthButton } from "../ui/auth/AuthButton";
import { AuthFooter } from "../ui/auth/AuthFooter";

const initialState: FormState = { success: false };

export default function ForgotPasswordUI() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, initialState);

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AuthHeader
        title="Forgot Password?"
        subtitle="No worries, we'll send you reset instructions."
      />

      <form action={formAction} className="space-y-6">
        {state.message && (
          <AuthAlert message={state.message || ""} type={state.success ? "success" : "error"} />
        )}

        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          defaultValue={state.values?.email}
          error={state.fieldErrors?.email}
          icon={Mail}
          autoComplete="email"
        />

        <AuthButton isLoading={isPending} loadingText="Sending Link...">
          Send Reset Link
        </AuthButton>
      </form>

      <AuthFooter linkText="Back to Login" linkHref="/login" showArrow={true} />
    </div>
  );
}
