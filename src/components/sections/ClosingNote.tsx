import type { Locale } from '@/lib/i18n'

/* 締めの一言 */

export default function ClosingNote({ locale }: { locale: Locale }) {
  return (
    <section className="section-y wrapper">
      {/* TODO */}
      <p className="font-mono text-xs text-muted">ClosingNote / {locale}</p>
    </section>
  )
}
