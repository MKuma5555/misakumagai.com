import type { MetadataRoute } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { SITE_URL as BASE } from '@/lib/site'
import { getAllSlugs } from '@/sanity/queries'

/* Google に渡すページの一覧。https://www.misakumagai.com/sitemap.xml

   固定ページ（トップ・Works・Contact）と、作品の詳細を両方載せる。

   ── showIn を見る理由 ──
   作品ごとに「どちらの言語で見せるか」を Sanity で決めている。
   学習の課題は英語版だけ、実案件は両方、という出し分けをしているので、
   一覧に出していないページをサイトマップに載せてはいけない。
   URL を直接叩けば開けてしまうが、
   自分から「見てください」と差し出すのは別の話。

   ── lastmod ──
   作品は Sanity の更新日時をそのまま使う。
   固定ページはビルド時刻。中身がコードにあるので、
   デプロイした時が実際の更新にあたる。

   ── 増えたときの扱い ──
   ここは自動なので、Sanity に作品を足せばサイトマップにも載る。
   Search Console に送り直す必要はない。Google が定期的に見に来る。 */

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const fixed = ['', '/works', '/contact']
  const pages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    fixed.map((path) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
    })),
  )

  /* Sanity が落ちていてもサイトマップ自体は返す。
     固定ページだけでも渡せたほうが、丸ごと 500 を返すよりよい。 */
  let works: MetadataRoute.Sitemap = []
  try {
    const all = await getAllSlugs()
    works = all.flatMap((w) =>
      (w.showIn ?? (['ja', 'en'] as Locale[])).map((locale) => ({
        url: `${BASE}/${locale}/works/${w.slug}`,
        lastModified: w.updatedAt ? new Date(w.updatedAt) : now,
      })),
    )
  } catch (err) {
    console.error('[sitemap] 作品の取得に失敗しました', err)
  }

  return [...pages, ...works]
}
