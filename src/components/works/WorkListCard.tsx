import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import { STATUS_LABEL, type Work } from '@/content/works'
import { isGroup, tagLabel } from '@/content/tags'
import Badge from '@/components/ui/Badge'

/* 一覧ページのカード。トップのスライダー用（WorkCard）とは別にしてある。

   こちらは説明文と年が入るぶん縦に長い。同じ部品にすると、
   スライダー側で文字が詰まるか、一覧側で情報が足りなくなる。

   カード上のタグは「技術」だけを、表示だけで出す。押せない。
   絞り込みは上のボタン1か所に集約する。押せる場所が2種類あると迷う。 */

export default function WorkListCard({ work, locale }: { work: Work; locale: Locale }) {
  const en = locale === 'en'
  const title = en ? work.titleEn : work.titleJa
  const summary = en ? work.summaryEn : work.summaryJa
  const status = STATUS_LABEL[work.status][en ? 'en' : 'ja']
  const techTags = work.tags.filter((t) => isGroup(t, 'tech'))

  return (
    <Link
      href={`/${locale}/works/${work.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-cream shadow-[0_2px_6px_rgba(63,59,48,.05)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_34px_rgba(63,59,48,.16)]"
    >
      {/* 写真。無いときは枠だけ */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#cfc9b6]">
        {work.thumbnail ? (
          <Image
            src={work.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-widest text-cream">
            {en ? 'In progress…' : '準備中…'}
          </span>
        )}

        <span className="absolute left-3 top-3">
          <Badge tone={work.status === 'live' ? 'amber' : 'quiet'}>{status}</Badge>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* タイトルと技術タグ。タグは折り返して title の右に並ぶ */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <h3 className="text-base leading-snug">{title}</h3>
          {techTags.map((slug) => (
            <span
              key={slug}
              className="rounded-pill border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
            >
              {tagLabel(slug, locale)}
            </span>
          ))}
        </div>

        <p className="line-clamp-2 text-sm text-muted">{summary}</p>

        <p className="mt-auto pt-1 font-mono text-[11px] text-muted">{work.year}</p>
      </div>
    </Link>
  )
}
