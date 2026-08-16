'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MoveLeft, MoveRight } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { GUTTER_LEFT } from '@/lib/utils'
import type { Work } from '@/content/works'
import WorkCard from './WorkCard'

/* 横スライダー。矢印で1枚ずつ送る。端で止まる。

   ループはしない。一度カードを2組並べて無限に回す作りを試したが、
   継ぎ目で位置を入れ替えるときのカクつきと、複製側のホバーの扱いで
   割に合わなかった。自動再生も無いので、回す必要が薄い。

   件数は works.ts の featured で決まる。ここでは絞らない。

   位置の計算はブラウザの横スクロールと scroll-snap に任せている。
   そのぶんコードが短く、スマホでは指でのスワイプが最初から効く。
   矢印は「1枚ぶんスクロールする」だけの役目。

   左余白は「スクロールする箱」ではなく外側の箱に付ける。
   中に付けると、スクロールしたとき余白ごと流れてカードが画面の左端に出る。 */

export default function WorksSlider({ works, locale }: { works: Work[]; locale: Locale }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  /* カード1枚ぶんの移動量。カード幅と隙間を足したもの。
     幅を % で持たせているので、実測しないと分からない。 */
  const step = () => {
    const track = trackRef.current
    if (!track) return 0
    const kids = track.children as HTMLCollectionOf<HTMLElement>
    return kids[1] ? kids[1].offsetLeft - kids[0].offsetLeft : (kids[0]?.offsetWidth ?? 0)
  }

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

  const en = locale === 'en'

  const arrow =
    'text-olive-text transition-opacity hover:opacity-60 disabled:pointer-events-none disabled:opacity-25'

  return (
    <div>
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
                 幅は lg で 35%。2枚ぶんと3枚目の途中までが見える。 */
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
          onClick={() => trackRef.current?.scrollBy({ left: -step(), behavior: 'smooth' })}
          disabled={atStart}
          aria-label={en ? 'Previous' : '前へ'}
          className={arrow}
        >
          <MoveLeft size={36} strokeWidth={1} />
        </button>

        <button
          type="button"
          onClick={() => trackRef.current?.scrollBy({ left: step(), behavior: 'smooth' })}
          disabled={atEnd}
          aria-label={en ? 'Next' : '次へ'}
          className={arrow}
        >
          <MoveRight size={36} strokeWidth={1} />
        </button>
      </div>
    </div>
  )
}
