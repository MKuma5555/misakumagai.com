'use client'

import type { Locale } from '@/lib/i18n'
import TagFilter from './TagFilter'

/* 一覧。カード型＋タグで絞り込み。
   カテゴリのタブは作らない（12件に2階層は多すぎる）。 */

export default function WorksList({ locale }: { locale: Locale }) {
  return (
    <div>
      <TagFilter locale={locale} tags={[]} selected={[]} onToggle={() => {}} />
      {/* TODO: カード一覧 */}
    </div>
  )
}
