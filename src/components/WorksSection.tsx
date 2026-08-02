'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Work } from '@/lib/works'

/**
 * 重なるカード。
 * stack-card の止まる位置を --i で1枚ずつずらし、上部の帯だけが残るようにしている。
 * ずれ幅（globals.css の --stack-step）と帯の高さ h-[72px] は必ず同じ値にすること。
 */
export default function WorksSection({
  en,
  locale,
  works,
}: {
  en: boolean
  locale: string
  works: Work[]
}) {
  return (
      <section id="works" className="bg-[#eee9dc] px-6 pb-32 pt-16 md:px-16 md:pb-44 md:pt-20">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col justify-between gap-9 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">03 / {en ? 'WORKS' : 'つくったもの'}</p>
              <h2 className="mt-9 font-serif text-5xl leading-[.9] tracking-[-.05em] md:text-8xl">{en ? <>A few things<br /><em>in the world.</em></> : <>最近つくった<br /><em>もの。</em></>}</h2>
            </div>
            <div className="flex max-w-xs flex-col items-start gap-6">
              <p className="text-sm leading-7 text-[#706b5d]">{en ? "Small businesses, products, and brands — each with a different question to answer." : "小さなビジネス、プロダクト、ブランド。それぞれ違う問いに向き合った仕事です。"}</p>
              <Link href={`/${locale}/works`} className="inline-flex items-center gap-2 rounded-full border border-[#4a5e3e]/35 px-5 py-2.5 text-xs text-[#4a5e3e] transition-colors hover:bg-[#4a5e3e] hover:text-[#f4f0e6]">
                {en ? "See all works" : "作品一覧を見る"}<ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
          <div className="mt-20 space-y-8">
            {works.map((work, i) => (
              <article key={work.id} className="stack-card" style={{ "--i": i, zIndex: i + 1 } as CSSProperties}>
                <Link href={`/${locale}/works/${work.id}`}>
                  <div className={`cursor-pointer overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(43,40,32,.14)] transition-transform duration-500 hover:scale-[1.01] ${i % 2 ? "bg-[#b9c8ad]" : "bg-[#f4f0e6]"}`}>

                  {/* 帯：カードが重なっても残る部分。高さは --stack-step と揃える */}
                  <div className="flex h-[60px] items-center justify-between gap-4 border-b border-[#2b2820]/10 px-6 md:h-[72px] md:px-10">
                    <div className="flex min-w-0 items-baseline gap-3 md:gap-5">
                      <span className="shrink-0 font-mono text-[10px] tracking-wider text-[#4a5e3e]">{work.id}</span>
                      <h3 className="truncate font-serif text-xl tracking-[-.03em] md:text-2xl">{en ? work.titleEn : work.title}</h3>
                      <span className="hidden shrink-0 font-mono text-[10px] tracking-wider text-[#706b5d] md:inline">{en ? work.typeEn : work.type}</span>
                    </div>
                    <ArrowUpRight size={18} className="shrink-0 text-[#4a5e3e]" />
                  </div>

                  {/* 本体：重なると隠れる部分 */}
                  <div className="grid min-h-[560px] p-6 md:grid-cols-[1.2fr_.8fr] md:p-10">
                    <div className="relative overflow-hidden rounded-[1.4rem] bg-[#d6dfc9]">
                      {work.image && <img src={work.image} alt={en ? work.titleEn : work.title} className="h-full w-full object-cover mix-blend-multiply transition duration-700 hover:scale-105" />}
                      <span className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#4a5e3e] text-[#f4f0e6]"><ArrowRight size={16} /></span>
                    </div>
                    <div className="flex flex-col justify-between px-2 py-8 md:px-10 md:py-4">
                      <div>
                        <p className="font-mono text-[10px] tracking-wider text-[#4a5e3e] md:hidden">{en ? work.typeEn : work.type}</p>
                        <h3 className="mt-5 font-serif text-4xl leading-[.95] tracking-[-.04em] md:mt-0 md:text-6xl">{en ? work.titleEn : work.title}</h3>
                        <p className="mt-6 max-w-sm text-sm leading-7 text-[#706b5d]">{en ? work.summaryEn : work.summary}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-[#2b2820]/20 pt-5 text-xs"><span>{en ? "View case study" : "ケーススタディを見る"}</span><ArrowUpRight size={18} /></div>
                    </div>
                  </div>
                  </div>
                </Link>
              </article>
            ))}
            {/* 最後のカードが sticky する余地を作るスペーサー。無いと4枚目だけ止まらず前の帯を覆う */}
            <div aria-hidden="true" className="h-[60vh]" />
          </div>
        </div>
      </section>
  )
}
