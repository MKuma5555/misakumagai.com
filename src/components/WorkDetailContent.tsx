'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react'
import type { Work } from '@/lib/works'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import BackToTop from './BackToTop'

export default function WorkDetailContent({ work, en, locale }: { work: Work; en: boolean; locale: string }) {
  if (!work) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f4f0e6] px-6 text-[#2b2820]">
        <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">404</p>
        <h1 className="mt-6 font-serif text-5xl tracking-[-.05em]">Work not found</h1>
        <Link href={`/${locale}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#4a5e3e] px-6 py-3 text-sm text-[#f4f0e6] transition-transform hover:-translate-y-1">
          <ArrowLeft size={16} /> Back home
        </Link>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-[#f4f0e6] text-[#2b2820] selection:bg-[#4a5e3e] selection:text-[#f4f0e6]">
      <SiteNav en={en} locale={locale} />

      <section className="relative px-6 pb-20 pt-32 md:px-16 md:pt-40">
        <div className="mx-auto max-w-[1080px]">
          <Link href={`/${locale}/works`} className="inline-flex items-center gap-2 text-sm text-[#53604d] transition-colors hover:text-[#4a5e3e]">
            <ArrowLeft size={16} /> {en ? "Back to works" : "作品一覧に戻る"}
          </Link>

          <div className="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">{work.id} / {en ? work.typeEn : work.type}</p>
              <h1 className="mt-5 font-serif text-5xl leading-[.92] tracking-[-.05em] md:text-7xl">{en ? work.titleEn : work.title}</h1>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm md:flex md:flex-col md:gap-2 md:text-right">
              <div>
                <span className="font-mono text-[9px] tracking-[.2em] text-[#706b5d]">{en ? "CLIENT" : "クライアント"}</span>
                <p className="mt-1">{en ? work.clientEn : work.client}</p>
              </div>
              <div>
                <span className="font-mono text-[9px] tracking-[.2em] text-[#706b5d]">{en ? "ROLE" : "担当"}</span>
                <p className="mt-1">{en ? work.roleEn : work.role}</p>
              </div>
              <div>
                <span className="font-mono text-[9px] tracking-[.2em] text-[#706b5d]">{en ? "YEAR" : "時期"}</span>
                <p className="mt-1">{work.year}</p>
              </div>
            </div>
          </div>

          {/* デバイス表示。
             実機のフレーム画像は使わず角丸の板だけにしている（サイトのトーンに合わせるため）。
             横に並べず、PCの右下にスマホを重ねる。「重ねる」はAboutの写真と共通の文法。
             中身はゆっくり縦に流れる（globals.css の device-creep）。
             スマホ側はSanityの「スマホのスクリーンショット」。入れていなければ枠ごと出さない。
             PCの画面をスマホの枠に入れても縮んだPCにしか見えないので、代用はしない。 */}
          <div className="relative mt-12 pb-10 md:pb-14">
            <div className="w-full overflow-hidden rounded-lg border border-[#2b2820]/12 bg-white shadow-[0_30px_70px_rgba(43,40,32,.13)] md:w-[88%]">
              <div className="flex h-[34px] items-center gap-1.5 border-b border-[#2b2820]/10 bg-[#f2efe6] px-3.5">
                <span className="block h-[9px] w-[9px] rounded-full bg-[#d5d0c0]" />
                <span className="block h-[9px] w-[9px] rounded-full bg-[#d5d0c0]" />
                <span className="block h-[9px] w-[9px] rounded-full bg-[#d5d0c0]" />
              </div>
              <div className="h-[240px] overflow-hidden md:h-[460px]">
                {work.image && (
                  <img
                    src={work.image}
                    alt={en ? work.titleEn : work.title}
                    className="device-creep w-full"
                  />
                )}
              </div>
            </div>

            {work.mobileShot && (
              <div className="-mt-12 ml-auto w-[150px] overflow-hidden rounded-xl border border-[#2b2820]/12 bg-white shadow-[0_24px_60px_rgba(43,40,32,.18)] md:absolute md:bottom-0 md:right-0 md:mt-0 md:w-[210px]">
                <div className="h-[250px] overflow-hidden md:h-[380px]">
                  <img
                    src={work.mobileShot}
                    alt=""
                    className="device-creep device-creep-slow w-full"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-14 max-w-2xl">
            <p className="text-lg leading-9 text-[#53604d]">{en ? work.descriptionEn : work.description}</p>

            {/* 作品を見て「これがいい」と思った人を、その場で問い合わせにつなげる */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/#contact`}
                className="inline-flex items-center gap-2 rounded-full bg-[#4a5e3e] px-7 py-3.5 text-sm text-[#f4f0e6] transition-colors hover:bg-[#3b4d31]"
              >
                {en ? 'Start a similar project' : '似た制作を相談する'}
              </Link>
              {work.liveUrl && (
                <a
                  href={work.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#4a5e3e]/35 px-7 py-3.5 text-sm text-[#4a5e3e] transition-colors hover:bg-[#4a5e3e] hover:text-[#f4f0e6]"
                >
                  {en ? 'Visit the site' : 'サイトを見る'} <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eee9dc] px-6 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-[1080px] space-y-16">
          <div className="grid gap-10 md:grid-cols-[.3fr_.7fr]">
            <div>
              <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">{en ? "01 / CHALLENGE" : "01 / 課題"}</p>
              <div className="mt-4 h-px w-12 bg-[#4a5e3e]" />
            </div>
            <div>
              <h2 className="font-serif text-3xl leading-[1.1] tracking-[-.03em] md:text-4xl">{en ? work.challengeEn : work.challenge}</h2>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-[.3fr_.7fr]">
            <div>
              <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">{en ? "02 / APPROACH" : "02 / アプローチ"}</p>
              <div className="mt-4 h-px w-12 bg-[#4a5e3e]" />
            </div>
            <div>
              <h2 className="font-serif text-3xl leading-[1.1] tracking-[-.03em] md:text-4xl">{en ? work.approachEn : work.approach}</h2>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-[.3fr_.7fr]">
            <div>
              <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">{en ? "03 / OUTCOME" : "03 / 結果"}</p>
              <div className="mt-4 h-px w-12 bg-[#4a5e3e]" />
            </div>
            <div>
              <h2 className="font-serif text-3xl leading-[1.1] tracking-[-.03em] md:text-4xl">{en ? work.outcomeEn : work.outcome}</h2>
            </div>
          </div>
        </div>
      </section>

      {work.gallery.length > 1 && (
        <section className="px-6 py-24 md:px-16 md:py-32">
          <div className="mx-auto max-w-[1080px]">
            <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">{en ? "GALLERY" : "ギャラリー"}</p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {work.gallery.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-[1.2rem] shadow-[0_12px_30px_rgba(43,40,32,.1)]">
                  <img src={img} alt={`${en ? work.titleEn : work.title} ${i + 1}`} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#2b2820] px-6 py-24 text-[#f4f0e6] md:px-16 md:py-32">
        <div className="mx-auto max-w-[1080px] text-center">
          <h2 className="font-serif text-4xl leading-[.95] tracking-[-.04em] md:text-6xl">{en ? <>Like what you see?<br /><em>Let&apos;s talk.</em></> : <>気になることが<br /><em>ありましたら。</em></>}</h2>
          <Link href={`/${locale}/#contact`} className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#4a5e3e] px-7 py-3.5 text-sm text-[#f4f0e6] transition-transform hover:-translate-y-1">
            {en ? "Start a conversation" : "ご相談する"} <Mail size={16} />
          </Link>
        </div>
      </section>

      <SiteFooter en={en} locale={locale} />
      <BackToTop en={en} />
    </main>
  );
}

