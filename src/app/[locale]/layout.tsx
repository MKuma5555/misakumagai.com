import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fontVariables } from '@/lib/fonts'
import { locales, isLocale } from '@/lib/i18n'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import Loading from '@/components/layout/Loading'
import BackToTop from '@/components/layout/BackToTop'
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
        {children}
        <SiteFooter locale={locale} />
        <BackToTop />
      </body>
    </html>
  )
}
