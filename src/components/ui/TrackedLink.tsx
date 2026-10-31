'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { track, type TrackedEvent } from '@/lib/analytics'

/* 押されたことを GA に送るだけのリンク。見た目は持たない。

   中身は children で受け取るので、呼び出し側がサーバーコンポーネントのままで使える。
   これのために増えるクライアントJSは、この薄い層だけ。
   セクションごと 'use client' にすると、中のアイコンまで全部クライアントに
   運ぶことになるので、そうしない。

   外に出るリンクは <a>。next/link に外部URLを渡しても先読みは効かないので分ける。 */

type Props = {
  href: string
  event: TrackedEvent
  params?: Record<string, string>
  className?: string
  children: ReactNode
}

export default function TrackedLink({ href, event, params, className, children }: Props) {
  const onClick = () => track(event, params)

  return href.startsWith('http') ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
