'use client'

import { useEffect,useState } from 'react'
import type { Locale } from '@/lib/i18n'
import LangSwitch from './LangSwitch'
import Link from 'next/link'
import { Home, User, Layers, Folder, Mail, Menu } from 'lucide-react'
/* PC は白川郷のようにアイコン＋文字。SP は下部固定。
   EN/JP はメニューバーの下に固定する。 */

   const items = [
  { id: 'top', en: 'Top', ja: 'トップ', Icon: Home },
  { id: 'about', en: 'About', ja: 'わたしについて', Icon: User },
  { id: 'skills', en: 'Skills', ja: 'できること', Icon: Layers },
  { id: 'works', en: 'Works', ja: 'つくったもの', Icon: Folder },
  { id: 'contact', en: 'Contact', ja: 'ご相談', Icon: Mail },
   ]

export default function SiteNav({ locale, visible = true }: { locale: Locale; visible?: boolean }) {
  // en は locale から作れるので props では受け取らない。呼び出し側は locale だけ渡す
  const en = locale === 'en'

  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 130
      setCollapsed(past)
      if (!past) setOpen(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showCircles = !collapsed || open
  const href = (id: string) => `/${locale}/#${id}`

  return (
 <>
      {/* ── デスクトップ：左上に浮かぶ丸。スクロールで同じ位置に畳まれる ── */}
      <div
        className={`fixed left-6 top-6 z-40 hidden transition-opacity duration-500 md:block ${
          visible ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="relative">
          <div
            className={`flex flex-col gap-3.5 transition-all duration-300 ${
              showCircles ? 'scale-100 opacity-100' : 'pointer-events-none -translate-y-1.5 scale-75 opacity-0'
            }`}
          >
            {items.map(({ id, en: labelEn, ja: labelJa, Icon }) => (
              <Link
                key={id}
                href={href(id)}
                onClick={() => setOpen(false)}
                className="group flex h-[60px] w-[60px] items-center overflow-hidden whitespace-nowrap rounded-full bg-white text-olive shadow-[0_5px_18px_rgba(63,59,48,.15)] transition-[width] duration-300 ease-out hover:w-[176px]"
              >
              <span className="flex w-[60px] shrink-0 justify-center">
  <Icon size={23} />
</span>
                <span className="text-[14px] text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {en ? labelEn : labelJa}
                </span>
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={`absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-[20px] bg-white shadow-[0_5px_18px_rgba(63,59,48,.15)] transition-all duration-300 ${
              showCircles ? 'pointer-events-none scale-75 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            <Menu size={26} className="text-ink" />
          </button>

          {/* 言語切替：常にメニューの直下。畳まれると一緒に上がる */}
          <div
            className="absolute left-0 flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 font-mono text-[11px] text-olive-text shadow-[0_5px_18px_rgba(63,59,48,.15)] transition-all duration-300"
            style={{ top: showCircles ? '372px' : '80px' }}
          >
            <LangSwitch locale={locale} />
          </div>
        </div>
      </div>

      {/* ── SP：言語切替を左上に浮かせる ── */}
      <div className="fixed left-3 top-3 z-40 flex items-center gap-1.5 rounded-xl bg-white px-2.5 py-1.5 font-mono text-[9px] text-olive-text shadow-[0_4px_12px_rgba(63,59,48,.14)] md:hidden">
        <LangSwitch locale={locale} />
      </div>

      {/* ── SP：下部固定バー ── */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-olive/25 bg-sand pt-2 shadow-[0_-4px_16px_rgba(63,59,48,.10)] md:hidden pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around">
          {items.map(({ id, en: labelEn, ja: labelJa, Icon }) => (
            <Link key={id} href={href(id)} className="flex flex-1 flex-col items-center gap-0.5 py-1">
              <Icon size={17} className="text-olive-deep" />
              <span className="text-[9px] text-muted">{en ? labelEn : labelJa}</span>
            </Link>
          ))}
        </div>
      </nav>

    </>
  )
}
