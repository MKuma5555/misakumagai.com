import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n'
import { localeAlternates } from '@/lib/metadata'
import WorkDetail from '@/components/works/WorkDetail'

/* 作品詳細。ノートPCとスマホの枠で見せる。
   1件ずつ違うタイトルと説明を出すのが SEO の本命なので、
   generateMetadata は必ず実装する。 */

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const l = (isLocale(locale) ? locale : 'ja') as Locale
  // TODO: Sanity から取得して title / description / OGP を組み立てる
  return {
    title: slug,
    alternates: localeAlternates(l, `/works/${slug}`),
  }
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  return (
    <main className="section-y wrapper-narrow">
      <WorkDetail locale={locale} slug={slug} />
    </main>
  )
}
