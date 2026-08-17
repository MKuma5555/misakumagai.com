import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fontVariables } from '@/lib/fonts'
import { locales, isLocale } from '@/lib/i18n'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import Loading from '@/components/layout/Loading'
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

        {/* 縦の並びは
              中身（上に乗って動く）→ Closing（下に敷いてある）→ Footer
            画面で起きることは
              中身が上へ抜ける → Closing が1画面ぶん現れる → Footer が下からせり上がる

            bg-cream は必須。ここが透けていると、
            全部のセクションの裏に下の締め画面が見えてしまう。

            z-10 で締め画面（z-0）より前に置く。 */}
        <div className="relative z-10 bg-cream">{children}</div>

        {/* 下に敷く側。画面の下に貼りついたまま、上の面が抜けると出てくる。
            sticky なので、自分の本来の位置まで来たら自然に外れて一緒に流れる。
            高さは h-svh。100vh だとスマホのアドレスバーぶんはみ出す。 */}
        <section className="sticky bottom-0 z-0 flex h-svh items-center justify-center bg-sand">
          <ClosingNote locale={locale} />
        </section>

        {/* ページの最後。z-10 が要る —
            Closing がまだ貼りついている間に重なるので、前に出しておく */}
        <div className="relative z-10">
          <SiteFooter locale={locale} />
        </div>

        {/* 「ページの先頭へ」はフッターの中にある。
            右下は FloatingCta が使っているので、浮くボタンは作らない */}
        <FloatingCta locale={locale} />
      </body>
    </html>
  )
}
