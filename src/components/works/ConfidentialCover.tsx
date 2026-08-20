import type { Locale } from '@/lib/i18n'
import { isGroup, tagLabel } from '@/content/tags'
import type { Work } from '@/content/works'

/* 非公開案件のカードに出す面。写真の代わりに置く。

   画像を出せない案件が2件あり、どちらも灰色の空箱で並んでいた。
   実務で一番強い2件が、一番地味に見えていた。

   ここは画像ファイルを持たない。文字と色だけで作ってある。
     ・Sanity に画像を入れなくていい
     ・/en に切り替えると英語になる（画像に焼き込むと変わらない）
     ・担当と技術が読めるので、「非公開」だけより情報がある

   色は2色を作品ごとに振り分ける。同じ案件が2件並ぶので、
   同じ面が2枚続くと貼り間違いのように見える。 */

const SKINS = {
  olive: { bg: 'bg-olive-deep', rule: 'bg-leaf' },
  ink: { bg: 'bg-ink', rule: 'bg-amber' },
} as const

/* どの作品をどちらの色にするかは、ここで決め打つ。

   slug から機械的に振り分けると、作品が増えたときに
   同じ色が2枚続くことがある。並ぶ順番も決まっているので、
   手で書いたほうが結果が読める。

   ここに無い非公開案件は olive になる。 */
const SKIN_BY_SLUG: Record<string, keyof typeof SKINS> = {
  'research-data-platform': 'olive',
  'business-management-app': 'ink',
}

export default function ConfidentialCover({ work, locale }: { work: Work; locale: Locale }) {
  const skin = SKINS[SKIN_BY_SLUG[work.slug] ?? 'olive']

  /* 下の行。技術タグの先頭2つを出す。
     担当（roleJa/roleEn）は文が長く、カードの幅では切れてしまう。 */
  const stack = work.tags
    .filter((t) => isGroup(t, 'tech'))
    .slice(0, 2)
    .map((t) => tagLabel(t, locale))
    .join(' / ')

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-2 ${skin.bg}`}
      aria-hidden
    >
      <p className="font-mono text-[10px] tracking-[0.22em] text-cream sm:text-[12px]">
        CONFIDENTIAL
      </p>

      <span className={`h-px w-8 ${skin.rule}`} />

      {stack && (
        <p className="font-mono text-[9px] tracking-[0.14em] text-sand sm:text-[11px]">{stack}</p>
      )}
    </div>
  )
}
