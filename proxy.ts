import type { NextRequest } from "next/server";
import runMiddlewares from "./middlewares/runMiddlewares";
import { authMiddleware } from "./middlewares/authMiddleware";

export async function proxy(request: NextRequest) {
  return await runMiddlewares(request, [authMiddleware]);
}
