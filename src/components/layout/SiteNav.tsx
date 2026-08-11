import type { Locale } from '@/lib/i18n'
import LangSwitch from './LangSwitch'

/* PC は白川郷のようにアイコン＋文字。SP は下部固定。
   EN/JP はメニューバーの下に固定する。 */

export default function SiteNav({ locale }: { locale: Locale }) {
  return (
    <header>
      {/* TODO: ナビ本体 */}
      <LangSwitch locale={locale} />
    </header>
  )
}
