import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n'
import { localeAlternates } from '@/lib/metadata'
import ContactSection from '@/components/sections/ContactSection'

/* 問い合わせ。中身はトップの ContactSection と同じものを使い回す。
   ja は LINE あり、en は Contact のみ。出し分けはセクション側。 */

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
      <ContactSection locale={locale} />
    </main>
  )
}
