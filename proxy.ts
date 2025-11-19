// write proxy code below this line to redirect user to login page if not authenticated
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function proxy(request: NextRequest) {

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || token.value === "") {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();



}

export const config = {
  matcher: '/chat',
}