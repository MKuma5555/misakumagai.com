import {
  marqueeTop, marqueeBottom, marqueeTextTop, marqueeTextBottom,
} from '@/content/skills'
import type { Icon } from '@tabler/icons-react'

/**
 * 同じ組を6つ並べて、1組ぶんだけ動かす（globals.css の -16.6667%）。
 * 動かす量を大きくすると、残りの組で画面を覆えなくなって空白が出る。
 * 組ごとに末尾の余白（pr）を持たせることで、間隔もぴったり繋がる。
 */
const COPIES = 6

function Row({
  icons,
  texts,
  dir,
}: {
  icons?: Icon[]
  texts?: string[]
  dir: 'left' | 'right'
}) {
  const group = (key: number) => (
    <div key={key} className="flex shrink-0 items-center gap-11 pr-11">
      {icons?.map((I, i) => (
        <I key={i} size={26} stroke={1.5} className="text-[#d6dfc9]/85" />
      ))}
      {texts?.map((t, i) => (
        <span key={i} className="whitespace-nowrap font-mono text-[11px] tracking-[.22em] text-[#d6dfc9]/85">
          {t}
        </span>
      ))}
    </div>
  )
  return (
    <div className={`flex w-max ${dir === 'left' ? 'marquee-left' : 'marquee-right'}`}>
      {Array.from({ length: COPIES }, (_, n) => group(n))}
    </div>
  )
}

export default function TechMarquee({ en }: { en: boolean }) {
  return (
    <div className="overflow-hidden border-y border-[#d6dfc9] bg-[#2b2820] py-4" aria-hidden="true">
      {en ? (
        <>
          <Row texts={marqueeTextTop} dir="left" />
          <div className="h-3" />
          <Row texts={marqueeTextBottom} dir="right" />
        </>
      ) : (
        <>
          <Row icons={marqueeTop} dir="left" />
          <div className="h-3.5" />
          <Row icons={marqueeBottom} dir="right" />
        </>
      )}
    </div>
  )
}
