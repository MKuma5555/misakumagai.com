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
  { slug: 'javascript', group: 'tech', labelJa: 'JavaScript', labelEn: 'JavaScript' },
  { slug: 'html', group: 'tech', labelJa: 'HTML', labelEn: 'HTML' },
  { slug: 'css', group: 'tech', labelJa: 'CSS', labelEn: 'CSS' },
  { slug: 'scss', group: 'tech', labelJa: 'SCSS', labelEn: 'SCSS' },
  { slug: 'figma', group: 'tech', labelJa: 'Figma', labelEn: 'Figma' },
  { slug: 'astro', group: 'tech', labelJa: 'Astro', labelEn: 'Astro' },
  { slug: 'wordpress', group: 'tech', labelJa: 'WordPress', labelEn: 'WordPress' },
  { slug: 'php', group: 'tech', labelJa: 'PHP', labelEn: 'PHP' },
  { slug: 'python', group: 'tech', labelJa: 'Python', labelEn: 'Python' },
  { slug: 'flask', group: 'tech', labelJa: 'Flask', labelEn: 'Flask' },
  { slug: 'nodejs', group: 'tech', labelJa: 'Node.js', labelEn: 'Node.js' },
  { slug: 'express', group: 'tech', labelJa: 'Express', labelEn: 'Express' },
  { slug: 'ejs', group: 'tech', labelJa: 'EJS', labelEn: 'EJS' },
  { slug: 'mongodb', group: 'tech', labelJa: 'MongoDB', labelEn: 'MongoDB' },
  { slug: 'postgresql', group: 'tech', labelJa: 'PostgreSQL', labelEn: 'PostgreSQL' },
  { slug: 'tailwind', group: 'tech', labelJa: 'Tailwind CSS', labelEn: 'Tailwind CSS' },
  { slug: 'fastapi', group: 'tech', labelJa: 'FastAPI', labelEn: 'FastAPI' },
  { slug: 'aws', group: 'tech', labelJa: 'AWS', labelEn: 'AWS' },
  { slug: 'render', group: 'tech', labelJa: 'Render', labelEn: 'Render' },
  { slug: 'supabase', group: 'tech', labelJa: 'Supabase', labelEn: 'Supabase' },
  { slug: 'sanity', group: 'tech', labelJa: 'Sanity', labelEn: 'Sanity' },
  { slug: 'bootstrap', group: 'tech', labelJa: 'Bootstrap', labelEn: 'Bootstrap' },
  { slug: 'openai', group: 'tech', labelJa: 'OpenAI API', labelEn: 'OpenAI API' },
  { slug: 'maps', group: 'tech', labelJa: 'Google Maps API', labelEn: 'Google Maps API' },
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
