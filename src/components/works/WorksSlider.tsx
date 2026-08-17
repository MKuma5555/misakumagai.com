'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
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

export default function WorksSlider({
  works,
  locale,
  total,
}: {
  works: Work[]
  locale: Locale
  /* 全部で何件あるか。最後のカードに「6 / 12」と出すために使う。
     works は featured で絞った後なので、ここからは全件数が分からない。 */
  total: number
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [index, setIndex] = useState(0)
  const [pages, setPages] = useState(1)

  /* カード1枚ぶんの移動量。カード幅と隙間を足したもの。
     幅を % で持たせているので、実測しないと分からない。 */
  const step = () => {
    const track = trackRef.current
    if (!track) return 0
    const kids = track.children as HTMLCollectionOf<HTMLElement>
    return kids[1] ? kids[1].offsetLeft - kids[0].offsetLeft : (kids[0]?.offsetWidth ?? 0)
  }

  /* 端に着いたら矢印を薄くする。1px の誤差を見込む。
     ついでに丸の数と、いまどこにいるかも出す。

     丸の数はカードの枚数ではない。最後の数枚は左端まで来られないため
     （右端で止まる）、枚数ぶん丸を出すと最後の何個かは永久に届かない。
     実際に止まれる位置の数 =（スクロールできる距離 ÷ カード1枚ぶん）+ 1。
     画面幅で見えている枚数が変わるので、そのつど数え直す。 */
  const syncEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setAtStart(track.scrollLeft <= 1)
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1)

    const kids = track.children as HTMLCollectionOf<HTMLElement>
    const one = kids[1] ? kids[1].offsetLeft - kids[0].offsetLeft : kids[0]?.offsetWidth
    if (!one) return

    setIndex(Math.round(track.scrollLeft / one))
    setPages(Math.max(1, Math.round((track.scrollWidth - track.clientWidth) / one) + 1))
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

          {/* 最後は一覧への入口。カードと同じ大きさで並べる。

              以前はここに「カード1枚ぶんの余白」を置いていた。
              最後の1枚も左端まで来られるようにして、丸の数をカードの枚数に
              合わせるためだったが、そのぶん右端が大きく空いた。
              代わりにこのカードを置くと、最後の画面も3枚で埋まる。
              丸の数は「止まれる位置の数」に戻る（カードの枚数より少ない）。 */}
          <article className="h-[clamp(280px,48vh,500px)] w-[74%] shrink-0 snap-start sm:w-[46%] lg:w-[35%]">
            <Link
              href={`/${locale}/works`}
              className="group flex h-full flex-col items-center justify-center gap-4 rounded-card border border-dashed border-olive/40 bg-cream/60 transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-2 hover:bg-cream hover:shadow-[0_18px_40px_rgba(63,59,48,.18)]"
            >
              <span className="font-mono text-xs tracking-[.18em] text-muted">
                {works.length} / {total}
              </span>

              <span className="text-xl text-olive-text md:text-2xl">
                {en ? 'View all' : 'すべて見る'}
              </span>

              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive-deep text-cream transition-transform duration-300 group-hover:translate-x-1">
                <MoveRight size={20} strokeWidth={1.5} />
              </span>
            </Link>
          </article>

          {/* 右端に少し余白。最後のカードが画面の縁に貼りつかないように */}
          <div aria-hidden className="w-6 shrink-0 sm:w-10" />
        </div>
      </div>

      {/* 矢印と丸。カードの下、左寄せ。
          丸は「何枚あって、いま何枚目か」を出すためのもの。
          押すとその位置まで飛ぶ。矢印だけだと残りの枚数が分からない。 */}
      <div className={`mt-5 flex items-center gap-6 ${GUTTER_LEFT}`}>
        <button
          type="button"
          onClick={() => trackRef.current?.scrollBy({ left: -step(), behavior: 'smooth' })}
          disabled={atStart}
          aria-label={en ? 'Previous' : '前へ'}
          className={arrow}
        >
          <MoveLeft size={36} strokeWidth={1} />
        </button>

        <div className="flex items-center gap-3">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() =>
                trackRef.current?.scrollTo({ left: i * step(), behavior: 'smooth' })
              }
              aria-label={`${i + 1} / ${pages}`}
              aria-current={i === index ? 'true' : undefined}
              /* 押せる範囲は見た目より広く取る（p-1.5）。
                 8px の丸をそのままボタンにすると指では当たらない。 */
              className="group p-1.5"
            >
              <span
                className={`block h-2 w-2 rounded-full border border-olive-text transition-colors ${
                  i === index ? 'bg-olive-text' : 'bg-transparent group-hover:bg-olive-text/30'
                }`}
              />
            </button>
          ))}
        </div>

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
