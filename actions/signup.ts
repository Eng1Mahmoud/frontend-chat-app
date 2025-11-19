"use server";
import type { FormState } from "@/types/actions";
import { apiRespons } from "@/types/apiRespons";
import { fetchApi } from "@/utils/apiFetch";
import { formDataToObject } from "@/utils/formDataToObject";
import { signupSchema } from "@/validation/signup";

export async function signupAction(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const values = formDataToObject(formData);
  const parsed = signupSchema.safeParse(values);
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
  const response = await fetchApi<apiRespons, typeof values>({
    endpoint: "/users/signup",
    method: "POST",
    body: values,
  });
  if (!response.success) {
    return {
      success: false,
      message: response.message || "Signup failed. Please try again.",
    };
  } else {
    return {
      success: true,
      message: response.message || "Signup successful.",
    };
  }
}
