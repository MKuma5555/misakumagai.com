import { locales } from '@/i18n/config'
import { getWorks } from '@/sanity/queries'
import HomeContent from '@/components/HomeContent'
import HomeJa from '@/components/HomeJa'

// 60秒ごとに最新の内容を取り直す（Sanityで公開したら少し待てば反映される）
export const revalidate = 60

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  // トップは「トップに出す」をオンにしたものだけ。
  // まだ1件も指定していない間は全件を出して、空にならないようにする
  const featured = await getWorks(locale, { featuredOnly: true })
  const works = featured.length > 0 ? featured : await getWorks(locale)

  // ja と en は翻訳ではなく別編集。目的が違うので組み立てごと分ける。
  //   ja … 案件獲得。About は短く、Works はずらしリスト6件（墨）
  //   en … 転職。Journey の5節、Works は重なるカード4件
  if (locale !== 'en') return <HomeJa locale={locale} works={works} />

  return <HomeContent en locale={locale} works={works} />
}
