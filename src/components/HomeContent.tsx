'use client'

import { useState, useEffect, type CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { works } from '@/lib/works'
import ContactSection from './ContactSection'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

const portrait = '/misa-portrait.png'

export default function HomeContent({ en, locale }: { en: boolean; locale: string }) {
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

  const nav = en ? ["About", "Services", "Works", "Contact"] : ["わたしについて", "できること", "つくったもの", "ご相談"];
  const services = en
    ? [["01", "Websites", "Long-lasting digital homes for small businesses and clinics."], ["02", "Landing pages", "One focused page with a clear story and a reason to keep scrolling."], ["03", "Frontend development", "React / TypeScript products that feel calm, quick, and considered."], ["04", "Instagram consulting", "A sustainable content rhythm that sounds like your brand."]]
    : [["01", "Web制作", "小さなお店やクリニックのための、長く使えるWebサイト。"], ["02", "LP制作", "サービスの魅力が、必要な人に届く一枚のページ。"], ["03", "フロントエンド開発", "React / TypeScriptで、気持ちよく動くプロダクトを。"], ["04", "Instagramコンサル", "投稿の軸づくりから、無理なく続く運用まで。"]];

  return (
    <main className="min-h-screen bg-[#f4f0e6] text-[#2b2820] selection:bg-[#4a5e3e] selection:text-[#f4f0e6]">
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
            <p className={`reveal font-mono text-[10px] uppercase tracking-[.22em] text-[#4a5e3e] ${phase < 3 ? "opacity-0" : ""}`}>Frontend engineer / Full-stack developer</p>
            <h1 className={`reveal d1 mt-8 font-serif text-[clamp(3.6rem,8vw,8.3rem)] leading-[.88] tracking-[-.065em] ${phase < 3 ? "opacity-0" : ""}`}>{en ? <>Kind websites,<br /><em>made with care.</em></> : <>ちゃんと伝わる、<br /><em>やさしいWebを。</em></>}</h1>
            <p className={`reveal d2 mt-9 max-w-md text-[15px] leading-8 text-[#625e51] ${phase < 3 ? "opacity-0" : ""}`}>{en ? "I build digital spaces that feel human — clear for the people using them, thoughtful for the people behind them." : "使う人にはわかりやすく、つくる人には誇らしく。小さな違和感まで大切にしながら、デジタルの居場所をつくっています。"}</p>
            <a href="#about" className={`reveal d3 mt-9 inline-flex items-center gap-3 rounded-full bg-[#4a5e3e] px-6 py-3 text-sm text-[#f4f0e6] transition-transform hover:-translate-y-1 ${phase < 3 ? "opacity-0" : ""}`}>{en ? "A little about me" : "もう少し、わたしのこと"}<ArrowDown size={15} /></a>
          </div>
          <div className="relative mx-auto h-[430px] w-full max-w-[480px] md:h-[590px]">
            <div className={`focus-shift ${focus === 1 ? "is-focus" : ""} float absolute right-2 top-3 h-[84%] w-[82%] rounded-[48%_52%_42%_58%/45%_40%_60%_55%] bg-[#d6dfc9]`} />
            <div className={`focus-shift ${focus === 0 ? "is-focus" : ""} absolute bottom-8 left-0 h-[82%] w-[84%] overflow-hidden rounded-[55%_45%_48%_52%/42%_56%_44%_58%] border-[14px] border-[#ebe3d2] shadow-[0_18px_40px_rgba(43,40,32,.16)]`}>
              <img src={portrait} alt="Misa portrait" className="h-full w-full object-cover" />
            </div>
            <div className={`focus-shift ${focus === 2 ? "is-focus" : ""} absolute bottom-0 right-0 flex h-24 w-24 rotate-6 items-center justify-center rounded-full bg-[#4a5e3e] text-center font-serif text-sm leading-4 text-[#f4f0e6]`}>make<br />it kind</div>
          </div>
        </div>
        <span className="absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[.28em] text-[#8c7a55]">SCROLL TO EXPLORE</span>
      </section>

      <div className="overflow-hidden border-y border-[#d6dfc9] bg-[#2b2820] py-4 text-[#d6dfc9]">
        <div className="ticker flex w-max gap-14 whitespace-nowrap font-mono text-[10px] tracking-[.25em]">
          <span>DESIGN WITH CARE</span><span>BUILD FOR PEOPLE</span><span>AUSTRALIA / JAPAN</span><span>DESIGN WITH CARE</span><span>BUILD FOR PEOPLE</span><span>AUSTRALIA / JAPAN</span>
        </div>
      </div>

      <section id="about" className="bg-[#d6dfc9] px-6 py-32 md:px-16 md:py-44">
        <div className="mx-auto grid max-w-[1080px] gap-16 md:grid-cols-[.6fr_1.4fr]">
          <div><p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">01 / {nav[0].toUpperCase()}</p><div className="mt-8 h-px w-16 bg-[#4a5e3e]" /></div>
          <div>
            <h2 className="font-serif text-5xl leading-[.94] tracking-[-.05em] md:text-8xl">{en ? <>A technical mind,<br /><em>a generous process.</em></> : <>技術のことも、<br /><em>その先にいる人のことも。</em></>}</h2>
            <p className="mt-10 max-w-xl text-[15px] leading-8 text-[#53604d]">{en ? "I'm Misa, a frontend engineer based in Australia, working with thoughtful people and small teams in Japan and beyond. I believe the best websites leave room to breathe." : "オーストラリアを拠点に、日本のクライアントさんともお仕事をしています。コードを書くことが好き。でも、いちばん大事なのは、その先にいる人がどう感じるかだと思っています。"}</p>
            <div className="mt-12 flex flex-wrap gap-2">{["Australia / Japan", "React & TypeScript", "Astro", "日本語 / English"].map(x => <span key={x} className="rounded-full border border-[#4a5e3e]/35 px-4 py-2 font-mono text-[10px] text-[#53604d]">{x}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="skills" className="px-6 py-32 md:px-16 md:py-44">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-14 md:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">02 / {nav[1].toUpperCase()}</p>
              <h2 className="mt-9 font-serif text-5xl leading-[.9] tracking-[-.05em] md:text-8xl">{en ? <>From first thought<br /><em>to final detail.</em></> : <>思いつきから、<br /><em>最後のひと手間まで。</em></>}</h2>
              <p className="mt-9 max-w-xs text-sm leading-7 text-[#706b5d]">{en ? "I stay close to the work, from the first sketch to the small adjustments after launch." : "企画のはじまりから、公開後の小さな調整まで。すぐそばで伴走します。"}</p>
            </div>
            <div>{services.map(([n, title, body]) => <div key={n} className="group flex gap-5 border-t border-[#2b2820]/20 py-7 transition-colors hover:border-[#4a5e3e] last:border-b"><span className="font-mono text-[11px] text-[#4a5e3e]">{n}</span><div className="flex-1"><h3 className="font-serif text-3xl tracking-[-.03em]">{title}</h3><p className="mt-3 max-w-lg text-sm leading-6 text-[#706b5d]">{body}</p></div><ArrowUpRight size={18} className="mt-1 text-[#8c7a55] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div>)}</div>
          </div>
        </div>
      </section>

      <section id="works" className="bg-[#eee9dc] px-6 py-32 md:px-16 md:py-44">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col justify-between gap-9 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">03 / {nav[2].toUpperCase()}</p>
              <h2 className="mt-9 font-serif text-5xl leading-[.9] tracking-[-.05em] md:text-8xl">{en ? <>A few things<br /><em>in the world.</em></> : <>最近つくった<br /><em>もの。</em></>}</h2>
            </div>
            <p className="max-w-xs text-sm leading-7 text-[#706b5d]">{en ? "Small businesses, products, and brands — each with a different question to answer." : "小さなビジネス、プロダクト、ブランド。それぞれ違う問いに向き合った仕事です。"}</p>
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
                      <img src={work.image} alt={en ? work.titleEn : work.title} className="h-full w-full object-cover mix-blend-multiply transition duration-700 hover:scale-105" />
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

      <ContactSection en={en} nav={nav} />

      <SiteFooter en={en} locale={locale} />
    </main>
  );
}

