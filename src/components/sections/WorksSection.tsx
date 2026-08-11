import type { Locale } from '@/lib/i18n'

/* 横スライダー。6件・自動再生・ホバーで停止・矢印で手動送り。タグは出さない */

export default function WorksSection({ locale }: { locale: Locale }) {
  return (
    <section className="section-y wrapper">
      {/* TODO */}
      <p className="font-mono text-xs text-muted">WorksSection / {locale}</p>
    </section>
  )
}
