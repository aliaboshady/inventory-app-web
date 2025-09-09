import { NextRequest, NextResponse } from "next/server";
import { COOKIES_KEYS } from "./lib/staticKeys";
import { i18nConfig } from "../i18n";
// import { deleteTokens, getToken } from "./lib/cookiesHelper";
// import { refreshToken as handleRefreshToken } from "@/actions/auth/refreshToken.action";
// import { isTokenValid } from "./lib/utils";
// import { IMeCookie } from "./model/user.models";
// import jwt from "jsonwebtoken";

// const nonLoggedInOnlyRoutes = [
//   ROUTES.root,
//   ROUTES.login,
//   ROUTES.signup,
//   ROUTES.forgotPassword,
//   ROUTES.verify,
// ];

// const loggedInRequiredPrefixes = [
//   ROUTES.home,
//   ROUTES.profile,
//   ROUTES.admin,
//   ROUTES.auctions,
//   ROUTES.players,
//   ROUTES.clubs,
//   ROUTES.agents,
// ];

export async function middleware(request: NextRequest) {
  // Skip API calls
  if (request.method === "POST") {
    return NextResponse.next();
  }

  // const url = request.nextUrl.clone();
  const response = NextResponse.next();

  const hasLocaleCookie = request.cookies.has(COOKIES_KEYS.locale);
  if (!hasLocaleCookie) {
    response.cookies.set(COOKIES_KEYS.locale, i18nConfig.defaultLocale, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  // Check if user is logged in
  // let accessToken = await getToken("ACCESS_TOKEN");
  // let isAccessTokenValid = isTokenValid(accessToken);

  // If access token is not valid but refresh token exists, attempt to refresh
  // if (!isAccessTokenValid) {
  //   const refreshToken = await getToken("REFRESH_TOKEN");

  //   if (refreshToken && isTokenValid(refreshToken)) {
  //     const newTokens = await handleRefreshToken({ refreshToken }, false);
  //     const res = NextResponse.next();
  //     res.cookies.set(COOKIES_KEYS.accessToken, newTokens?.data?.accessToken);
  //     res.cookies.set(COOKIES_KEYS.refreshToken, newTokens?.data?.refreshToken);
  //     accessToken = newTokens?.data?.accessToken;
  //     isAccessTokenValid = isTokenValid(accessToken);
  //     return res;
  //   }
  // }

  // Determine if the current path is one that requires a logged-in user
  // const isPathRequiringLogin = loggedInRequiredPrefixes.some((prefix) =>
  //   url.pathname.startsWith(prefix)
  // );

  // If user is not logged in, redirect from logged-only users routes
  // if (!isAccessTokenValid && isPathRequiringLogin) {
  //   deleteTokens();
  //   url.pathname = ROUTES.root;
  //   return NextResponse.redirect(url.href);
  // }

  // If user is logged in, redirect from non-logged-only users routes
  // if (isAccessTokenValid && nonLoggedInOnlyRoutes.includes(url.pathname)) {
  //   url.pathname = ROUTES.home;
  //   return NextResponse.redirect(url.href);
  // }

  // Restrict user from going to certain pages depending on user role
  // if (isAccessTokenValid) {
  //   const meCookie = jwt.decode(accessToken) as IMeCookie;

  //   if (url.pathname.startsWith(ROUTES.admin) && !meCookie.isSuperAdmin) {
  //     url.pathname = ROUTES.home;
  //     return NextResponse.redirect(url.href);
  //   }
  // }

  // If on verify, must have verificationToken query param
  // if (
  //   url.pathname === ROUTES.verify &&
  //   !request.nextUrl.searchParams.has("verificationToken")
  // ) {
  //   url.pathname = ROUTES.root;
  //   return NextResponse.redirect(url.href);
  // }

  return response;
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)", "/"],
};
