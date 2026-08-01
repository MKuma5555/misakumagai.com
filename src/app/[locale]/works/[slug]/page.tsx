import { notFound } from 'next/navigation'
import { locales } from '@/i18n/config'
import { getWork, getAllSlugs } from '@/sanity/queries'
import WorkDetailContent from '@/components/WorkDetailContent'

export const revalidate = 60

export async function generateStaticParams() {
  const all = await getAllSlugs()
  return all.flatMap(({ slug, showIn }) =>
    (showIn ?? locales).map((locale) => ({ locale, slug })),
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const work = await getWork(slug)
  if (!work) notFound()
  return <WorkDetailContent work={work} en={locale === 'en'} locale={locale} />
}
