'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { journey, journeyIntro } from '@/content/journey'
import JourneyIcon from './JourneyIcons'
import JourneyMap from './JourneyMap'

// 5等分した列の中心。アイコン・点・ラベルをすべてこの位置に揃える
const CENTERS = journey.map((_, n) => ((n + 0.5) * 100) / journey.length)

export default function JourneySection({ en }: { en: boolean }) {
  const [i, setI] = useState(0)
  const stop = journey[i]
  const last = journey.length - 1
  const x = CENTERS[i]

  // 足跡は左端から現在地まで
  const prints = Math.max(0, Math.round((x - 3) / 2.4))

  return (
    <section
      id="about"
      className="bg-[#d6dfc9] px-6 py-20 md:flex md:min-h-screen md:flex-col md:justify-center md:px-16 md:py-12 md:pl-32"
    >
      <div className="mx-auto w-full max-w-[1240px]">

        {/* ── 見出し ＋ 地図 ── */}
        <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr] md:gap-14">
          <div>
            <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">
              01 / {en ? 'MY JOURNEY' : 'わたしについて'}
            </p>
            <h2 className="mt-5 font-serif text-[2.1rem] leading-[1.12] tracking-[-.04em] text-[#2b2820] md:text-[2.6rem]">
              {(en ? journeyIntro.headingEn : journeyIntro.headingJa).map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </h2>
            <p className="mt-5 whitespace-pre-line text-[13px] leading-7 text-[#53604d]">
              {en ? journeyIntro.leadEn : journeyIntro.leadJa}
            </p>
          </div>
          <JourneyMap className="hidden md:block" />
        </div>

        {/* ── 横の道（デスクトップ） ── */}
        <div className="mt-10 hidden md:block">
          {/* アイコン */}
          <div className="flex">
            {journey.map((s, n) => (
              <button
                key={s.key}
                onClick={() => setI(n)}
                aria-label={s.key}
                className="group flex flex-1 justify-center"
              >
                <span
                  className={`flex h-[76px] w-[76px] items-center justify-center rounded-full text-[#4a5e3e] transition-all duration-300 ${
                    n === i
                      ? 'bg-[#f4f0e6] opacity-100 shadow-[0_6px_20px_rgba(43,40,32,.13)]'
                      : 'opacity-45 group-hover:-translate-y-1 group-hover:bg-[#f4f0e6]/70 group-hover:opacity-90'
                  }`}
                >
                  <JourneyIcon index={n} size={50} />
                </span>
              </button>
            ))}
          </div>

          {/* 線・足跡・点。SVGだと幅いっぱいに広がらないのでHTMLで位置を指定する */}
          <div className="relative mt-3 h-[26px]">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#4a5e3e]/30" />
            <div
              className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[#4a5e3e]"
              style={{ width: `${x}%`, transition: 'width .55s cubic-bezier(.3,.8,.3,1)' }}
            />

            {Array.from({ length: prints }, (_, n) => {
              const px = 1.6 + n * 2.4
              const up = n % 2 === 0
              return (
                <span
                  key={n}
                  aria-hidden="true"
                  className="absolute h-[5px] w-[8px] rounded-full bg-[#4a5e3e]/22"
                  style={{
                    left: `${px}%`,
                    top: up ? '3px' : '17px',
                    transform: `rotate(${up ? -16 : 16}deg)`,
                  }}
                />
              )
            })}

            {journey.map((s2, n) => (
              <button
                key={s2.key}
                onClick={() => setI(n)}
                aria-label={s2.key}
                className="group absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: `${CENTERS[n]}%` }}
              >
                <span
                  className={`block rounded-full border-[1.6px] border-[#4a5e3e] transition-all duration-300 ${
                    n === i
                      ? 'h-[15px] w-[15px] bg-[#4a5e3e] ring-4 ring-[#4a5e3e]/15'
                      : n < i
                        ? 'h-[13px] w-[13px] bg-[#4a5e3e] group-hover:scale-125'
                        : 'h-[13px] w-[13px] bg-[#d6dfc9] group-hover:scale-125 group-hover:bg-[#4a5e3e]/25'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* ラベル */}
          <p className="mt-5 text-center font-mono text-[10px] tracking-[.16em] text-[#4a5e3e]/55">
            {en ? 'SELECT A POINT TO READ MORE' : '節目を押すと、その頃の話が読めます'}
          </p>
          <div className="mt-3 flex">
            {journey.map((s, n) => (
              <button
                key={s.key}
                onClick={() => setI(n)}
                className={`flex-1 px-2 text-center transition-all duration-300 ${
                  n === i ? 'opacity-100' : 'opacity-45 hover:-translate-y-0.5 hover:opacity-85'
                }`}
              >
                <span className="block font-mono text-[10px] tracking-[.14em] text-[#4a5e3e]">{s.key}</span>
                <span className="mt-1 block text-[11px] leading-5 text-[#53604d]">
                  {en ? s.captionEn : s.captionJa}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── 縦の道（SP） ── */}
        <div className="relative mt-10 md:hidden">
          <div className="absolute bottom-3 left-[13px] top-3 w-px bg-[#4a5e3e]/25" />
          <div className="flex flex-col gap-5">
            {journey.map((s, n) => (
              <button key={s.key} onClick={() => setI(n)} className="flex items-center gap-4 text-left">
                <span
                  className={`ml-[9px] h-[9px] w-[9px] shrink-0 rounded-full border-[1.5px] border-[#4a5e3e] transition-colors ${
                    n <= i ? 'bg-[#4a5e3e]' : 'bg-[#d6dfc9]'
                  }`}
                />
                <span className={`shrink-0 text-[#4a5e3e] transition-opacity ${n === i ? 'opacity-100' : 'opacity-45'}`}>
                  <JourneyIcon index={n} size={30} />
                </span>
                <span className={`transition-opacity ${n === i ? 'opacity-100' : 'opacity-50'}`}>
                  <span className="block font-mono text-[10px] tracking-[.14em] text-[#4a5e3e]">{s.key}</span>
                  <span className="block text-[11px] text-[#53604d]">{en ? s.captionEn : s.captionJa}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── 内容 ── */}
        <div className="mt-8 rounded-[1.6rem] bg-[#f4f0e6] p-6 md:mt-8 md:p-8">
          <div className="grid gap-6 md:grid-cols-[.62fr_1.38fr] md:gap-9">
            {stop.image ? (
              <img src={stop.image} alt="" className="aspect-[5/4] w-full rounded-2xl object-cover" />
            ) : (
              <div className="flex aspect-[5/4] w-full items-center justify-center rounded-2xl bg-[#d6dfc9]/50">
                <span className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]/50">PHOTO</span>
              </div>
            )}
            <div>
              <p className="font-mono text-[11px] tracking-[.14em] text-[#4a5e3e]">
                {String(i + 1).padStart(2, '0')} / {stop.key}
              </p>
              <h3 className="mt-3 font-serif text-2xl leading-[1.15] tracking-[-.03em] text-[#2b2820] md:text-[1.7rem]">
                {en ? stop.headingEn : stop.headingJa}
              </h3>
              <div className="mt-4 space-y-3">
                {(en ? stop.bodyEn : stop.bodyJa).map((p, n) => (
                  <p key={n} className="text-[12.5px] leading-7 text-[#706b5d]">{p}</p>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setI((v) => Math.max(0, v - 1))}
                  disabled={i === 0}
                  aria-label={en ? 'Previous' : '前へ'}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#4a5e3e]/30 text-[#4a5e3e] transition-colors hover:bg-[#4a5e3e] hover:text-[#f4f0e6] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#4a5e3e]"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => setI((v) => Math.min(last, v + 1))}
                  disabled={i === last}
                  aria-label={en ? 'Next' : '次へ'}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#4a5e3e]/30 text-[#4a5e3e] transition-colors hover:bg-[#4a5e3e] hover:text-[#f4f0e6] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#4a5e3e]"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
