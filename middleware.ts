import { NextRequest, NextResponse } from "next/server";
import { appConfig } from "@/services/config";
import { AUTH_COOKIE_KEY } from "@/utils/auth";

export function middleware(request: NextRequest) {
  if (appConfig.useMockAuth) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_KEY)?.value;
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/task-3");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/task-3/:path*"],
};
