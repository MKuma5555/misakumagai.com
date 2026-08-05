import { getSanityClient } from './client'
import { urlFor } from './image'
import type { Work } from '@/lib/works'
import { CATEGORIES } from './constants'

/** Sanityから返ってくる生の形 */
type RawProject = {
  _id: string
  slug: string
  titleJa: string
  titleEn: string
  summaryJa?: string
  summaryEn?: string
  category: string
  tags?: { labelJa: string; labelEn: string }[]
  client?: string
  role?: string
  year?: string
  status: string
  showIn?: string[]
  featured?: boolean
  challengeJa?: string
  challengeEn?: string
  approachJa?: string
  approachEn?: string
  outcomeJa?: string
  outcomeEn?: string
  thumbnail?: unknown
  mobileShot?: unknown
  gallery?: unknown[]
  liveUrl?: string
}

// GROQ：欲しい項目だけを指定して取り出す。SQLのSELECTに近い
const FIELDS = `
  _id,
  "slug": slug.current,
  titleJa, titleEn, summaryJa, summaryEn,
  category,
  "tags": tags[]->{ labelJa, labelEn },
  client, role, year, status, showIn, featured,
  challengeJa, challengeEn, approachJa, approachEn, outcomeJa, outcomeEn,
  thumbnail, mobileShot, gallery, liveUrl
`

function toWork(p: RawProject): Work {
  const categoryTitle = CATEGORIES.find((c) => c.value === p.category)?.title ?? ''
  const industry = p.tags?.[0]
  const img = (src: unknown, w: number) => (src ? urlFor(src as never).width(w).url() : '')

  return {
    id: p.slug,
    title: p.titleJa,
    titleEn: p.titleEn,
    type: [categoryTitle, industry?.labelJa].filter(Boolean).join(' / '),
    typeEn: [CATEGORIES.find((c) => c.value === p.category)?.titleEn, industry?.labelEn].filter(Boolean).join(' / '),
    summary: p.summaryJa ?? '',
    summaryEn: p.summaryEn ?? '',
    image: img(p.thumbnail, 1000),
    role: p.role ?? '',
    roleEn: p.role ?? '',
    year: p.year ?? '',
    client: p.client ?? '',
    clientEn: p.client ?? '',
    description: p.summaryJa ?? '',
    descriptionEn: p.summaryEn ?? '',
    challenge: p.challengeJa ?? '',
    challengeEn: p.challengeEn ?? '',
    approach: p.approachJa ?? '',
    approachEn: p.approachEn ?? '',
    outcome: p.outcomeJa ?? '',
    outcomeEn: p.outcomeEn ?? '',
    gallery: (p.gallery ?? []).map((g) => img(g, 1400)).filter(Boolean),
    liveUrl: p.liveUrl,
    mobileShot: p.mobileShot ? img(p.mobileShot, 700) : undefined,
  }
}

/** その言語で見せる作品を、並び順で取得する */
export async function getWorks(locale: string, opts?: { featuredOnly?: boolean }): Promise<Work[]> {
  const filter = [
    `_type == "project"`,
    `$locale in showIn`,
    opts?.featuredOnly ? `featured == true` : null,
  ].filter(Boolean).join(' && ')

  const raw = await getSanityClient().fetch<RawProject[]>(
    `*[${filter}] | order(order asc, _createdAt asc) { ${FIELDS} }`,
    { locale },
  )
  return raw.map(toWork)
}

/** 1件だけ取得する */
export async function getWork(slug: string): Promise<Work | null> {
  const raw = await getSanityClient().fetch<RawProject | null>(
    `*[_type == "project" && slug.current == $slug][0] { ${FIELDS} }`,
    { slug },
  )
  return raw ? toWork(raw) : null
}

/** ビルド時にページを作るための一覧 */
export async function getAllSlugs(): Promise<{ slug: string; showIn: string[] }[]> {
  return getSanityClient().fetch(
    `*[_type == "project" && defined(slug.current)]{ "slug": slug.current, showIn }`,
  )
}


/** 一覧ページ用。絞り込みに使う category と status も一緒に返す */
export type WorkCard = Work & { category: string; status: string }

export async function getWorksWithMeta(locale: string): Promise<WorkCard[]> {
  const raw = await getSanityClient().fetch<RawProject[]>(
    `*[_type == "project" && $locale in showIn] | order(order asc, _createdAt asc) { ${FIELDS} }`,
    { locale },
  )
  return raw.map((p) => ({ ...toWork(p), category: p.category, status: p.status }))
}
