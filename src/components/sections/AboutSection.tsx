import type { Locale } from '@/lib/i18n'

/* About me。3つを1つのセクションにまとめる（Figma の About me フレーム）。

     ① About me   自己紹介
     ② Journey    5章。もう線ではない
     ③ Likes      好きなもの

   別セクションに割らないこと。分けたくなったら Figma を見直す。
   ja / en は同じ構成。文章だけ差し替える。 */

export default function AboutSection({ locale }: { locale: Locale }) {
  return (
    <section className="section-y wrapper">
      {/* TODO: ① About me */}
      {/* TODO: ② Journey 5章 */}
      {/* TODO: ③ Likes */}
      <p className="font-mono text-xs text-muted">AboutSection / {locale}</p>
    </section>
  )
}
