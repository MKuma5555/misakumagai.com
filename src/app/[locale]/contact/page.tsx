import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n'
import { localeAlternates } from '@/lib/metadata'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'

/* 問い合わせページ。フォームはここだけに置く。
   トップは sections/ContactBand.tsx が「/contact へ送るだけ」の帯を出す。 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = (isLocale(locale) ? locale : 'ja') as Locale
  return {
    title: l === 'en' ? 'Contact' : 'お問い合わせ',
    alternates: localeAlternates(l, '/contact'),
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <main>
      <div className="wrapper pt-28 md:pt-32">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} />
          {locale === 'en' ? 'Back home' : 'ホームに戻る'}
        </Link>
      </div>

      <ContactForm locale={locale} />
    </main>
  )
}
