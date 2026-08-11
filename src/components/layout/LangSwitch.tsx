'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'

/* 今いるページのまま言語だけ差し替える。
   /ja/works → /en/works。トップに戻さない。 */

export default function LangSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  return (
    <div>
      {locales.map((l) => (
        <Link
          key={l}
          href={pathname.replace(`/${locale}`, `/${l}`)}
          aria-current={l === locale ? 'true' : undefined}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
