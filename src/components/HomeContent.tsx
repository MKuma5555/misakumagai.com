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
import SectionCurve from './SectionCurve'
import HeroSection from './HeroSection'
import WorksSection from './WorksSection'
import TechMarquee from './TechMarquee'
import SkillsSection from './SkillsSection'
import JourneySection from './JourneySection'
import BackToTop from './BackToTop'

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

      <HeroSection en={en} locale={locale} phase={phase} focus={focus} />

      <TechMarquee en={en} />

      <JourneySection en={en} />

      <SkillsSection en={en} locale={locale} label={nav[1]} services={services as [string, string, string][]} />

      <SectionCurve from="#f4f0e6" to="#eee9dc" />

      <WorksSection en={en} locale={locale} works={works} />

      <ContactBand en={en} locale={locale} />

      <SiteFooter en={en} locale={locale} />
      </main>

      <ClosingNote en={en} locale={locale} />
      {!en && <FloatingCta locale={locale} />}
    </>
  );
}

