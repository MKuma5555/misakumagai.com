import { locales } from '@/i18n/config'
import { getWorksWithMeta } from '@/sanity/queries'
import WorksList from '@/components/WorksList'

export const revalidate = 60

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const works = await getWorksWithMeta(locale)
  return <WorksList works={works} en={locale === 'en'} locale={locale} />
}
