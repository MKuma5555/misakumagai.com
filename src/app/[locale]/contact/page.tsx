import type { Metadata } from 'next'
import { locales } from '@/i18n/config'
import ContactPageContent from '@/components/ContactPageContent'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const en = locale === 'en'
  return {
    title: en ? 'Get in touch — Misa Kumagai' : 'お問い合わせ — Misa Kumagai',
    description: en
      ? 'Open to frontend roles in Australia, and to freelance work.'
      : '歯科医院のサイト、Instagramの運用、小さなお店のLP。お気軽にご相談ください。',
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <ContactPageContent en={locale === 'en'} locale={locale} />
}
