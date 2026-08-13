/* タグの一覧。あとで Sanity の tag ドキュメントに置き換える。
   そのときのために group を持たせてある。

     type   作ったものの種類。一覧ページの絞り込みボタンになる
     tech   使った技術。カードに表示するだけで、押せない

   押せる場所を1種類にしないと、どちらを押せばいいのか迷う。

   ここに無い slug が works.ts に書かれていても落ちない。
   その場合は slug がそのまま表示される。 */

export type TagGroup = 'type' | 'tech'

export type Tag = {
  slug: string
  group: TagGroup
  labelJa: string
  labelEn: string
}

export const tags: Tag[] = [
  // ── 種類。絞り込みのボタンになる。並び順がそのままボタンの順 ──
  { slug: 'web', group: 'type', labelJa: 'Webサイト', labelEn: 'Website' },
  { slug: 'lp', group: 'type', labelJa: 'LP', labelEn: 'Landing Page' },
  { slug: 'app', group: 'type', labelJa: 'アプリ', labelEn: 'App' },
  { slug: 'design', group: 'type', labelJa: 'デザイン', labelEn: 'Design' },
  { slug: 'sns', group: 'type', labelJa: 'インスタ運用', labelEn: 'Social' },

  // ── 技術。カードに出すだけ ──
  { slug: 'react', group: 'tech', labelJa: 'React', labelEn: 'React' },
  { slug: 'nextjs', group: 'tech', labelJa: 'Next.js', labelEn: 'Next.js' },
  { slug: 'typescript', group: 'tech', labelJa: 'TypeScript', labelEn: 'TypeScript' },
  { slug: 'astro', group: 'tech', labelJa: 'Astro', labelEn: 'Astro' },
  { slug: 'wordpress', group: 'tech', labelJa: 'WordPress', labelEn: 'WordPress' },
  { slug: 'supabase', group: 'tech', labelJa: 'Supabase', labelEn: 'Supabase' },
  { slug: 'sanity', group: 'tech', labelJa: 'Sanity', labelEn: 'Sanity' },
]

const bySlug = new Map(tags.map((t) => [t.slug, t]))

export function tagLabel(slug: string, locale: 'ja' | 'en') {
  const tag = bySlug.get(slug)
  if (!tag) return slug // 一覧に無いものはそのまま出す。落とさない
  return locale === 'en' ? tag.labelEn : tag.labelJa
}

export function tagsOf(group: TagGroup) {
  return tags.filter((t) => t.group === group)
}

export function isGroup(slug: string, group: TagGroup) {
  return bySlug.get(slug)?.group === group
}
