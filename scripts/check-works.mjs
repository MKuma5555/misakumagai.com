/* Sanity に入っている作品を一覧する。読むだけ。何も書き換えない。

   使い方
     node scripts/check-works.mjs

   slug が重なっていると、画面側で React の key がぶつかってエラーになる。
   どの書類を消せばいいかを、IDと中身を見て決めるためのもの。

   下書き（drafts.〜）と公開済みは別の書類として数えられる。
   同じ作品の下書きと公開済みが両方あるのは正常なので、
   ここでは「素のID」でまとめて出している。 */

import { readFileSync } from 'node:fs'
import { createClient } from '@sanity/client'

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n')
    .filter((line) => line.trim() && !line.trim().startsWith('#'))
    .map((line) => {
      const at = line.indexOf('=')
      return [line.slice(0, at).trim(), line.slice(at + 1).trim()]
    }),
)

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01',
  token: env.SANITY_WRITE_TOKEN, // 下書きも見たいので必要
  useCdn: false,
})

const rows = await client.fetch(
  `*[_type == "project"] | order(order asc) {
     _id, _updatedAt, order, featured, status,
     "slug": slug.current, titleJa, titleEn,
     "hasThumb": defined(thumbnail)
   }`,
)

// drafts.project-x と project-x をひとつにまとめる
const byBase = new Map()
for (const r of rows) {
  const base = r._id.replace(/^drafts\./, '')
  if (!byBase.has(base)) byBase.set(base, { base, draft: null, published: null })
  byBase.get(base)[r._id.startsWith('drafts.') ? 'draft' : 'published'] = r
}

console.log(`\n作品 ${byBase.size}件\n`)

const slugCount = new Map()
for (const { base, draft, published } of byBase.values()) {
  const r = published ?? draft
  const state = published && draft ? '公開済み+下書きあり' : published ? '公開済み' : '下書きのみ'
  slugCount.set(r.slug, [...(slugCount.get(r.slug) ?? []), base])

  console.log(`  ${r.slug ?? '(slugなし)'}`)
  console.log(`    ${r.titleJa ?? '(無題)'}`)
  console.log(`    ID        ${base}`)
  console.log(`    状態      ${state} / ${r.status} / order ${r.order}`)
  console.log(`    トップ     ${r.featured ? 'はい' : 'いいえ'}   画像 ${r.hasThumb ? 'あり' : 'なし'}`)
  console.log(`    最終更新   ${r._updatedAt}`)
  console.log('')
}

const dupes = [...slugCount.entries()].filter(([, ids]) => ids.length > 1)

if (dupes.length === 0) {
  console.log('slug の重なりはありません。')
} else {
  console.log('── slug が重なっています ──')
  for (const [slug, ids] of dupes) {
    console.log(`  ${slug}`)
    for (const id of ids) console.log(`    ${id}`)
  }
  console.log('\nどちらかをスタジオで消してください。')
  console.log('残すのは、画像を入れてあるほう / 最終更新が新しいほう。')
}
