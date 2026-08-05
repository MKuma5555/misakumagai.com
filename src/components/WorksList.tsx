'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { WorkCard as WorkCardData } from '@/sanity/queries'
import { CATEGORIES, STATUSES } from '@/sanity/constants'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import WorkCard from './WorkCard'
import BackToTop from './BackToTop'

export default function WorksList({
  works,
  en,
  locale,
}: {
  works: WorkCardData[]
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
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* カードの中身はホームと共通（WorkCard）。
               背景の色だけ tone で変える。ここを揃えておかないと、
               ホームだけ新しく見えて同じサイトに見えなくなる。 */}
            {shown.map((work) => {
              const status = STATUSES.find((s) => s.value === work.status)
              return (
                <div key={work.id} className="relative">
                  {status && work.status !== 'live' && (
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-[#2b2820]/80 px-2.5 py-1 font-mono text-[9px] text-[#f4f0e6]">
                      {en ? status.titleEn : status.title}
                    </span>
                  )}
                  <WorkCard work={work} locale={locale} en={en} tone="light" />
                </div>
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
