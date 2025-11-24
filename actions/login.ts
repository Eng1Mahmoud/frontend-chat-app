"use server";
import type { FormState } from "@/types/actions";
import { loginResponse } from "@/types/apiRespons";
import { fetchApi } from "@/utils/apiFetch";
import { formDataToObject } from "@/utils/formDataToObject";
import { loginSchema } from "@/validation/login";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export async function loginAction(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const values = formDataToObject(formData);
  const parsed = loginSchema.safeParse(values);
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
  const response = await fetchApi<loginResponse, typeof values>({
    endpoint: "/auth/login",
    method: "POST",
    body: values,
  });
  if (!response.success) {
    return {
      success: false,
      message: response.message || "Login failed. Please try again.",
    };
  } else {
    // Set cookie
    const cookieStore = await cookies();
    const maxAge = 24 * 60 * 60; // 1 day in seconds
    cookieStore.set({
      name: "token",
      value: response.data!.token,
      httpOnly: false,
      maxAge: maxAge,
    });
    redirect("/chat");
  }
}
