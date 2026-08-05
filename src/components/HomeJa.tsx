'use client'

import { useState, useEffect } from 'react'
import type { Work } from '@/lib/works'
import Reveal from './Reveal'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import HeroSection from './HeroSection'
import TechMarquee from './TechMarquee'
import AboutSection from './AboutSection'
import SkillsSection from './SkillsSection'
import FlowSection from './FlowSection'
import SectionCurve from './SectionCurve'
import WorksStagger from './WorksStagger'
import ContactBand from './ContactBand'
import ClosingNote from './ClosingNote'
import FloatingCta from './FloatingCta'
import BackToTop from './BackToTop'

/**
 * ja版のホーム。案件獲得が目的。
 * en版（HomeContent）とは目的が違うので、翻訳ではなく別の組み立てにしている。
 *
 * 色の並びで山を作る。ここを崩すとページが平坦になる。
 *   生成り(Hero) → 墨帯(マーキー) → セージ(About) → 生成り(できること)
 *   → 淡セージ(進めかた) → 墨(Works) → 生成り(Contact) → 淡セージ(締め)
 */
export default function HomeJa({ locale, works }: { locale: string; works: Work[] }) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0)
  const [focus, setFocus] = useState(0)
  const [mounted, setMounted] = useState(false)

  // ローディング演出はサーバー側では出せない（sessionStorage を見る必要があるため）。
  // マウント後に状態を立てるしかないので、この1箇所だけルールを外す。
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    // このタブで一度見ていれば演出は飛ばす（作品ページから戻るたびに再生されるのを防ぐ）
    if (sessionStorage.getItem('misa-intro')) {
      setPhase(3)
      return
    }
    sessionStorage.setItem('misa-intro', '1')
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // ピント送りは3要素を1周したら止める。
  // 読んでいる最中にぼけ続けると単純に読みにくいため。
  useEffect(() => {
    if (phase < 3) return
    let n = 0
    const timer = window.setInterval(() => {
      n += 1
      if (n >= 3) window.clearInterval(timer)
      setFocus(n % 3)
    }, 2500)
    return () => window.clearInterval(timer)
  }, [phase])

  const services: [string, string, string][] = [
    ['01', 'Web制作', '小さなお店やクリニックのための、長く使えるWebサイト。更新のしやすさまで含めて設計します。'],
    ['02', 'LP制作', 'サービスの魅力が、必要な人に届く一枚のページ。申し込みまでの迷いを減らします。'],
    ['03', 'フロントエンド開発', 'React / TypeScript で、気持ちよく動くプロダクトを。既存サイトの改修もできます。'],
    ['04', 'Instagram運用', '投稿の軸づくりから、無理なく続く運用まで。テンプレート設計もお任せください。'],
  ]

  return (
    <>
      <main className="relative z-10 mb-[340px] min-h-screen bg-[#f4f0e6] text-[#2b2820] selection:bg-[#4a5e3e] selection:text-[#f4f0e6] md:mb-[420px]">
        <style>{`
          @keyframes rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
          @keyframes float{0%,100%{transform:rotate(-4deg) translateY(0)}50%{transform:rotate(2deg) translateY(-12px)}}
          @keyframes draw{to{stroke-dashoffset:0}}
          @keyframes cloudLeft{to{transform:translate(-38vw,-18vh) rotate(-15deg);opacity:0}}
          @keyframes cloudRight{to{transform:translate(38vw,-22vh) rotate(18deg);opacity:0}}
          @keyframes cloudUp{to{transform:translateY(-36vh) scale(1.3);opacity:0}}
          .reveal{animation:rise .85s cubic-bezier(.2,.8,.2,1) both}.d1{animation-delay:.12s}.d2{animation-delay:.24s}
          .float{animation:float 8s ease-in-out infinite}
          .draw{stroke-dasharray:700;stroke-dashoffset:700;animation:draw 1.05s .15s cubic-bezier(.7,0,.2,1) forwards}
          .cloud-left{animation:cloudLeft 1.1s .05s cubic-bezier(.2,.8,.2,1) forwards}
          .cloud-right{animation:cloudRight 1.1s .1s cubic-bezier(.2,.8,.2,1) forwards}
          .cloud-up{animation:cloudUp 1.1s .15s cubic-bezier(.2,.8,.2,1) forwards}
          .focus-shift{transition:filter 600ms ease,opacity 600ms ease;filter:blur(2px);opacity:.6}
          .focus-shift.is-focus{filter:blur(0);opacity:1}
        `}</style>

        {mounted && phase < 3 && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#2b2820]">
            <svg viewBox="0 0 500 150" className="relative z-10 w-[min(72vw,500px)]" aria-label="Misa loading">
              <text x="50%" y="58%" textAnchor="middle" className="draw" fill="none" stroke="#d6dfc9" strokeWidth="1.4" fontFamily="Fraunces, serif" fontSize="110" fontStyle="italic">Misa.</text>
            </svg>
            <div className={`cloud-left absolute -bottom-24 -left-24 h-72 w-[55vw] rounded-[55%] bg-[#4a5e3e] ${phase < 2 ? 'opacity-100' : ''}`} />
            <div className={`cloud-right absolute -bottom-28 -right-24 h-80 w-[58vw] rounded-[48%] bg-[#536947] ${phase < 2 ? 'opacity-100' : ''}`} />
            <div className={`cloud-up absolute -bottom-40 left-[32%] h-96 w-[42vw] rounded-[50%] bg-[#6c7d55] ${phase < 2 ? 'opacity-100' : ''}`} />
            <p className="absolute bottom-9 font-mono text-[9px] tracking-[.28em] text-[#d6dfc9]/70">
              {phase === 0 ? 'A LITTLE PATIENCE' : 'MADE WITH CARE'}
            </p>
          </div>
        )}

        <Reveal />
        <SiteNav en={false} locale={locale} visible={phase === 3} />

        <HeroSection en={false} locale={locale} phase={phase} focus={focus} />

        <TechMarquee en={false} />

        <AboutSection />

        <SkillsSection en={false} locale={locale} label="できること" services={services} />

        <FlowSection />

        {/* 淡セージ → 墨。ここがページで一番落差の大きい境目 */}
        <SectionCurve from="#d6dfc9" to="#2b2820" />

        <WorksStagger locale={locale} works={works} />

        <ContactBand en={false} locale={locale} />

        <SiteFooter en={false} locale={locale} />
        <BackToTop en={false} />
      </main>

      <ClosingNote en={false} locale={locale} />
      <FloatingCta locale={locale} />
    </>
  )
}
