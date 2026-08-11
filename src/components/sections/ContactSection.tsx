import type { Locale } from '@/lib/i18n'

/* ja は LINE あり、en は Contact のみ。トップと /contact で使い回す */

export default function ContactSection({ locale }: { locale: Locale }) {
  return (
    <section className="section-y wrapper">
      {/* TODO */}
      <p className="font-mono text-xs text-muted">ContactSection / {locale}</p>
    </section>
  )
}
