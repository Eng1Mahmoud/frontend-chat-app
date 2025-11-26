"use server";
import type { FormState } from "@/types/actions";
import { fetchApi } from "@/utils/apiFetch";
import { formDataToObject } from "@/utils/formDataToObject";
import { resetPasswordSchema } from "@/validation/resetPassword";
import { redirect } from "next/navigation";

export async function resetPasswordAction(_: FormState, formData: FormData): Promise<FormState> {
  const values = formDataToObject(formData);
  const parsed = resetPasswordSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (key) fieldErrors[key] = issue.message;
    }
    return {
      success: false,
      message: "Please fix the errors",
      fieldErrors,
      values,
    };
  }
  // send data to backend
  const response = await fetchApi<{ success: boolean; message: string }, typeof values>({
    endpoint: "/auth/reset-password",
    method: "POST",
    body: values,
  });

  if (!response.success) {
    return {
      success: false,
      message: response.message || "Something went wrong.",
    };
  }
  return {
    success: true,
    message: "Password reset successfully.",
  };
}
