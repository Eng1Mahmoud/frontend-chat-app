import ResetPasswordUI from "@/components/reset-password/ResetPasswordUI";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordUI />
    </Suspense>
  );
}
