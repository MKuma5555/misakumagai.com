'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Work } from '@/lib/works'

/**
 * 作品カード。ホーム（墨）と一覧（生成り）で地の色だけ変える。
 * 比率・メタ行・タイトル・説明・区切り線の組み方は共通にすること。
 * ここが揃っていれば、背景が違っても同じサイトに見える。
 *
 * 丸い矢印はカードの中でカーソルを追う。
 * ネイティブのカーソルは消していないので、リンクの手の形は出たまま。
 */
export default function WorkCard({
  work,
  locale,
  en,
  index,
  tone = 'light',
}: {
  work: Work
  locale: string
  en: boolean
  /** メタ行の先頭に出す通し番号。省略すると出さない */
  index?: number
  tone?: 'light' | 'dark'
}) {
  const media = useRef<HTMLDivElement>(null)
  const go = useRef<HTMLSpanElement>(null)

  const dark = tone === 'dark'
  const c = {
    title: dark ? 'text-[#f4f0e6]' : 'text-[#2b2820]',
    meta: dark ? 'text-[#a8a294]' : 'text-[#706b5d]',
    accent: dark ? 'text-[#b9c8ad]' : 'text-[#4a5e3e]',
    rule: dark ? 'border-[#f4f0e6]/16' : 'border-[#2b2820]/14',
    bg: dark ? 'bg-[#3a362c]' : 'bg-[#d6dfc9]',
    go: dark ? 'bg-[#d6dfc9] text-[#2b2820]' : 'bg-[#4a5e3e] text-[#f4f0e6]',
  }

  // カード内の座標を CSS 変数で渡すだけ。動かすのは globals.css 側
  const onMove = (e: React.MouseEvent) => {
    const box = media.current?.getBoundingClientRect()
    if (!box || !go.current) return
    go.current.style.setProperty('--mx', `${e.clientX - box.left}px`)
    go.current.style.setProperty('--my', `${e.clientY - box.top}px`)
  }

  return (
    <Link href={`/${locale}/works/${work.id}`} className="group block">
      <div
        ref={media}
        onMouseMove={onMove}
        className={`card-media relative aspect-[8/5] overflow-hidden rounded-lg ${c.bg}`}
      >
        {work.image && (
          <img
            src={work.image}
            alt={en ? work.titleEn : work.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
        <span
          ref={go}
          aria-hidden="true"
          className={`card-go pointer-events-none absolute left-0 top-0 flex h-[52px] w-[52px] items-center justify-center rounded-full opacity-0 ${c.go}`}
        >
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className={`mt-[18px] flex items-center justify-between font-mono text-[11px] tracking-[.06em] ${c.meta}`}>
        <span>
          {index !== undefined && (
            <span className={c.accent}>{String(index + 1).padStart(2, '0')}</span>
          )}
          {index !== undefined && ' / '}
          {en ? work.typeEn : work.type}
        </span>
        <ArrowUpRight size={14} className="shrink-0" />
      </div>

      <h3 className={`mt-2 font-serif text-2xl leading-tight tracking-[-.03em] md:text-[27px] ${c.title}`}>
        {en ? work.titleEn : work.title}
      </h3>

      <p className={`mt-2.5 border-b pb-5 text-[13px] leading-[1.95] ${c.meta} ${c.rule}`}>
        {en ? work.summaryEn : work.summary}
      </p>
    </Link>
  )
}
