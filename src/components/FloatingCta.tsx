'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

/**
 * トップページの右下に出す相談ボタン。日本語版のみ。
 * ※ LINE公式アカウントを開設したら href を lin.ee/... に差し替える
 */
export default function FloatingCta({ locale }: { locale: string }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={`/${locale}/contact`}
      className={`fixed right-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#4a5e3e] px-5 py-3.5 text-[13px] text-[#f4f0e6] shadow-[0_8px_22px_rgba(43,40,32,.26)] transition-all duration-300 hover:-translate-y-1
        bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-8
        ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
    >
      <MessageCircle size={17} />
      相談する
    </a>
  )
}
