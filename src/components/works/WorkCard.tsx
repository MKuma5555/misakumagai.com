import type { Locale } from '@/lib/i18n'

/* 画像・タグバッジ・短い文章。クリックで詳細へ。
   画像がない案件（NDA・未公開）は枠だけ出して
   In progress… の文字を置く。空の img は出さない。 */

export default function WorkCard({ locale }: { locale: Locale }) {
  return <article>{locale}</article> // TODO
}
