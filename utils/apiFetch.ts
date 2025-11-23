import type { ApiResponse, IFetch } from "@/types/apiFetch";
import { cookies } from "next/headers";
export async function fetchApi<R, I>({
  endpoint,
  method,
  body,
  params,
}: IFetch<I | undefined | null>): Promise<ApiResponse<R>> {
  try {
    const token = (await cookies()).get("token")?.value;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    const apiUrl = `${baseUrl}${endpoint}`;
    if (params) {
      // params is an object key-value pairs
      const queryString = new URLSearchParams(params).toString();
      apiUrl.concat(`?${queryString}`);
    }
    const res = await fetch(`${apiUrl}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),

    });
    if (!res.ok) {
      try {
        const errorData = await res.json();
        return {
          success: false,
          message:
            errorData.message || `Error: ${res.status} ${res.statusText}`,
        };
      } catch {
        return {
          success: false,
          message: `Error: ${res.status} ${res.statusText}`,
        };
      }
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Success",
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}