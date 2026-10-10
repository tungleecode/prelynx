import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }
})

export const config = {
  matcher: [
    "/study/:path*",
    "/practice/:path*",
    "/quest/:path*",
    "/store/:path*",
    "/profile/:path*",
    "/plan/:path*",
  ],
};
