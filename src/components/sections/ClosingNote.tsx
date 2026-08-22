import Image from 'next/image'
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
   前のセクションと地続きではないため、境目を描く相手がいない。

   ── 写真について ──
   opacity 20% で敷いている。「見せる」ためではなく「気配」を置くため。
   これ以上濃くすると、マグの縁とコーヒーの黒が文字にかかって読めなくなる。
   写真を差し替えるときは、中央が空いていて明暗差の小さいものを選ぶこと。
   主役が中央にある写真は、後ろに敷くと文字と喧嘩する。 */

/* 読点で改行する。日本語は自動の折り返しがどこで切れるか読めないので、
   大きい文字ほど自分で決めたほうがきれいに収まる。 */
const LINES: Record<Locale, [string, string]> = {
  ja: ['つくって終わりではなく', '続いていくものを'],
  en: ['Built to keep going,', 'not just to launch.'],
}

export default function ClosingNote({ locale }: { locale: Locale }) {
  const lines = LINES[locale]

  return (
    <>
      {/* 写真。親（layout.tsx の sticky セクション）いっぱいに広げる。
          sticky は位置の基準になるので、親に relative を足す必要はない。 */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/closing/desk.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
      </div>

      {/* 文字。写真より前に出す */}
      <div className="wrapper relative z-10 text-center">
        {/* font-note は Klee One。ペン字で、和文も欧文も同じ書体でまかなえる。
            日本語は落ち着いた楷書、英語は丸みのある手書きになる。

            600（太いほう）を使っている。写真の上に乗るので、
            400 だと明るいところで線が負けて読みづらい。 */}
        <p className="font-note text-[clamp(1.5rem,4.4vw,3.25rem)] leading-[1.7] font-semibold tracking-[.02em] text-ink">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </>
  )
}
