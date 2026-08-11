import type { Locale } from '@/lib/i18n'

/* アイコンが中央から散らばる（GSAP + Flip + ScrollTrigger）。ホバーで動く。ja/en 共通 */

export default function SkillsSection({ locale }: { locale: Locale }) {
  return (
    <section className="section-y wrapper">
      {/* TODO */}
      <p className="font-mono text-xs text-muted">SkillsSection / {locale}</p>
    </section>
  )
}
