'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { WorkCard } from '@/sanity/queries'
import { CATEGORIES, STATUSES } from '@/sanity/constants'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import BackToTop from './BackToTop'

export default function WorksList({
  works,
  en,
  locale,
}: {
  works: WorkCard[]
  en: boolean
  locale: string
}) {
  const [active, setActive] = useState<string>('all')

  // 実際に作品があるカテゴリだけタブに出す。空のタブを押させない
  const used = CATEGORIES.filter((c) => works.some((w) => w.category === c.value))
  const shown = active === 'all' ? works : works.filter((w) => w.category === active)

  return (
    <main className="min-h-screen bg-[#f4f0e6] text-[#2b2820]">
      <SiteNav en={en} locale={locale} />

      <section className="px-6 pb-28 pt-32 md:px-16 md:pl-32 md:pt-40">
        <div className="mx-auto max-w-[1240px]">
          <Link
            href={`/${locale}`}
            className="mb-14 inline-flex items-center gap-2 text-sm text-[#53604d] transition-colors hover:text-[#4a5e3e]"
          >
            <ArrowLeft size={16} /> {en ? 'Back home' : 'ホームに戻る'}
          </Link>

          <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">
            {en ? 'ALL WORKS' : 'つくったもの'}
          </p>
          <h1 className="mt-8 font-serif text-5xl leading-[.9] tracking-[-.05em] md:text-8xl">
            {en ? <>Everything<br /><em>so far.</em></> : <>これまでに<br /><em>つくったもの。</em></>}
          </h1>
          <p className="mt-8 max-w-md text-sm leading-7 text-[#706b5d]">
            {en
              ? `${works.length} projects — client work, products and coursework.`
              : `全${works.length}件。お仕事でつくったもの、自分でつくったもの。`}
          </p>

          {/* 絞り込みタブ */}
          <div className="mt-12 flex flex-wrap gap-2">
            <button
              onClick={() => setActive('all')}
              className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                active === 'all'
                  ? 'border-[#4a5e3e] bg-[#4a5e3e] text-[#f4f0e6]'
                  : 'border-[#4a5e3e]/30 text-[#4a5e3e] hover:bg-[#4a5e3e]/8'
              }`}
            >
              {en ? 'All' : 'すべて'}
              <span className="ml-2 opacity-60">{works.length}</span>
            </button>
            {used.map((c) => {
              const count = works.filter((w) => w.category === c.value).length
              return (
                <button
                  key={c.value}
                  onClick={() => setActive(c.value)}
                  className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                    active === c.value
                      ? 'border-[#4a5e3e] bg-[#4a5e3e] text-[#f4f0e6]'
                      : 'border-[#4a5e3e]/30 text-[#4a5e3e] hover:bg-[#4a5e3e]/8'
                  }`}
                >
                  {en ? c.titleEn : c.title}
                  <span className="ml-2 opacity-60">{count}</span>
                </button>
              )
            })}
          </div>

          {/* 一覧 */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((work) => {
              const status = STATUSES.find((s) => s.value === work.status)
              return (
                <Link
                  key={work.id}
                  href={`/${locale}/works/${work.id}`}
                  className="group overflow-hidden rounded-[1.6rem] bg-[#f4f0e6] shadow-[0_10px_30px_rgba(43,40,32,.09)] transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#d6dfc9]">
                    {work.image && (
                      <img
                        src={work.image}
                        alt={en ? work.titleEn : work.title}
                        className="h-full w-full object-cover mix-blend-multiply transition duration-700 group-hover:scale-105"
                      />
                    )}
                    {status && work.status !== 'live' && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#2b2820]/80 px-2.5 py-1 font-mono text-[9px] text-[#f4f0e6]">
                        {en ? status.titleEn : status.title}
                      </span>
                    )}
                  </div>
                  <div className="px-5 py-5">
                    <p className="font-mono text-[10px] tracking-wider text-[#4a5e3e]">
                      {en ? work.typeEn : work.type}
                    </p>
                    <h2 className="mt-3 flex items-start justify-between gap-3 font-serif text-2xl leading-tight tracking-[-.03em]">
                      {en ? work.titleEn : work.title}
                      <ArrowUpRight size={17} className="mt-1 shrink-0 text-[#4a5e3e]" />
                    </h2>
                    <p className="mt-3 line-clamp-3 text-[13px] leading-6 text-[#706b5d]">
                      {en ? work.summaryEn : work.summary}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

          {shown.length === 0 && (
            <p className="mt-16 text-sm text-[#706b5d]">
              {en ? 'Nothing here yet.' : 'このカテゴリはまだありません。'}
            </p>
          )}
        </div>
      </section>

      <SiteFooter en={en} locale={locale} />
      <BackToTop en={en} />
    </main>
  )
}
