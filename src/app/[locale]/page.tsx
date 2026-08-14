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
import ClosingNote from '@/components/sections/ClosingNote'

/* トップ。セクションを上から順に並べるだけの場所。
   見た目はそれぞれのセクションが持つ。ここには書かない。

   並びは Figma の 2026.8 のフレーム順に合わせてある。
   FV → About me → Skills → Works → Flow → Contact(帯)

   Flow は ja と en で中身が別。ja は制作の流れ、en は仕事の進め方。
   ja をそのまま英訳すると「案件を受ける人」に読まれるため。
   Journey と Likes は About me の中。別セクションに割らない。

   ja と en は翻訳ではなく別編集。目的が違うので、
   出し分けは各セクションの中で locale を見て行う。 */

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = (isLocale(locale) ? locale : 'ja') as Locale
  return {
    description:
      l === 'en'
        ? 'Frontend developer based in Melbourne. Turning ideas into meaningful experiences.'
        : '想いを、伝わる形に。一緒に考えて、一緒につくる。',
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
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
      <SkillsSection locale={locale} />
      <WorksSection locale={locale} />
      <FlowSection locale={locale} />
      <ContactBand locale={locale} />
      <ClosingNote locale={locale} />
    </main>
  )
}
