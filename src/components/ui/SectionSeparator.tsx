/* セクションの境目。About Me / Skills / Works で形が違う。
   kind で切り替える（wave 以外はこれから）。

   色は fill="currentColor" にしてあるので、Tailwind の文字色クラスで指定する。
   セクションの背景色と同じものを渡すこと。

     <section className="relative bg-sand">
       <SectionSeparator kind="wave" position="top" className="text-sand" />
       ...
       <SectionSeparator kind="wave" position="bottom" className="text-sand" />
     </section>

   position="top" は bottom-full で「セクションの外の上」に出る。
   前のセクションの上に、このセクションの色が食い込む形になる。
   親に relative が付いていないと画面の隅に飛ぶので注意。 */

import { cx } from '@/lib/utils'

/* 波。左でいったん上がって、右下がりに落ちる。
   viewBox の横幅は 1440 だが preserveAspectRatio="none" なので
   画面幅に合わせて伸びる。数字は「割合」だと思ってよい。 */
const WAVE =
  'M0,32 C180,6 360,6 520,22 C700,40 880,62 1080,62 C1240,62 1350,54 1440,46 L1440,80 L0,80 Z'

const PATHS = {
  wave: WAVE,
  curve: WAVE, // TODO: About Me 用
  arc: WAVE, // TODO: Skills 用
} as const

export default function SectionSeparator({
  kind = 'wave',
  position = 'top',
  className,
}: {
  kind?: keyof typeof PATHS
  position?: 'top' | 'bottom'
  className?: string
}) {
  const top = position === 'top'

  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
      className={cx(
        'pointer-events-none absolute inset-x-0 h-10 w-full md:h-20',
        top ? 'bottom-full' : 'top-full',
        // 下側は上下ひっくり返して使う。同じ形が鏡になる
        !top && 'scale-y-[-1]',
        className,
      )}
    >
      <path d={PATHS[kind]} fill="currentColor" />
    </svg>
  )
}
