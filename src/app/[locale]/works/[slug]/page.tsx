import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, locales, type Locale } from '@/lib/i18n'
import { localeAlternates } from '@/lib/metadata'
import { works } from '@/content/works'
import WorkDetail from '@/components/works/WorkDetail'

/* 作品詳細。ノートPCとスマホの枠で見せる。

   1件ずつ違うタイトルと説明を出すのが SEO の本命。
   前のサイトは全ページ同じ <title> だったので、そこを直すのが移行の目的でもある。 */

export const revalidate = 60

// 12件ぶんのURLを先に作っておく。表示が速くなり、検索にも拾われやすい
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    works.filter((w) => w.showIn.includes(locale)).map((w) => ({ locale, slug: w.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const l = (isLocale(locale) ? locale : 'ja') as Locale
  const work = works.find((w) => w.slug === slug)

  if (!work) return { title: slug }

  return {
    title: l === 'en' ? work.titleEn : work.titleJa,
    description: l === 'en' ? work.summaryEn : work.summaryJa,
    alternates: localeAlternates(l, `/works/${slug}`),
    openGraph: {
      title: l === 'en' ? work.titleEn : work.titleJa,
      description: l === 'en' ? work.summaryEn : work.summaryJa,
      images: work.thumbnail ? [work.thumbnail] : undefined,
    },
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
