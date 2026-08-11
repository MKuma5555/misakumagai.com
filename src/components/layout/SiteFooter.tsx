import type { Locale } from '@/lib/i18n'

export default function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="bg-footer text-cream">
      {/* TODO: フッター */}
      <div className="wrapper py-16">{locale}</div>
    </footer>
  )
}
