import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n'
import { localeAlternates } from '@/lib/metadata'
import WorksList from '@/components/works/WorksList'
import { getWorks } from '@/sanity/queries'

/* 作品一覧。絞り込みはここだけ。
   トップのスライダーには付けない（自動再生と絞り込みは相性が悪い）。

   WorksList は URL の ?tag= を読むために useSearchParams を使う。
   Next.js では <Suspense> で囲まないとビルドで警告が出るので、ここで囲む。 */

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = (isLocale(locale) ? locale : 'ja') as Locale
  return {
    title: l === 'en' ? 'Works' : '制作実績',
    alternates: localeAlternates(l, '/works'),
  }
}

export default async function WorksPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  // Sanity から取るのはここ（サーバー側）。WorksList はブラウザ側なので渡すだけ
  const works = await getWorks(locale)

  return (
    <main className="section-y wrapper">
      <Suspense fallback={null}>
        <WorksList works={works} locale={locale} />
      </Suspense>
    </main>
  )
}
