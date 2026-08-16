import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fontVariables } from '@/lib/fonts'
import { locales, isLocale } from '@/lib/i18n'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import Loading from '@/components/layout/Loading'
import BackToTop from '@/components/layout/BackToTop'
import FloatingCta from '@/components/layout/FloatingCta'
import ClosingNote from '@/components/sections/ClosingNote'
import '../globals.css'

/* これがルートレイアウト。app/layout.tsx は置かない。
   全ページを [locale] の下に入れることで、html の lang を
   言語ごとに正しく出せる。/en を lang="ja" で出すと、
   Google が英語ページだと認識しない。 */

export const metadata: Metadata = {
  metadataBase: new URL('https://misakumagai.com'),
  title: { default: 'Misa Kumagai', template: '%s | Misa Kumagai' },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <Loading />
        <SiteNav locale={locale} />

        {/* 上に乗って動く側。中身とフッターをまとめて1枚の面にする。

            bg-cream は必須。ここが透けていると、
            全部のセクションの裏に下の締め画面が見えてしまう。

            z-10 で締め画面（z-0）より前に置く。 */}
        <div className="relative z-10 bg-cream">
          {children}
          <SiteFooter locale={locale} />
        </div>

        {/* 下に敷く側。文書の最後に置いて、画面の下に貼りつけておく。
            上の面がスクロールで抜けると、ここが出てくる。

            sticky なので、文書の終わりまで来たら自然に止まる。
            高さは h-svh。100vh だとスマホのアドレスバーぶんはみ出す。 */}
        <section className="sticky bottom-0 z-0 flex h-svh items-center justify-center bg-sand">
          <ClosingNote locale={locale} />
        </section>

        <FloatingCta locale={locale} />
        <BackToTop />
      </body>
    </html>
  )
}
