import { locales } from '@/i18n/config'
import HomeContent from '@/components/HomeContent'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <HomeContent en={locale === 'en'} locale={locale} />
}
