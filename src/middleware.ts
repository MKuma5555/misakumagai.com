import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'

/* /about のように言語が付いていない URL を /ja/about へ送る。
   これが無いと / を開いても 404 になる。 */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  )
  if (hasLocale) return

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // _next（内部ファイル）・studio（管理画面）・拡張子付き（画像など）は触らない
  matcher: ['/((?!_next|studio|api|.*\\..*).*)'],
}
