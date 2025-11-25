import { type RouteConfig } from "@/types/authRoute";
export const routes: RouteConfig[] = [
  { path: ["/login", "/signup", "/VerifyAccount"], roles: ["guest"] },
  { path: ["/chat"], roles: ["user"] },
];