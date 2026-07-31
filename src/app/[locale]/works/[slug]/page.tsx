import { locales } from '@/i18n/config'
import { works } from '@/lib/works'
import WorkDetailContent from '@/components/WorkDetailContent'

export function generateStaticParams() {
  return locales.flatMap((locale) => works.map((w) => ({ locale, slug: w.id })))
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  return <WorkDetailContent id={slug} en={locale === 'en'} locale={locale} />
}
