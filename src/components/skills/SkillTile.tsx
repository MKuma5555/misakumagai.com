'use client'

import type { Skill } from '@/content/skills'
import { ICONS } from './icons'

/* タイル1枚。白い角丸に原色のロゴ。

   ロゴが無いものは文字タイルにする。AWS と Canva は各社の申し入れで
   simple-icons から削除されている。REST API はそもそもロゴが無い。
   ブランドロゴは色を変えずに使う（各社の決まり）ので、ここだけ原色が入る。

   常時は動かない。ホバーしている1枚だけが揺れ続ける。
   32枚が常に動いていると、読む側が落ち着かない。

   傾きと高さのズレは CSS 変数で持たせている。
   揺れのキーフレームがその変数を読むので、ホバーしてもズレが保たれる。
   固定値で transform を書くと、ホバーの瞬間にズレが消えて跳ねる。

   --jitter は base.css で定義した倍率。スマホでは 0.5 になる。
   画面が狭いと同じズレでも目立ちすぎて、ただガタガタに見えるため。 */

/* 名前から決まるズレ。毎回同じ値になるので、
   リロードのたびに並びが変わったりしない。 */
function jitter(name: string) {
  let h = 0
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) | 0
  h = Math.abs(h)
  return {
    rotate: (h % 11) - 5, // -5〜5度
    dy: ((h >> 4) % 15) - 7, // -7〜7px
  }
}

export default function SkillTile({ skill }: { skill: Skill }) {
  const icon = skill.icon ? ICONS[skill.icon] : undefined
  const { rotate, dy } = jitter(skill.name)

  return (
    <div tabIndex={0} className="group relative outline-none">
      <div
        style={
          {
            '--dy': `${dy}px`,
            '--rot': `${rotate}deg`,
            transform: 'translateY(calc(var(--dy) * var(--jitter))) rotate(calc(var(--rot) * var(--jitter)))',
          } as React.CSSProperties
        }
        className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-line bg-white shadow-[0_2px_8px_rgba(63,59,48,.07)] transition-shadow duration-200 group-hover:animate-[wiggle_.9s_ease-in-out_infinite] group-hover:shadow-[0_12px_26px_rgba(63,59,48,.2)] group-focus-visible:animate-[wiggle_.9s_ease-in-out_infinite] group-focus-visible:ring-2 group-focus-visible:ring-olive sm:h-14 sm:w-14 md:h-[60px] md:w-[60px]"
      >
        {icon ? (
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="h-[26px] w-[26px] sm:h-7 sm:w-7 md:h-8 md:w-8"
            style={{ fill: `#${icon.hex}` }}
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <span aria-hidden className="font-mono text-[11px] leading-tight text-ink">
            {skill.name === 'REST API' ? 'REST' : skill.name}
          </span>
        )}
      </div>

      <span className="sr-only">{skill.name}</span>

      {/* 名前。ホバーとフォーカスのときだけ。揺れの外に置いてある */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-ink px-2.5 py-1 text-[11px] text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {skill.name}
      </span>
    </div>
  )
}
