import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes } from "./helper/RolesAndRoutes";
import type { Role } from "@/types/authRoute";
import { cookies } from "next/headers";

export async function authMiddleware(
    request: NextRequest,
    response: NextResponse | null,
): Promise<NextResponse | null> {
    const { pathname } = request.nextUrl;
    let userRole: Role = "guest";
    let token = (await cookies()).get("token")?.value;

    // check if token exists
    if (token) {
        userRole = "user";
    }
    // check if route exists and user is authorized
    const route = routes.find((route) => route.path.includes(pathname));
    if (!route) return response || NextResponse.next(); // if no route found, continue to next middleware
    // check if user is authorized
    if (!route.roles.includes(userRole)) {
        return NextResponse.redirect(new URL(`/`, request.url)); //if route found but user is not authorized, redirect to home
    }
    // if user is authorized, continue to next middleware
    return response || NextResponse.next();
}