'use client'

import type { Locale } from '@/lib/i18n'

/* トップの横スライダー。6件。
   自動再生・ホバーとフォーカスで停止・矢印で手動送り。
   prefers-reduced-motion のときは自動再生しない。 */

export default function WorksSlider({ locale }: { locale: Locale }) {
  return <div>{locale}</div> // TODO
}
