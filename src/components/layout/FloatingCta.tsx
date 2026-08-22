'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, MessageCircle } from 'lucide-react'
import type { Locale } from '@/lib/i18n'

/* 右下に浮かぶボタン。行き先は言語で変える。

     ja  相談する          → /contact   案件につながる導線
     en  View all works    → /works     採用担当が一番見たいのは作品

   400px スクロールしてから出す。最初から浮いていると、
   まだ何も見ていない人に売り込むことになる。

   行き先のページにいるときは出さない。
   /works にいるのに「一覧を見る」が浮いていても意味がない。

   スマホは下部にナビが固定されているので、その上に来るよう
   bottom を計算している。env(safe-area-inset-bottom) は
   iPhone のホームバーぶんの逃げ。

   PCの bottom は 16px（md:bottom-4）。
   32px にしていたとき、ページの一番下まで来るとボタンの上端が
   フッターの境目にちょうど重なって、線を跨いだように見えた。
   下げてフッターの面の中に収めると、上に地の色が残って落ち着く。
   フッターの高さを変えたら、ここも一緒に見ること。

   ※ LINE公式アカウントを開設したら、ja の href を lin.ee/... に差し替える */

export default function FloatingCta({ locale }: { locale: Locale }) {
  const [show, setShow] = useState(false)
  const pathname = usePathname()
  const en = locale === 'en'

  const href = en ? `/${locale}/works` : `/${locale}/contact`

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 行き先にいるなら出さない
  if (pathname === href) return null

  return (
    <Link
      href={href}
      className={`fixed right-5 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40 inline-flex items-center gap-2.5 rounded-pill bg-olive px-5 py-3.5 text-[13px] text-cream shadow-[0_8px_22px_rgba(63,59,48,.26)] transition-all duration-300 hover:-translate-y-1 md:bottom-4 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      {en ? (
        <>
          View all works
          <ArrowRight size={16} />
        </>
      ) : (
        <>
          <MessageCircle size={17} />
          相談する
        </>
      )}
    </Link>
  )
}
