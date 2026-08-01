'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ContactSection from './ContactSection'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import BackToTop from './BackToTop'

export default function ContactPageContent({ en, locale }: { en: boolean; locale: string }) {
  const nav = en
    ? ['About', 'Skills', 'Works', 'Contact']
    : ['わたしについて', 'できること', 'つくったもの', 'ご相談']

  return (
    <main className="min-h-screen bg-[#f4f0e6] text-[#2b2820]">
      <SiteNav en={en} locale={locale} />
      <div className="px-6 pt-28 md:px-16 md:pl-32 md:pt-32">
        <div className="mx-auto max-w-[1240px]">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm text-[#53604d] transition-colors hover:text-[#4a5e3e]"
          >
            <ArrowLeft size={16} /> {en ? 'Back home' : 'ホームに戻る'}
          </Link>
        </div>
      </div>
      <ContactSection en={en} nav={nav} />
      <SiteFooter en={en} locale={locale} />
      <BackToTop en={en} />
    </main>
  )
}
