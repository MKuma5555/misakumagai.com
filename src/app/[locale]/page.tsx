import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n'
import { localeAlternates } from '@/lib/metadata'

import HeroSection from '@/components/sections/HeroSection'
import SkillsSection from '@/components/sections/SkillsSection'
import AboutSection from '@/components/sections/aboutSection/AboutSection'
import WorksSection from '@/components/sections/WorksSection'
import FlowSection from '@/components/sections/FlowSection'
import ContactBand from '@/components/sections/ContactBand'

/* トップ。セクションを上から順に並べるだけの場所。
   見た目はそれぞれのセクションが持つ。ここには書かない。

   並びは Figma の 2026.8 のフレーム順に合わせてある。
   FV → About me → Skills → Works → Flow → Contact(帯)

   Flow は ja と en で中身が別。ja は制作の流れ、en は仕事の進め方。
   ja をそのまま英訳すると「案件を受ける人」に読まれるため。
   Journey と Likes は About me の中。別セクションに割らない。

   ja と en は翻訳ではなく別編集。目的が違うので、
   出し分けは各セクションの中で locale を見て行う。

   締めの一言（ClosingNote）はここには無い。
   フッターより下に敷いて最後にめくれて出てくる作りなので、
   layout.tsx 側が持っている。 */

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = (isLocale(locale) ? locale : 'ja') as Locale
  return {
    /* 検索結果とSNSに出る一行。サイトを開いた人には見えない。
       ここは雰囲気ではなく「何をしてくれる人か」を書く場所。
       サイトの中の言葉（FV・Closing）とは役割が違うので、揃えなくてよい。 */
    description:
      l === 'en'
        ? 'Frontend developer based in Melbourne, building websites, landing pages and web applications.'
        : 'Webサイト・LP・Webアプリを作っています。',
    alternates: localeAlternates(l),
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <main>
      {/* FV は画面に貼りついたまま（sticky）。下の箱が上にかぶさって隠す */}
      <HeroSection locale={locale} />

      {/* かぶさる側。bg-cream は必須 —
          ここが透けていると、下の FV が全セクションの裏に見えたままになる。
          About は section 自身が背景を持っていないので、この箱が受け持つ。 */}
      <div className="relative z-10 bg-cream">
        <AboutSection locale={locale} />
        <SkillsSection locale={locale} />
        <WorksSection locale={locale} />
        <FlowSection locale={locale} />
        <ContactBand locale={locale} />
      </div>
    </main>
  )
}
