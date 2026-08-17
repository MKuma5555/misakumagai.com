import type { Locale } from '@/lib/i18n'

/* 締めの一言。ページの一番最後、フッターよりさらに下。

   下に敷いておいて、上のコンテンツがめくれると出てくる。
   敷く仕掛けは layout.tsx 側にある（sticky bottom-0）。
   ここは中身だけを持つ。高さも layout 側で決めない。

   position: fixed ではなく sticky を使っている。
   fixed だと文書の終わりを越えても貼りついたままなので、
   高さの計算を自分でしないといけない。sticky は勝手に止まる。

   FV の「はじまりは、いつも人の話を聞くことから。」と対になっている。
   上から下まで読むと「はじまり → 続き」になる並び。
   片方を直すときは、もう片方（HeroSection）も見ること。

   波の区切りは置かない。ここは下に敷いてある面で、
   前のセクションと地続きではないため、境目を描く相手がいない。 */

/* 読点で改行する。日本語は自動の折り返しがどこで切れるか読めないので、
   大きい文字ほど自分で決めたほうがきれいに収まる。 */
const LINES: Record<Locale, [string, string]> = {
  ja: ['つくって終わりではなく', '続いていくものを'],
  en: ['Built to keep going,', 'not just to launch.'],
}

export default function ClosingNote({ locale }: { locale: Locale }) {
  const lines = LINES[locale]

  return (
    <div className="wrapper text-center">
      {/* FV の Hello と同じ font-hero。入口と出口で書体を揃える。
          英語は Chewy、日本語は Zen Maru に落ちる（Chewy に和文が無いため）。 */}
      <p className="font-hero text-[clamp(1.5rem,4.4vw,3.25rem)] leading-[1.7] tracking-[.02em] text-ink">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>

      {/* 仮のロゴ。Canva で作ったものができたら、
          public/ に置いて next/image の <Image> に差し替える。
          差し替えるのはこの <div> ごと。周りの余白は外側が持っている。 */}
      <div className="mt-12 flex flex-col items-center gap-3">
        <span
          aria-hidden
          className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/30 font-mono text-lg tracking-[.12em] text-ink/70"
        >
          MK
        </span>
        <span className="font-mono text-[11px] tracking-[.22em] text-muted">MISA KUMAGAI</span>
      </div>
    </div>
  )
}
