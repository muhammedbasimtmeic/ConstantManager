import { NextRequest, NextResponse } from "next/server";
import { authApiRoutes, authRoutes, publicRoutes, DEFAULT_REDIRECT_ON_LOGIN_ROUTE, LOGIN_ROUTE } from "@/routes";

import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  console.log("Next Route :", nextUrl.pathname, "| Logged in : ", isLoggedIn);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAuthAPIRoutes = nextUrl.pathname.startsWith(authApiRoutes);
  const isProtectedRoute = !isPublicRoute && !isAuthRoute && !isAuthAPIRoutes;

  console.log("Public : ", isPublicRoute, "| Auth : ", isAuthRoute, "| AuthApi : ", isAuthAPIRoutes, "| Protected : ", isProtectedRoute);

  // if public Route. no control

  if (isAuthAPIRoutes) return NextResponse.next();

  if (isLoggedIn && isAuthRoute) return NextResponse.redirect(new URL(DEFAULT_REDIRECT_ON_LOGIN_ROUTE, nextUrl));
  if (!isLoggedIn && isProtectedRoute) return NextResponse.redirect(new URL(LOGIN_ROUTE, nextUrl));

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
