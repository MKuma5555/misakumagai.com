import type { Locale } from '@/lib/i18n'

/* FV。丸2つ。Hello, I'm Misa ／ 想いを、伝わる形に。右下に Scroll */

export default function HeroSection({ locale }: { locale: Locale }) {
  return (
    <section className="section-y wrapper">
      {/* TODO */}
      <p className="font-mono text-xs text-muted">HeroSection / {locale}</p>
    </section>
  )
}
