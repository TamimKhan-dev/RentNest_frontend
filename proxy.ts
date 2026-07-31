import { jwtUtils } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/properties"];
const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;

  let userRole = null;
  let isValidToken = false;

  if (accessToken) {
    const decodedAccessToken = jwtUtils.verifyToken(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string,
    );

    if (decodedAccessToken?.success && decodedAccessToken.data) {
      isValidToken = true;
      userRole = (decodedAccessToken.data as JwtPayload).role;
    } else {
      isValidToken = false;
    }
  }

  if (accessToken && !isValidToken) {
    const isPublic = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    );

    const response = isPublic
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", request.url));

    response.cookies.delete("accessToken");
    return response;
  }

  if (isValidToken && authRoutes.includes(pathname)) {
    if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/dashboard/tenant", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    } else if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/dashboard/landlord", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (!isValidToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/dashboard/tenant") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/dashboard/landlord") &&
    userRole !== "LANDLORD"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
