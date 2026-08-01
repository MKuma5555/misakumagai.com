'use client'

import { useState, useEffect, type CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Work } from '@/lib/works'
import ContactBand from './ContactBand'
import ClosingNote from './ClosingNote'
import FloatingCta from './FloatingCta'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import WorksBadge from './WorksBadge'
import SectionCurve from './SectionCurve'
import ScrollCue from './ScrollCue'
import TechMarquee from './TechMarquee'
import SkillsSection from './SkillsSection'
import JourneySection from './JourneySection'
import BackToTop from './BackToTop'

const portrait = '/misa-portrait.png'

export default function HomeContent({ en, locale, works }: { en: boolean; locale: string; works: Work[] }) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [focus, setFocus] = useState(0);
  // サーバー描画では出さない。初回判定がつくまで待つ
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // このタブで一度見ていれば演出は飛ばす（作品ページから戻るたびに再生されるのを防ぐ）
    if (sessionStorage.getItem('misa-intro')) {
      setPhase(3);
      return;
    }
    sessionStorage.setItem('misa-intro', '1');
    const timers = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 900), setTimeout(() => setPhase(3), 1200)];
    return () => timers.forEach(clearTimeout);
  }, []);
  useEffect(() => {
    if (phase < 3) return;
    const timer = window.setInterval(() => setFocus((value) => (value + 1) % 3), 2500);
    return () => window.clearInterval(timer);
  }, [phase]);

  const nav = en ? ["About", "Skills", "Works", "Contact"] : ["わたしについて", "できること", "つくったもの", "ご相談"];
  const services = en
    ? [["01", "Websites", "Long-lasting digital homes for small businesses and clinics."], ["02", "Landing pages", "One focused page with a clear story and a reason to keep scrolling."], ["03", "Frontend development", "React / TypeScript products that feel calm, quick, and considered."], ["04", "Instagram consulting", "A sustainable content rhythm that sounds like your brand."]]
    : [["01", "Web制作", "小さなお店やクリニックのための、長く使えるWebサイト。"], ["02", "LP制作", "サービスの魅力が、必要な人に届く一枚のページ。"], ["03", "フロントエンド開発", "React / TypeScriptで、気持ちよく動くプロダクトを。"], ["04", "Instagramコンサル", "投稿の軸づくりから、無理なく続く運用まで。"]];

  return (
    <>
    <main className="relative z-10 mb-[340px] min-h-screen bg-[#f4f0e6] text-[#2b2820] selection:bg-[#4a5e3e] selection:text-[#f4f0e6] md:mb-[420px]">
      <style>{`
        @keyframes rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:rotate(-4deg) translateY(0)}50%{transform:rotate(2deg) translateY(-12px)}}
        @keyframes ticker{to{transform:translateX(-50%)}}
        @keyframes draw{to{stroke-dashoffset:0}}
        @keyframes cloudLeft{to{transform:translate(-38vw,-18vh) rotate(-15deg);opacity:0}}
        @keyframes cloudRight{to{transform:translate(38vw,-22vh) rotate(18deg);opacity:0}}
        @keyframes cloudUp{to{transform:translateY(-36vh) scale(1.3);opacity:0}}
        .reveal{animation:rise .85s cubic-bezier(.2,.8,.2,1) both}.d1{animation-delay:.12s}.d2{animation-delay:.24s}.d3{animation-delay:.36s}
        .float{animation:float 8s ease-in-out infinite}.ticker{animation:ticker 32s linear infinite}
        .draw{stroke-dasharray:700;stroke-dashoffset:700;animation:draw 1.05s .15s cubic-bezier(.7,0,.2,1) forwards}
        .cloud-left{animation:cloudLeft 1.1s .05s cubic-bezier(.2,.8,.2,1) forwards}.cloud-right{animation:cloudRight 1.1s .1s cubic-bezier(.2,.8,.2,1) forwards}.cloud-up{animation:cloudUp 1.1s .15s cubic-bezier(.2,.8,.2,1) forwards}
        html{scroll-behavior:smooth}
        .focus-shift{transition:filter 600ms ease,opacity 600ms ease;filter:blur(2px);opacity:.6}.focus-shift.is-focus{filter:blur(0);opacity:1}
        /* 重なるカード：--stack-step ぶん止まる位置を下げ、前のカードの帯を残す。帯の高さと同じ値にする */
        .stack-card{--stack-top:88px;--stack-step:72px;position:sticky;top:calc(var(--stack-top) + var(--i,0) * var(--stack-step))}
        @media(max-width:767px){.stack-card{--stack-top:76px;--stack-step:60px}}
      `}</style>

      {mounted && phase < 3 && <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#2b2820]">
        <svg viewBox="0 0 500 150" className="relative z-10 w-[min(72vw,500px)]" aria-label="Misa loading">
          <text x="50%" y="58%" textAnchor="middle" className="draw" fill="none" stroke="#d6dfc9" strokeWidth="1.4" fontFamily="Fraunces, serif" fontSize="110" fontStyle="italic">Misa.</text>
        </svg>
        <div className={`cloud-left absolute -bottom-24 -left-24 h-72 w-[55vw] rounded-[55%] bg-[#4a5e3e] ${phase < 2 ? "opacity-100" : ""}`} />
        <div className={`cloud-right absolute -bottom-28 -right-24 h-80 w-[58vw] rounded-[48%] bg-[#536947] ${phase < 2 ? "opacity-100" : ""}`} />
        <div className={`cloud-up absolute -bottom-40 left-[32%] h-96 w-[42vw] rounded-[50%] bg-[#6c7d55] ${phase < 2 ? "opacity-100" : ""}`} />
        <p className="absolute bottom-9 font-mono text-[9px] tracking-[.28em] text-[#d6dfc9]/70">{phase === 0 ? "A LITTLE PATIENCE" : "MADE WITH CARE"}</p>
      </div>}

      <SiteNav en={en} locale={locale} visible={phase === 3} />

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

      <TechMarquee en={en} />

      <JourneySection en={en} />

      <SkillsSection en={en} locale={locale} label={nav[1]} services={services as [string, string, string][]} />

      <SectionCurve from="#f4f0e6" to="#eee9dc" />

      <section id="works" className="bg-[#eee9dc] px-6 pb-32 pt-16 md:px-16 md:pb-44 md:pt-20">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col justify-between gap-9 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">03 / {nav[2].toUpperCase()}</p>
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

      <ContactBand en={en} locale={locale} />

      <SiteFooter en={en} locale={locale} />
      </main>

      <ClosingNote en={en} locale={locale} />
      {!en && <FloatingCta locale={locale} />}
    </>
  );
}

