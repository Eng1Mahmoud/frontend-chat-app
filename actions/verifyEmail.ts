"use server";

export async function verifyEmailAction(token: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${encodeURIComponent(token)}`;
    const res = await fetch(url);
    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      return {
        success: true,
        message: data.message || "Your account has been verified successfully.",
      };
    } else {
      return {
        success: false,
        message: data.error || data.message || "Verification failed. Please try again.",
      };
    }
  } catch {
    return {
      success: false,
      message: "Could not reach the server. Please try again later.",
    };
  }
}
