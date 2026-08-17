/* セクションの境目。

   色は fill="currentColor" なので、Tailwind の文字色クラスで指定する。

   ── 置き方が2種類ある ──

   outside（position="top" / "bottom"）
     セクションの外に出る。そのセクションの色を渡すと、
     隣のセクションへ自分の色が食い込む形になる。

       <section className="relative bg-sand">
         <SectionSeparator kind="wave" position="top" className="text-sand" />
         ...
         <SectionSeparator kind="wave" position="bottom" className="text-sand" />
       </section>

   inset（position="inset-top"）
     セクションの中の上端に重なる。渡すのは「上のセクションの色」。
     上の色が下のセクションへ垂れてくる見え方になる。

       <section className="relative bg-yellow">
         <SectionSeparator kind="triangle" position="inset-top" className="text-cream" />

   どちらも親に relative が付いていないと画面の隅に飛ぶ。 */

import { cx } from '@/lib/utils'

/* 波。左でいったん上がって、右下がりに落ちる。
   viewBox の横幅は 1440 だが preserveAspectRatio="none" なので
   画面幅に合わせて伸びる。数字は「割合」だと思ってよい。 */
const WAVE =
  'M0,32 C180,6 360,6 520,22 C700,40 880,62 1080,62 C1240,62 1350,54 1440,46 L1440,80 L0,80 Z'

/* 逆三角。上の辺いっぱいから、真ん中の下の一点へ落ちる。
   下向きの矢印にも見えるので、次へ進んでほしい場所に向く。 */
const TRIANGLE = 'M0,0 L1440,0 L720,80 Z'

/* ゆるい丸み。両端は下、真ん中がふくらむ。
   制御点を上へ振るほど山が高くなる。0 で最大（真ん中が 20 まで上がる）。 */
const CURVE = 'M0,80 C400,0 1040,0 1440,80 Z'

const PATHS = {
  wave: WAVE,
  triangle: TRIANGLE,
  curve: CURVE,
} as const

export default function SectionSeparator({
  kind = 'wave',
  position = 'top',
  className,
}: {
  kind?: keyof typeof PATHS
  position?: 'top' | 'bottom' | 'inset-top'
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
      className={cx(
        'pointer-events-none absolute inset-x-0 h-10 w-full md:h-20',
        position === 'top' && 'bottom-full',
        // 下側は上下ひっくり返して使う。同じ形が鏡になる
        position === 'bottom' && 'top-full scale-y-[-1]',
        position === 'inset-top' && 'top-0',
        className,
      )}
    >
      <path d={PATHS[kind]} fill="currentColor" />
    </svg>
  )
}
