"use server";
import type { FormState } from "@/types/actions";
import { fetchApi } from "@/utils/apiFetch";

import { forgotPasswordSchema } from "@/validation/forgotPassword";

export async function forgotPasswordAction(_: FormState, formData: FormData): Promise<FormState> {
  const values = Object.fromEntries(formData.entries()) as Record<string, string>;
  const parsed = forgotPasswordSchema.safeParse(values);
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
    endpoint: "/auth/forgot-password",
    method: "POST",
    body: values,
  });

  if (!response.success) {
    return {
      success: false,
      message: response.message || "Something went wrong.",
    };
  } else {
    return {
      success: true,
      message: response.message,
    };
  }
}
