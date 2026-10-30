import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "./utils/constant";
import { verifyFirebaseToken } from "./utils/firebase";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isAuthRoute = ["/login", "/sign-up"].includes(req.nextUrl.pathname);

  let isAuthenticated = false;

  if (token) {
    isAuthenticated = await verifyFirebaseToken(token);
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
