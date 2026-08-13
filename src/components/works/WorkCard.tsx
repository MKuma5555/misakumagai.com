import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import { STATUS_LABEL, type Work } from '@/content/works'
import Badge from '@/components/ui/Badge'

/* 1枚のカード。スライダーにも一覧にも同じものを並べる。

   高さは自分で決めない。親が決めた高さいっぱいに広がる（h-full）。
   写真が flex-1 で余りを取り、文字の帯だけが必要なぶん場所を取る。
   比率で高さを決めると、画面が狭いときにセクションが1画面に収まらない。

   画像が無い案件（NDA・未公開）が実際にある。
   そのときは枠だけ出して文字を置く。空の <img> は出さない —
   src="" を渡すとブラウザがページ自身を読みに行って警告が出る。

   砂のセクションの上に置くので、カードの地は生成り。砂の上に砂は沈む。 */

export default function WorkCard({ work, locale }: { work: Work; locale: Locale }) {
  const en = locale === 'en'
  const title = en ? work.titleEn : work.titleJa
  const status = STATUS_LABEL[work.status][en ? 'en' : 'ja']

  return (
    <Link
      href={`/${locale}/works/${work.slug}`}
      /* ホバーで少し浮いて、そのカードだけ大きくなる。
         影は下に濃く出すと「持ち上がった」に見える。
         Tailwind の hover: は指で触る端末には当たらないので、
         スマホでカードが押しっぱなしのまま大きくなることはない。 */
      className="group flex h-full flex-col overflow-hidden rounded-card bg-cream shadow-[0_2px_6px_rgba(63,59,48,.06)] transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_18px_40px_rgba(63,59,48,.20)]"
    >
      {/* 写真。min-h-0 が無いと flex の子が縮まずにはみ出す */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#cfc9b6]">
        {work.thumbnail ? (
          <Image
            src={work.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1024px) 35vw, (min-width: 640px) 46vw, 74vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-widest text-cream">
            {en ? 'In progress…' : '準備中…'}
          </span>
        )}

        <span className="absolute left-3 top-3">
          <Badge tone={work.status === 'live' ? 'amber' : 'quiet'}>{status}</Badge>
        </span>

        <span className="absolute right-3 top-3 rounded-pill bg-cream/90 px-2.5 py-1 font-mono text-[10px] text-ink">
          {work.year}
        </span>
      </div>

      {/* 文字の帯。高さを取りすぎないよう最小限に */}
      <div className="shrink-0 px-4 py-3.5">
        <h3 className="line-clamp-1 text-base leading-snug">{title}</h3>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-pill border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
