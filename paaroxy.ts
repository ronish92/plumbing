// import { NextRequest, NextResponse } from "next/server"

// const LOGIN_ROUTE = "/login"

// const ADMIN_ROLE = "Admin"

// export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   // Only protect admin routes.
//   if (!pathname.startsWith("/admin")) {
//     return NextResponse.next()
//   }

//   // Get authentication cookies.
//   const token = request.cookies.get("token")?.value
//   const rolesCookie = request.cookies.get("roles")?.value

//   // No access token -> user is not authenticated.
//   if (!token) {
//     return redirectToLogin(request)
//   }

//   // No roles cookie -> user has no known role.
//   if (!rolesCookie) {
//     return redirectToLogin(request)
//   }

//   let roles: string[]

//   try {
//     const parsedRoles = JSON.parse(rolesCookie)

//     // Your current format is:
//     // ["Admin"]
//     if (Array.isArray(parsedRoles)) {
//       roles = parsedRoles
//     } else {
//       roles = [parsedRoles]
//     }
//   } catch {
//     // Invalid roles cookie.
//     return redirectToLogin(request)
//   }

//   // Admin area currently requires the Admin role.
//   if (!roles.includes(ADMIN_ROLE)) {
//     return redirectToLogin(request)
//   }

//   return NextResponse.next()
// }

// function redirectToLogin(request: NextRequest) {
//   const loginUrl = new URL(LOGIN_ROUTE, request.url)

//   // Remember where the user originally tried to go.
//   loginUrl.searchParams.set(
//     "callbackUrl",
//     request.nextUrl.pathname + request.nextUrl.search
//   )

//   return NextResponse.redirect(loginUrl)
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// }