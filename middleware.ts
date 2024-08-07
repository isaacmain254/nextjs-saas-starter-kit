import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

const protectedRoutes = ["/profile"];
const unprotectedRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

export default auth(async (req: NextRequest) => {
  const session = await auth();

  const isProtectedRoute = protectedRoutes.some((prefix) =>
    req.nextUrl.pathname.startsWith(prefix)
  );

  if (!session && isProtectedRoute) {
    const absoluteURL = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (session && unprotectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/profile", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (session && req.nextUrl.pathname === "/") {
    const absoluteURL = new URL("/profile", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  return NextResponse.next();
});
