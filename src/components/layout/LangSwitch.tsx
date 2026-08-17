'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'

/* EN | JP。押した側の言語へ行く。

   以前は全体が1つのリンクで、どこを押しても反対側へ切り替わっていた。
   「EN」と書いてある場所を押したのに日本語になる、が起きる作りだった。
   いまは2つの別のリンクにしてある。

   今いるページのまま言語だけ差し替える。/ja/works → /en/works。
   トップに戻すと、作品を見ている途中で言語を変えた人が迷子になる。

   表示中の言語はリンクにしない。押しても同じページに行くだけなのに、
   URLの [locale] が変わったと見なされて layout ごと作り直される。

   並びは EN が先。locales（ja が先）の順ではなく、見た目の決めごと。

   色や大きさは持たない。呼び出し側の箱（SiteNav）が font-mono や
   文字色を持っていて、それを引き継ぐ。同じ部品をPCとSPで大きさ違いに
   使うので、ここで固めると片方が合わなくなる。 */

const LABEL: Record<Locale, string> = { en: 'EN', ja: 'JP' }
const ORDER: Locale[] = ['en', 'ja']

export default function LangSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  /* /ja/works → /en/works。先頭の言語ぶんだけ差し替える。
     replace で置換すると、URL の後ろに同じ文字列があったとき巻き込む。 */
  const swap = (l: Locale) => `/${l}${pathname.slice(locale.length + 1)}`

  return (
    <>
      {ORDER.map((l, i) => (
        <span key={l} className="contents">
          {i > 0 && (
            <span aria-hidden className="opacity-40">
              |
            </span>
          )}

          {l === locale ? (
            <span aria-current="page" className="text-ink">
              {LABEL[l]}
            </span>
          ) : (
            <Link href={swap(l)} className="transition-colors hover:text-ink">
              {LABEL[l]}
            </Link>
          )}
        </span>
      ))}
    </>
  )
}
