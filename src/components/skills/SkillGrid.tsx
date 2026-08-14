'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import type { Locale } from '@/lib/i18n'
import { LEVELS, skills, type SkillLevel } from '@/content/skills'
import { cx } from '@/lib/utils'
import SkillTile from './SkillTile'

/* ロゴを並べる。段数は決めず、折り返しに任せる。

   ── 出るときの動き ──
   偶数番目は左から、奇数番目は右から寄ってくる。
   交互にすることで「きれいに揃って出る」感じを崩している。

   once: false にしてあるので、上に戻ってまた降りてくると
   もう一度再生される。once: true だと2回目以降は何も起きず、
   「さっきは動いたのに」という違和感になる。

   絞り込みを押したときも同じ動きにしたいので、
   入れ物に key={active} を付けて作り直している。
   これが無いと、残ったタイルは動かず、消えた・現れたものだけが動く。

   delay は index に比例させるが上限を置く。
   32個ぶん比例させると、最後の1個まで待たされて「遅い」になる。

   1枚ずつの傾き・高さのズレと、ホバーの揺れは SkillTile が持っている。 */

const STEP = 0.026 // 1個あたりの遅れ（秒）
const MAX_STEPS = 18 // これ以上は遅らせない

export default function SkillGrid({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<SkillLevel | 'all'>('all')
  const en = locale === 'en'

  const shown = active === 'all' ? skills : skills.filter((s) => s.level === active)

  return (
    <div>
      {/* 段階の絞り込み。
          スマホでも1行に収める。英語の Professional が一番長いので、
          そこを基準に文字とパディングを画面幅に追従させている。
          折り返させると2行になって、下のロゴとの間が詰まる。 */}
      <div className="flex flex-nowrap gap-[clamp(6px,1.6vw,10px)]">
        {LEVELS.map((level) => {
          const on = active === level.key
          return (
            <button
              key={level.key}
              type="button"
              onClick={() => setActive(level.key)}
              aria-pressed={on}
              className={cx(
                'rounded-pill whitespace-nowrap px-[clamp(9px,2.6vw,16px)] py-1.5 text-[clamp(11px,3.1vw,14px)] transition-colors',
                on
                  ? 'bg-amber text-ink'
                  : 'border border-line text-muted hover:border-olive hover:text-ink',
              )}
            >
              {en ? level.en : level.ja}
            </button>
          )
        })}
      </div>

      {/* ロゴ。gap-y が広めなのは、1枚ずつ高さがズレているぶんの逃げ。

          スマホは中央寄せ。1行に入る数は画面幅で変わるので、
          左寄せだと右端の余りが行ごとにバラついて、全体が左に寄って見える。
          中央寄せなら余りが左右に分かれるので、どの幅でも落ち着く。
          PC は左の見出しと端を揃えたいので左寄せのまま。 */}
      <div
        key={active}
        className="mt-8 flex flex-wrap justify-center gap-x-2.5 gap-y-4 sm:gap-x-3 sm:gap-y-6 md:mt-10 md:justify-start md:gap-x-3.5 md:gap-y-7"
      >
        {shown.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: i % 2 === 0 ? -38 : 38, scale: 0.85 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2, margin: '-8%' }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20, // 少し弾ませる。きっちり止めると事務的に見える
              delay: Math.min(i, MAX_STEPS) * STEP,
            }}
          >
            <SkillTile skill={skill} />
          </motion.div>
        ))}
      </div>

      <p className="mt-6 font-mono text-[11px] text-muted">
        {shown.length} / {skills.length}
      </p>
    </div>
  )
}
