"use client";
import { useActionState } from "react";
import { forgotPasswordAction } from "@/actions/forgotPassword";
import type { FormState } from "@/types/actions";
import { Mail } from "lucide-react";
import { AuthHeader } from "../Auth-UI/AuthHeader";
import { AuthAlert } from "../Auth-UI/AuthAlert";
import { AuthInput } from "../Auth-UI/AuthInput";
import { AuthButton } from "../Auth-UI/AuthButton";
import { AuthFooter } from "../Auth-UI/AuthFooter";

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
