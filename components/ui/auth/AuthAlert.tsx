import { AlertCircle, CheckCircle2 } from "lucide-react";

interface AuthAlertProps {
  message: string;
  type: "success" | "error";
}

export function AuthAlert({ message, type }: AuthAlertProps) {
  if (!message) return null;

  const isSuccess = type === "success";

  return (
    <div
      className={`p-3 rounded-lg border flex items-start gap-3 text-sm animate-in fade-in slide-in-from-top-2 ${
        isSuccess
          ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
          : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="h-5 w-5 shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 shrink-0" />
      )}
      <p>{message}</p>
    </div>
  );
}
