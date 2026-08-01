'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/**
 * 今いるページの先頭に戻す。
 * ナビの Top はトップ「ページ」へ移動するもので、役割が違う。
 */
export default function BackToTop({ en }: { en: boolean }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={en ? 'Back to top' : 'ページの先頭に戻る'}
      className={`fixed z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#4a5e3e] text-[#f4f0e6] shadow-[0_6px_18px_rgba(43,40,32,.22)] transition-all duration-300 hover:-translate-y-1
        right-5 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-8
        ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
    >
      <ArrowUp size={19} />
    </button>
  )
}
