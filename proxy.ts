import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./lib/i18n/config";

const intlMiddleware = createMiddleware({ locales: [...locales], defaultLocale, localePrefix: "always" });

export default async function proxy(request: NextRequest) {
  let response = request.nextUrl.pathname.startsWith("/admin") ? NextResponse.next() : intlMiddleware(request);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return response;
  const supabase = createServerClient(url, key, { cookies: { getAll: () => request.cookies.getAll(), setAll(values) { values.forEach(({ name, value }) => request.cookies.set(name, value)); response = NextResponse.next({ request }); values.forEach(({ name, value, options }) => response.cookies.set(name, value, options)); } } });
  const { data: { user } } = await supabase.auth.getUser();
  const isAdminRoute = /^\/admin\/dashboard(?:\/|$)/.test(request.nextUrl.pathname);
  if (isAdminRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return response;
}

export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
