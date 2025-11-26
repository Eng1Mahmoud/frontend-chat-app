"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { verifyEmailAction } from "@/actions/verifyEmail";
import { AuthHeader } from "../ui/auth/AuthHeader";
import { AuthAlert } from "../ui/auth/AuthAlert";
import { AuthButton } from "../ui/auth/AuthButton";

type Status = "idle" | "verifying" | "success" | "error";

function VerifyAccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Missing verification token in URL.");
        return;
      }

      setStatus("verifying");

      const result = await verifyEmailAction(token);

      if (result.success) {
        setStatus("success");
        setMessage(result.message);
      } else {
        setStatus("error");
        setMessage(result.message);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AuthHeader
        title="Verify your account"
        subtitle="We are confirming your email. This only takes a moment."
      />

      <div className="mt-6 space-y-4">
        {status === "verifying" && (
          <div className="p-3 rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-sm">
            Verifying your account…
          </div>
        )}

        {status === "success" && <AuthAlert message={message} type="success" />}
        {status === "error" && <AuthAlert message={message} type="error" />}

        {status === "success" ? (
          <AuthButton onClick={() => router.push("/login")}>Continue to sign in</AuthButton>
        ) : (
          <div className="flex items-center justify-between mt-4">
            <Link href="/signup" className="text-sm text-indigo-600 hover:text-indigo-700">
              Create a new account
            </Link>
            <Link
              href="/login"
              className="text-sm text-zinc-600 hover:text-zinc-800 dark:text-zinc-300"
            >
              Go to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyAccountUI() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyAccountContent />
    </Suspense>
  );
}
