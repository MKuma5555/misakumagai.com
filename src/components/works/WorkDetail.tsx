import type { Locale } from '@/lib/i18n'

/* 課題 → アプローチ → 結果。ノートPCとスマホの枠で見せる。 */

export default function WorkDetail({ locale, slug }: { locale: Locale; slug: string }) {
  return (
    <article>
      {locale} / {slug}
    </article>
  ) // TODO
}
