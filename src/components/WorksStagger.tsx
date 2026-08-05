import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Work } from '@/lib/works'
import WorkCard from './WorkCard'

/**
 * ja版のWorks。墨の地に、2カラムのずらしグリッド。
 * 右列だけ1枚ぶん下げて互い違いにする（md:[&>*:nth-child(even)]:mt-[84px]）。
 * en版は重なるカード（WorksSection）のままなので、こちらはja専用。
 *
 * ページで一番暗い場所にしている。作品写真が一番映えるため。
 */
export default function WorksStagger({
  locale,
  works,
}: {
  locale: string
  works: Work[]
}) {
  // トップは6件まで。それ以上は一覧ページへ送る
  const shown = works.slice(0, 6)

  return (
    <section id="works" className="bg-[#2b2820] px-6 pb-32 pt-10 md:px-16 md:pb-36 md:pl-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-9 md:flex-row md:items-end">
          <div>
            <p data-reveal className="font-mono text-[10px] tracking-[.2em] text-[#b9c8ad]">
              04 / つくったもの
            </p>
            <h2 data-reveal className="mt-6 font-serif text-5xl leading-[.92] tracking-[-.05em] text-[#f4f0e6] md:text-8xl">
              最近つくった<br /><em>もの。</em>
            </h2>
          </div>

          <div data-reveal className="flex max-w-xs flex-col items-start gap-6">
            <p className="text-sm leading-8 text-[#a8a294]">
              小さなビジネス、クリニック、ブランド。それぞれ違う問いに向き合った仕事です。
            </p>
            <Link
              href={`/${locale}/works`}
              className="inline-flex items-center gap-2 rounded-full border border-[#d6dfc9]/40 px-5 py-2.5 text-xs text-[#d6dfc9] transition-colors hover:bg-[#d6dfc9] hover:text-[#2b2820]"
            >
              作品一覧を見る <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-14 md:mt-[72px] md:grid-cols-2 md:gap-14 md:[&>*:nth-child(even)]:mt-[84px]">
          {shown.map((work, i) => (
            <div
              key={work.id}
              data-reveal
              style={{ '--d': i % 2 ? '.09s' : '0s' } as React.CSSProperties}
            >
              <WorkCard work={work} locale={locale} en={false} index={i} tone="dark" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
