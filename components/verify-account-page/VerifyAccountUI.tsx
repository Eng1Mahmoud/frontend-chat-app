"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { verifyEmailAction } from "@/actions/verifyEmail";

type Status = "idle" | "verifying" | "success" | "error";

// Reusable Alert Component
const Alert = ({ type, children }: { type: "info" | "success" | "error"; children: React.ReactNode }) => {
    const styles = {
        info: "border-indigo-500/20 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
        success: "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400",
        error: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
    };

    return (
        <div className={`rounded-md border px-3 py-2 text-sm ${styles[type]}`}>
            {children}
        </div>
    );
};

// Page Header Component
const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {title}
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{subtitle}</p>
    </>
);

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
        <div>
            <PageHeader
                title="Verify your account"
                subtitle="We are confirming your email. This only takes a moment."
            />

            <div className="mt-6 space-y-4">
                {status === "verifying" && <Alert type="info">Verifying your account…</Alert>}
                {status === "success" && <Alert type="success">{message}</Alert>}
                {status === "error" && <Alert type="error">{message}</Alert>}

                {status === "success" ? (
                    <button
                        onClick={() => router.push("/login")}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-white shadow hover:bg-indigo-500 transition-colors"
                    >
                        Continue to sign in
                    </button>
                ) : (
                    <div className="flex items-center justify-between">
                        <Link href="/signup" className="text-sm text-indigo-600 hover:text-indigo-700">
                            Create a new account
                        </Link>
                        <Link href="/login" className="text-sm text-zinc-600 hover:text-zinc-800 dark:text-zinc-300">
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
            <PageHeader title="Verify your account" subtitle="Loading verification..." />
            <div className="mt-6">
                <Alert type="info">Preparing verification...</Alert>
            </div>
        </div>
    );
}

export default function VerifyAccountUI() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <VerifyAccountContent />
        </Suspense>
    );
}
