import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale, type Locale } from '@/lib/i18n'

/* 言語が付いていない URL を、読める言語のページへ送る。
   これが無いと / を開いても 404 になる。

   ── なぜ ja 固定をやめたか ──
   /ja はお店や医院の方に向けたページ、/en は採用担当に向けたページで、
   訳し分けではなく相手が違う。
   常に /ja へ送っていると、メルボルンの採用担当が開いた瞬間に
   日本語が出る。切り替えられることに気づかないまま閉じられる。

   ── 判定のしかた ──
   ブラウザが送ってくる Accept-Language を見る。
     ja が含まれていれば          → /ja
     それ以外（未指定も含む）      → /en
   国ではなく「その人が読める言語」で決める。
   日本語話者はメルボルンにもいるし、日本にいる英語話者もいる。

   ── キャッシュさせないこと ──
   307（一時的）で返し、Vary: Accept-Language を付ける。
   これが無いと、最初に来た人の言語で結果が固定され、
   次に来た別の言語の人にも同じ行き先が配られてしまう。

   ── ファイル名について ──
   Next.js 16 で middleware.ts は proxy.ts に改名された。
   関数名も middleware ではなく proxy にする必要がある。 */

function pickLocale(request: NextRequest): Locale {
  const header = request.headers.get('accept-language') ?? ''

  /* "ja,en-US;q=0.9" のような形。品質値（q）は見ない。
     ja が挙がっている＝日本語が読める、として扱えば足りる。 */
  const wantsJa = header.split(',').some((part) => part.trim().toLowerCase().startsWith('ja'))

  return wantsJa ? 'ja' : 'en'
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return

  const locale = pickLocale(request) ?? defaultLocale

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

  const response = NextResponse.redirect(url, 307)
  response.headers.set('Vary', 'Accept-Language')
  return response
}

export const config = {
  // _next（内部ファイル）・studio（管理画面）・拡張子付き（画像など）は触らない
  matcher: ['/((?!_next|studio|api|.*\\..*).*)'],
}
