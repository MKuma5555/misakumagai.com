'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import type { Work } from '@/content/works'
import { tagsOf } from '@/content/tags'
import { cx } from '@/lib/utils'
import WorkListCard from './WorkListCard'

/* 一覧。上に「種類」のボタン、下に3列のカード。

   絞り込みの状態は useState ではなく URL に持たせている。
   /ja/works?tag=lp のようになるので、
     ・「LPの実績です」とURLで送れる
     ・戻るボタンで前の絞り込みに戻れる
     ・Google が別ページとして拾える
   その代わり useSearchParams を使うので、呼び出し側で
   <Suspense> に入れる必要がある（works/page.tsx でやっている）。

   ボタンは <Link> にしてある。<button> にすると、
   リンクとして開いたり共有したりできない。

   該当が0件の種類はボタン自体を出さない。
   押しても何も出ないボタンを作らないため。

   作品は自分で読まない。ページ（サーバー側）が Sanity から取って渡す。
   ここはブラウザ側で動くので、ここから取りに行くと
   Sanity のキーがブラウザに出るうえ、表示が一拍遅れる。 */

export default function WorksList({ works, locale }: { works: Work[]; locale: Locale }) {
  const pathname = usePathname()
  const params = useSearchParams()
  const active = params.get('tag') ?? ''
  const en = locale === 'en'

  // その言語で出すものだけ
  const visible = works.filter((w) => w.showIn.includes(locale))

  // 中身のある種類だけボタンにする
  const types = tagsOf('type').filter((t) => visible.some((w) => w.tags.includes(t.slug)))

  const items = active ? visible.filter((w) => w.tags.includes(active)) : visible

  const href = (slug: string) => (slug ? `${pathname}?tag=${slug}` : pathname)

  return (
    <>
      {/* 戻り先はトップの一番上ではなく Works のセクション（#works）。
          ここへ来た人はトップのWorksから来ているので、その場所に返す。
          一番上に戻すと、また下までスクロールし直すことになる。

          詳細ページの「一覧に戻る」と同じ形・同じ位置に置いてある。
          戻る導線が階層ごとに違う場所にあると、探すことになる。 */}
      <Link
        href={`/${locale}/#works`}
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} />
        {en ? 'Back to top page' : 'トップに戻る'}
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl md:text-5xl">Works</h1>
        <p className="mt-2 text-muted">{en ? 'Selected work' : '制作実績'}</p>
      </header>

      {/* 種類のボタン。scroll={false} で、押したときに上へ飛ばさない */}
      <nav className="mt-8 flex flex-wrap gap-2.5">
        {[{ slug: '', labelJa: 'すべて', labelEn: 'All' }, ...types].map((t) => {
          const on = active === t.slug
          return (
            <Link
              key={t.slug || 'all'}
              href={href(t.slug)}
              scroll={false}
              aria-current={on ? 'true' : undefined}
              className={cx(
                'rounded-pill px-4 py-1.5 text-sm transition-colors',
                on
                  ? 'bg-amber text-ink'
                  : 'border border-line text-muted hover:border-olive hover:text-ink',
              )}
            >
              {en ? t.labelEn : t.labelJa}
            </Link>
          )
        })}
      </nav>

      <p className="mt-5 font-mono text-xs text-muted">
        {items.length} / {visible.length}
      </p>

      {items.length === 0 ? (
        <p className="mt-10 text-muted">{en ? 'Nothing here yet.' : 'まだありません。'}</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((work) => (
            <WorkListCard key={work.slug} work={work} locale={locale} />
          ))}
        </div>
      )}
    </>
  )
}
