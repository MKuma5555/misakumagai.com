'use client'

import type { Locale } from '@/lib/i18n'
import TagPill from './TagPill'

export type Tag = { slug: string; labelJa: string; labelEn: string; group: 'industry' | 'tech' }

/* ピルを並べて押すと絞り込む。複数選択できる。
   選ばれているものはアンバー。文字は濃色（白は 2.36 で読めない）。 */

export default function TagFilter({
  locale,
  tags,
  selected,
  onToggle,
}: {
  locale: Locale
  tags: Tag[]
  selected: string[]
  onToggle: (slug: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TagPill
          key={tag.slug}
          label={locale === 'en' ? tag.labelEn : tag.labelJa}
          active={selected.includes(tag.slug)}
          onClick={() => onToggle(tag.slug)}
        />
      ))}
    </div>
  )
}
