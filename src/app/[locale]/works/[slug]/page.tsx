import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n'
import { localeAlternates } from '@/lib/metadata'
import { getAllSlugs, getWork } from '@/sanity/queries'
import WorkDetail from '@/components/works/WorkDetail'

/* 作品詳細。ノートPCとスマホの枠で見せる。

   1件ずつ違うタイトルと説明を出すのが SEO の本命。
   前のサイトは全ページ同じ <title> だったので、そこを直すのが移行の目的でもある。 */

export const revalidate = 60

/* 作品ぶんのURLを先に作っておく。表示が速くなり、検索にも拾われやすい。
   その言語に出さない作品のページは作らない（showIn を見る）。 */
export async function generateStaticParams() {
  const all = await getAllSlugs()
  return all.flatMap(({ slug, showIn }) =>
    (showIn ?? []).map((locale) => ({ locale, slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const l = (isLocale(locale) ? locale : 'ja') as Locale
  const work = await getWork(slug)

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

  /* 無い作品と、その言語に出さない作品は 404。
     判断をページ側に集めてある。表示する部品は「渡されたものを出す」だけにしたい。 */
  const work = await getWork(slug)
  if (!work || !work.showIn.includes(locale)) notFound()

  return (
    <main className="section-y wrapper-narrow">
      <WorkDetail work={work} locale={locale} />
    </main>
  )
}
