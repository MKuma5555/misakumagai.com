'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { User, Layers, Folder, Mail, MessageCircle, Menu } from 'lucide-react'

const items = [
  { id: 'about', label: 'About', Icon: User },
  { id: 'skills', label: 'Skills', Icon: Layers },
  { id: 'works', label: 'Works', Icon: Folder },
  { id: 'contact', label: 'Contact', Icon: Mail },
] as const

export default function SiteNav({
  en,
  locale,
  visible = true,
}: {
  en: boolean
  locale: string
  visible?: boolean
}) {
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
  const otherLocale = en ? 'ja' : 'en'

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
            {items.map(({ id, label, Icon }) => (
              <Link
                key={id}
                href={href(id)}
                onClick={() => setOpen(false)}
                className="group flex h-[60px] w-[60px] items-center overflow-hidden whitespace-nowrap rounded-full bg-[#f4f0e6] text-[#4a5e3e] shadow-[0_5px_18px_rgba(43,40,32,.15)] transition-[width] duration-300 ease-out hover:w-[176px]"
              >
                <Icon size={23} className="min-w-[60px] shrink-0" />
                <span className="text-[14px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {label}
                </span>
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={`absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#f4f0e6] shadow-[0_5px_18px_rgba(43,40,32,.15)] transition-all duration-300 ${
              showCircles ? 'pointer-events-none scale-75 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            <Menu size={26} className="text-[#2b2820]" />
          </button>

          {/* 言語切替：常にメニューの直下。畳まれると一緒に上がる */}
          <Link
            href={`/${otherLocale}`}
            className="absolute left-0 flex items-center gap-1.5 rounded-xl bg-[#f4f0e6] px-3.5 py-2 font-mono text-[11px] text-[#4a5e3e] shadow-[0_5px_18px_rgba(43,40,32,.15)] transition-all duration-300"
            style={{ top: showCircles ? '298px' : '80px' }}
          >
            <span className={en ? 'text-[#2b2820]' : ''}>EN</span>
            <span className="opacity-40">|</span>
            <span className={en ? '' : 'text-[#2b2820]'}>JP</span>
          </Link>
        </div>
      </div>

      {/* ── SP：言語切替を左上に浮かせる ── */}
      <Link
        href={`/${otherLocale}`}
        className="fixed left-3 top-3 z-40 flex items-center gap-1.5 rounded-xl bg-[#f4f0e6] px-2.5 py-1.5 font-mono text-[9px] text-[#4a5e3e] shadow-[0_4px_12px_rgba(43,40,32,.14)] md:hidden"
      >
        <span className={en ? 'text-[#2b2820]' : ''}>EN</span>
        <span className="opacity-40">|</span>
        <span className={en ? '' : 'text-[#2b2820]'}>JP</span>
      </Link>

      {/* ── SP：下部固定バー ── */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#4a5e3e]/20 bg-[#eee9dc] pt-2 md:hidden pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around">
          {items.map(({ id, label, Icon }) => (
            <Link key={id} href={href(id)} className="flex flex-1 flex-col items-center gap-0.5 py-1">
              <Icon size={17} className="text-[#4a5e3e]" />
              <span className="text-[9px] text-[#706b5d]">{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* ── SP：日本語版だけ、バーとは別物体として右下に浮かせる ── */}
      {!en && (
        <a
          href={`/${locale}/#contact`}
          className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-3 z-40 inline-flex items-center gap-2 rounded-full bg-[#4a5e3e] px-4 py-2.5 text-[11px] text-[#f4f0e6] shadow-[0_6px_16px_rgba(43,40,32,.25)] md:hidden"
        >
          <MessageCircle size={15} />
          相談する
        </a>
      )}
    </>
  )
}
