import { getSanityClient } from './client'
import { urlFor } from './image'
import type { Work, WorkStatus } from '@/content/works'
import type { Locale } from '@/lib/i18n'

/* Sanity から作品を取ってきて、画面が使う Work の形にして返す。

   画面側（components）は Sanity を知らなくてよい。
   CMS を差し替えることになっても、直すのはこのファイルだけで済む。

   content/works.ts の仮データと同じ型を返すので、
   ページ側は works を await getWorks(locale) に置き換えるだけでよい。 */

/** Sanity から返ってくる生の形 */
type RawProject = {
  slug: string
  titleJa: string
  titleEn: string
  summaryJa?: string
  summaryEn?: string
  tags?: string[]
  year?: string
  status: WorkStatus
  showIn?: Locale[]
  featured?: boolean
  overviewJa?: string
  overviewEn?: string
  pointsJa?: string[]
  pointsEn?: string[]
  roleJa?: string
  roleEn?: string
  liveUrl?: string
  repoUrl?: string
  thumbnail?: unknown
  screenshotDesktop?: unknown
  screenshotMobile?: unknown
}

/* GROQ（Sanity の問い合わせ言語）。欲しい項目だけを並べる。SQL の SELECT に近い。

   tags[]->slug.current は「参照先をたどって slug だけ取る」という意味。
   これで works.ts と同じ「文字列の配列」になり、tags.ts の group で
   種類と技術に振り分けられる。 */
const FIELDS = `
  "slug": slug.current,
  titleJa, titleEn, summaryJa, summaryEn,
  "tags": tags[]->slug.current,
  year, status, showIn, featured,
  overviewJa, overviewEn, pointsJa, pointsEn,
  roleJa, roleEn, liveUrl, repoUrl,
  thumbnail, screenshotDesktop, screenshotMobile
`

/* 下書きを外す。

   Sanity は下書きを drafts.〜 という別の書類として持っている。
   公開済みと下書きが両方あると、同じ作品が2件返る。
   スタジオで「アンパブリッシュ」しても、下書きは残るので出続ける。

   トークンを使っていないから公開分だけ見えている、とはならない。
   データセットが公開なら下書きも読める。だから明示的に外す。

   これを書き忘れると、
     ・出さないつもりの作品がサイトに出る
     ・同じ作品が2枚並ぶ
   の2つが同時に起きる。 */
const PUBLISHED = `!(_id in path("drafts.**"))`

/* 画像は幅を指定して縮める。元のまま出すと数MBになる。
   幅は実際に表示される最大の倍を目安にしてある（Retina のぶん）。 */
function img(src: unknown, width: number) {
  return src ? urlFor(src as never).width(width).url() : undefined
}

function toWork(p: RawProject): Work {
  return {
    slug: p.slug,
    titleJa: p.titleJa,
    titleEn: p.titleEn,
    summaryJa: p.summaryJa ?? '',
    summaryEn: p.summaryEn ?? '',
    tags: p.tags ?? [],
    year: p.year ?? '',
    status: p.status,
    showIn: p.showIn ?? ['ja', 'en'],
    featured: p.featured ?? false,

    thumbnail: img(p.thumbnail, 1000),
    screenshotDesktop: img(p.screenshotDesktop, 1600),
    screenshotMobile: img(p.screenshotMobile, 700),

    overviewJa: p.overviewJa,
    overviewEn: p.overviewEn,
    pointsJa: p.pointsJa,
    pointsEn: p.pointsEn,
    roleJa: p.roleJa,
    roleEn: p.roleEn,
    liveUrl: p.liveUrl,
    repoUrl: p.repoUrl,
  }
}

/** その言語で見せる作品を、並び順で全部取る */
export async function getWorks(locale: Locale): Promise<Work[]> {
  const raw = await getSanityClient().fetch<RawProject[]>(
    `*[_type == "project" && ${PUBLISHED} && $locale in showIn]
     | order(order asc, _createdAt asc) { ${FIELDS} }`,
    { locale },
  )
  return raw.map(toWork)
}

/** 1件だけ取る。無ければ null */
export async function getWork(slug: string): Promise<Work | null> {
  const raw = await getSanityClient().fetch<RawProject | null>(
    `*[_type == "project" && ${PUBLISHED} && slug.current == $slug][0] { ${FIELDS} }`,
    { slug },
  )
  return raw ? toWork(raw) : null
}

/* ビルド時にページを作るための一覧。
   showIn も一緒に返す。/en に出さない作品のページまで作らないため。 */
export async function getAllSlugs(): Promise<{ slug: string; showIn: Locale[] }[]> {
  return getSanityClient().fetch(
    `*[_type == "project" && ${PUBLISHED} && defined(slug.current)]{ "slug": slug.current, showIn }`,
  )
}
