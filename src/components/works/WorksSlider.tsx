'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MoveLeft, MoveRight } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { GUTTER_LEFT } from '@/lib/utils'
import type { Work } from '@/content/works'
import WorkCard from './WorkCard'

/* 横スライダー。

   位置の計算を JS でやらず、ブラウザの横スクロールと scroll-snap に任せている。
   そのぶんコードが短く、スマホでは指でのスワイプが最初から効く。
   矢印は「1枚ぶんスクロールする」だけの役目。

   左余白は「スクロールする箱」ではなく、その外側の箱に付ける。
   スクロールする箱に padding-left を付けると、スクロールしたときに
   余白ごと流れてカードが画面の左端まで出てしまう。
   外側に付ければ、スクロールする箱の左端が見出しの線と一致し、
   カードはそこで切れる。右は画面の縁まで伸びたまま。

   左余白は lib/utils.ts の GUTTER_LEFT にまとめてある。

   自動再生はホバー・フォーカス・タブが裏に回ったときに止まる。
   OS で「視差効果を減らす」にしている人には最初から動かさない。 */

const INTERVAL = 5500

export default function WorksSlider({ works, locale }: { works: Work[]; locale: Locale }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  /* カード1枚ぶんの移動量。カード幅と隙間を足したもの。
     幅を % で持たせているので、実測しないと分からない。 */
  const step = () => {
    const track = trackRef.current
    if (!track) return 0
    const [a, b] = Array.from(track.children) as HTMLElement[]
    return b ? b.offsetLeft - a.offsetLeft : (a?.offsetWidth ?? 0)
  }

  const scrollByCard = useCallback((dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * step(), behavior: 'smooth' })
  }, [])

  /* 端に着いたら矢印を薄くする。1px の誤差を見込む */
  const syncEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setAtStart(track.scrollLeft <= 1)
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1)
  }, [])

  useEffect(() => {
    syncEdges()
    window.addEventListener('resize', syncEdges)
    return () => window.removeEventListener('resize', syncEdges)
  }, [syncEdges])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || paused) return

    const id = setInterval(() => {
      const track = trackRef.current
      if (!track || document.hidden) return

      const last = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1
      if (last) track.scrollTo({ left: 0, behavior: 'smooth' })
      else track.scrollBy({ left: step(), behavior: 'smooth' })
    }, INTERVAL)

    return () => clearInterval(id)
  }, [paused])

  const en = locale === 'en'

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* 余白はこの外側の箱に。スクロールするのは中の箱 */}
      <div className={GUTTER_LEFT}>
        <div
          ref={trackRef}
          onScroll={syncEdges}
          /* py-6 -my-6 は、ホバーで浮いたカードが上下で切れないようにするため。
             横スクロールの箱は縦もはみ出しを隠すので、余白が無いと影ごと切れる。
             同じ数の負のマージンで打ち消しているので、見た目の間隔は変わらない。 */
          className="-my-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {works.map((work) => (
            <article
              key={work.slug}
              /* 高さはここで決める。波の区切りごと1画面に収めたいので vh で頭打ち。
                 幅は lg で 35%。2枚ぶんと3枚目の途中までが見える。
                 Figma と同じ「3枚目が切れている」状態になる。 */
              className="h-[clamp(280px,48vh,500px)] w-[74%] shrink-0 snap-start sm:w-[46%] lg:w-[35%]"
            >
              <WorkCard work={work} locale={locale} />
            </article>
          ))}

          {/* 右端に少し余白。最後のカードが画面の縁に貼りつかないように */}
          <div aria-hidden className="w-6 shrink-0 sm:w-10" />
        </div>
      </div>

      {/* 矢印。カードの下、左寄せ */}
      <div className={`mt-5 flex gap-6 ${GUTTER_LEFT}`}>
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label={en ? 'Previous' : '前へ'}
          className="text-olive-text transition-opacity disabled:pointer-events-none disabled:opacity-25"
        >
          <MoveLeft size={36} strokeWidth={1} />
        </button>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label={en ? 'Next' : '次へ'}
          className="text-olive-text transition-opacity disabled:pointer-events-none disabled:opacity-25"
        >
          <MoveRight size={36} strokeWidth={1} />
        </button>
      </div>
    </div>
  )
}
