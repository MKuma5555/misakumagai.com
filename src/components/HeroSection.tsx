'use client'

import WorksBadge from './WorksBadge'
import ScrollCue from './ScrollCue'

const portrait = '/misa-portrait.png'

/**
 * ファーストビュー。
 * phase はローディングの進み具合（3で完了）、focus は写真まわりの3要素を
 * 順にぼかして1つずつピントを合わせる演出の番号。
 */
export default function HeroSection({
  en,
  locale,
  phase,
  focus,
}: {
  en: boolean
  locale: string
  phase: number
  focus: number
}) {
  return (
      <section id="top" className="relative flex min-h-screen items-center px-6 pb-20 pt-32 md:px-16">
        <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 md:grid-cols-[1.06fr_.94fr]">
          <div className="relative z-10">
            <p className={`reveal font-mono text-[10px] uppercase tracking-[.22em] text-[#4a5e3e] ${phase < 3 ? "opacity-0" : ""}`}>Hello, I&apos;m Misa</p>

            <h1
              className={`reveal d1 mt-7 font-serif leading-[1.02] tracking-[-.05em] ${
                en ? "text-[clamp(2.4rem,5.4vw,4.6rem)]" : "text-[clamp(3rem,7vw,6.4rem)]"
              } ${phase < 3 ? "opacity-0" : ""}`}
            >
              {en ? (
                <>Turning ideas into<br /><em>meaningful experiences.</em></>
              ) : (
                <>想いを、<br /><em>伝わる形に。</em></>
              )}
            </h1>

            <p className={`reveal d2 mt-8 max-w-md text-[15px] leading-8 text-[#625e51] ${phase < 3 ? "opacity-0" : ""}`}>
              {en ? (
                <>Thinking together. Building together.</>
              ) : (
                <>一緒に考えて、一緒につくる。<br />人だから気づけることを、大切にしています。</>
              )}
            </p>

            {/* 採用担当が3秒で拾う行。所在地と言語をここに置く
                ※就労資格（Full working rights など）が書けるなら英語版に足すと書類が通りやすい */}
            <p className={`reveal d2 mt-7 font-mono text-[10px] uppercase leading-[1.9] tracking-[.18em] text-[#8c7a55] ${phase < 3 ? "opacity-0" : ""}`}>
              Frontend developer / Full-stack engineer
              <br />
              {en
                ? "From dentistry to development · Melbourne · JP & EN"
                : "歯科の現場からWebへ · メルボルン在住 · 日本語 / English"}
            </p>

          </div>
          <div className="relative mx-auto h-[430px] w-full max-w-[480px] md:h-[590px]">
            <div className={`focus-shift ${focus === 1 ? "is-focus" : ""} float absolute right-2 top-3 h-[84%] w-[82%] rounded-[48%_52%_42%_58%/45%_40%_60%_55%] bg-[#d6dfc9]`} />
            <div className={`focus-shift ${focus === 0 ? "is-focus" : ""} absolute bottom-8 left-0 h-[82%] w-[84%] overflow-hidden rounded-[55%_45%_48%_52%/42%_56%_44%_58%] border-[14px] border-[#ebe3d2] shadow-[0_18px_40px_rgba(43,40,32,.16)]`}>
              <img src={portrait} alt="Misa portrait" className="h-full w-full object-cover" />
            </div>
            <WorksBadge
              en={en}
              locale={locale}
              size={118}
              className="absolute -bottom-6 right-0 md:-bottom-10 md:-right-12"
            />
          </div>
        </div>
        <ScrollCue className="absolute bottom-8 right-6 md:right-10" />
      </section>
  )
}
