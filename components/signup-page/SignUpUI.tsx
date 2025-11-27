"use client";
import { useActionState } from "react";
import { signupAction } from "@/actions/signup";
import type { FormState } from "@/types/actions";
import { User, Mail, Lock } from "lucide-react";
import { AuthHeader } from "../Auth-UI/AuthHeader";
import { AuthAlert } from "../Auth-UI/AuthAlert";
import { AuthInput } from "../Auth-UI/AuthInput";
import { AuthButton } from "../Auth-UI/AuthButton";
import { AuthFooter } from "../Auth-UI/AuthFooter";

const initialState: FormState = { success: false };

export default function SignUpUI() {
  const [state, formAction, isPending] = useActionState(signupAction, initialState);

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AuthHeader
        title="Create your account"
        subtitle="Join ChatWave and start the conversation."
      />

      <form action={formAction} className="space-y-6">
        {state.message && (
          <AuthAlert message={state.message} type={state.success ? "success" : "error"} />
        )}

        <AuthInput
          id="username"
          name="username"
          type="text"
          label="Username"
          placeholder="alex"
          defaultValue={state.values?.username}
          error={state.fieldErrors?.username}
          icon={User}
          required
        />

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
          required
        />

        <AuthInput
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          error={state.fieldErrors?.password}
          icon={Lock}
          autoComplete="new-password"
          required
        />

        <AuthButton isLoading={isPending} loadingText="Creating...">
          Create account
        </AuthButton>
      </form>

      <AuthFooter text="Already have an account?" linkText="Sign in" linkHref="/login" />
    </div>
  );
}
