import { NextRequest, NextResponse } from "next/server";
import { COOKIES_KEYS, ROUTES } from "./lib/staticKeys";
import { isTokenExpired } from "./lib/tokenUtils";
import { i18nConfig } from "../i18n";

export async function middleware(request: NextRequest) {
  if (request.method === "POST") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const response = NextResponse.next();

  const accessToken = request.cookies.get(COOKIES_KEYS.accessToken)?.value;
  const isAccessTokenValid = !isTokenExpired(accessToken);

  const hasLocaleCookie = request.cookies.has(COOKIES_KEYS.locale);
  if (!hasLocaleCookie) {
    const cookieRes = response.cookies.set(COOKIES_KEYS.locale, i18nConfig.defaultLocale, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  if (!isAccessTokenValid && url.pathname !== ROUTES.login?.url) {
    const loginUrl = new URL(ROUTES.login?.url, request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAccessTokenValid && url.pathname === ROUTES.login?.url) {
    const session = new URL(ROUTES.root?.url, request.url);
    return NextResponse.redirect(session);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)", "/"],
};
