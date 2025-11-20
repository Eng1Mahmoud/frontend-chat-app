"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type Status = "idle" | "verifying" | "success" | "error";

function VerifyAccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token"), [searchParams]);

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Missing token in URL.");
        return;
      }
      setStatus("verifying");
      setMessage("");
      try {
        const url = `${
          process.env.NEXT_PUBLIC_API_URL
        }/auth/verify-email?token=${encodeURIComponent(token)}`;
        const res = await fetch(url, { method: "GET" });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setStatus("error");
          setMessage(
            data.error || data.message || "Verification failed. Try again."
          );
          return;
        }

        setStatus("success");
        setMessage(
          data.message || "Your account has been verified successfully."
        );
      } catch (_err) {
        setStatus("error");
        setMessage("Could not reach the server. Please try again later.");
      }
    };

    verify();
  }, [token]);

  const onGoToLogin = () => router.push("/login");

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Verify your account
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
        We are confirming your email. This only takes a moment.
      </p>

      <div className="mt-6 space-y-4">
        {status === "verifying" && (
          <div className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-3 py-2 text-sm text-indigo-700 dark:text-indigo-300">
            Verifying your account…
          </div>
        )}

        {status === "success" && (
          <div className="rounded-md border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400">
            {message}
          </div>
        )}

        {status === "error" && (
          <div className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
            {message}
          </div>
        )}

        {status === "success" ? (
          <button
            onClick={onGoToLogin}
            className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-white shadow hover:bg-indigo-500"
          >
            Continue to sign in
          </button>
        ) : (
          <div className="flex items-center justify-between">
            <Link
              href="/signup"
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
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

function LoadingFallback() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Verify your account
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
        Loading verification...
      </p>
      <div className="mt-6">
        <div className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-3 py-2 text-sm text-indigo-700 dark:text-indigo-300">
          Preparing verification...
        </div>
      </div>
    </div>
  );
}

export default function VerifyAccountPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyAccountContent />
    </Suspense>
  );
}
