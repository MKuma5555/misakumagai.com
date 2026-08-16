'use client'

import { useEffect, useState } from 'react'

/* Loading。4種の形を大きさ違いで12枚重ねて画面を埋め、
   真ん中にあるものから順に外へ逃がす。
   「真ん中に穴が開いて外へ広がる」ように見えるのが狙い。

   マスクで本当に穴を開ける作りも試せるが、CSS の mask は
   Safari で挙動が違い、穴のフチを有機的にするには SVG マスクを
   手で描くことになる。transform だけで同じ絵になるならそちらでよい。

   動かすのは transform と opacity だけ。位置や幅を動かすと
   毎フレーム再レイアウトが走って、低いスペックの端末で引っかかる。

   出す / 出さないの判定は持っていない。持たなくて済む作りになっている。

     再読み込み  ページごと読み直すので、ここも作り直されて動く
     下層から戻る 作り直されない。Loading は layout の中にあり、
                 ページ移動では layout が残るため、そもそも動かない

   sessionStorage で「一度見たか」を覚える手もあるが、
   それを入れると再読み込みでも出なくなる。 */

const SRC = {
  leaf: { src: '/images/blobs/leaf.webp', w: 900, h: 869 },
  peach: { src: '/images/blobs/peach.webp', w: 610, h: 900 },
  blush: { src: '/images/blobs/blush.webp', w: 830, h: 900 },
  mint: { src: '/images/blobs/mint.webp', w: 830, h: 900 },
} as const

/* 1枚ぶんの設定。
     x, y   置く位置（画面に対する％。形の中心）
     size   幅（vmax。画面の長いほうを基準にするので、縦横どちらでも埋まる）
     tx, ty 逃げる先
     delay  遅れ。真ん中を 0 にして、外側ほど遅らせる。
            これが「穴が広がる」の正体。 */
type Blob = {
  kind: keyof typeof SRC
  x: number
  y: number
  size: number
  tx: string
  ty: string
  delay: number
}

const BLOBS: Blob[] = [
  // 真ん中。ここが最初に開く
  { kind: 'leaf', x: 50, y: 45, size: 58, tx: '-46vw', ty: '-40vh', delay: 0 },
  { kind: 'peach', x: 48, y: 58, size: 52, tx: '40vw', ty: '44vh', delay: 40 },
  { kind: 'blush', x: 56, y: 40, size: 50, tx: '44vw', ty: '-42vh', delay: 70 },
  { kind: 'mint', x: 42, y: 54, size: 54, tx: '-44vw', ty: '42vh', delay: 100 },

  // 四隅
  { kind: 'leaf', x: 16, y: 20, size: 46, tx: '-58vw', ty: '-52vh', delay: 230 },
  { kind: 'peach', x: 84, y: 18, size: 44, tx: '58vw', ty: '-52vh', delay: 260 },
  { kind: 'mint', x: 14, y: 80, size: 46, tx: '-58vw', ty: '52vh', delay: 290 },
  { kind: 'blush', x: 86, y: 82, size: 44, tx: '58vw', ty: '52vh', delay: 320 },

  // 上下左右。最後まで残る
  { kind: 'peach', x: 50, y: 6, size: 40, tx: '0vw', ty: '-64vh', delay: 340 },
  { kind: 'leaf', x: 50, y: 94, size: 40, tx: '0vw', ty: '64vh', delay: 360 },
  { kind: 'mint', x: 4, y: 50, size: 42, tx: '-64vw', ty: '0vh', delay: 380 },
  { kind: 'blush', x: 96, y: 50, size: 42, tx: '64vw', ty: '0vh', delay: 400 },
]

/* 1枚が逃げきるまで。ここと BLOBS の delay の2つで速さが決まる。
   OUT だけ伸ばすと「ゆっくり流れる」、delay を広げると
   「穴が広がるのが遅くなる」。別物なので分けてある。 */
const OUT = 1800
const TOTAL = BLOBS[BLOBS.length - 1].delay + OUT + 300

export default function Loading() {
  const [done, setDone] = useState(false)

  // 動きが終わったら取り除く。透明とはいえ、画面いっぱいの要素を
  // 残したままにすると、後ろの描画の負担になる
  useEffect(() => {
    const timer = setTimeout(() => setDone(true), TOTAL)
    return () => clearTimeout(timer)
  }, [])

  if (done) return null

  return (
    <div
      aria-hidden
      className="loading-veil pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {/* 下地。形の隙間から FV が透けないように敷いておき、
          穴が開ききる前に消す */}
      <div
        className="absolute inset-0 bg-cream"
        style={{ animation: `veil-fade 700ms ease-out 900ms forwards` }}
      />

      {BLOBS.map((b, i) => {
        const img = SRC[b.kind]
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.src}
            width={img.w}
            height={img.h}
            alt=""
            fetchPriority="high"
            /* 中心合わせの -50% はキーフレームの中に入れてある。
               ここで translate クラスを足すと、動き出しで上書きされてずれる */
            className="absolute max-w-none"
            style={
              {
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.size}vmax`,
                height: 'auto',
                '--tx': b.tx,
                '--ty': b.ty,
                animation: `blob-out ${OUT}ms cubic-bezier(.6,0,.25,1) ${b.delay}ms both`,
              } as React.CSSProperties
            }
          />
        )
      })}
    </div>
  )
}
