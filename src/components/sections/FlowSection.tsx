import type { Locale } from '@/lib/i18n'

/* 4ステップ。ja のみ */

export default function FlowSection({ locale }: { locale: Locale }) {
  return (
    <section className="section-y wrapper">
      {/* TODO */}
      <p className="font-mono text-xs text-muted">FlowSection / {locale}</p>
    </section>
  )
}
