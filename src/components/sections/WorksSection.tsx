import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { GUTTER_LEFT } from '@/lib/utils'
import SectionSeparator from '@/components/ui/SectionSeparator'
import WorksSlider from '@/components/works/WorksSlider'
import { works } from '@/content/works'

/* 上下に波の区切りを置いている。波はセクションの外側にはみ出すので、
   親の <section> から relative を外さないこと。外すと画面の隅に飛ぶ。
   波の色クラス（text-sand）は、セクションの背景（bg-sand）と必ず揃える。

   上下の余白は section-y（最大 8.5rem）を使っていない。
   それだと波の区切りまで含めて1画面に収まらないため、少し詰めている。

   見出し・カード・矢印・ボタンの左位置は lib/utils.ts の GUTTER_LEFT で揃える。 */

export default function WorksSection({ locale }: { locale: Locale }) {
  const en = locale === 'en'

  // トップに出すのは featured の6件だけ。その言語で出すものに絞る
  const items = works.filter((w) => w.featured && w.showIn.includes(locale)).slice(0, 6)

  return (
    /* my-10 / md:my-20 は波の分の場所取り。
       波は absolute でセクションの外に出ているので、そのままだと
       上下の要素にとっては「無いもの」になり、重なってしまう。
       波の高さ（h-10 / md:h-20）と同じだけ余白を取れば、
       下に何が来ても重ならない。英語版は Flow が無く Contact が
       すぐ下に来るので、これが無いと帯に波が乗る。 */
    <section id="works" className="relative my-10 bg-sand md:my-20">
      <SectionSeparator kind="wave" position="top" className="text-sand" />

      <div className="py-[clamp(2.5rem,5vw,4.5rem)]">
        <div className={GUTTER_LEFT}>
          <h2 className="mb-7 inline-block border-b border-ink/40 pb-1 text-2xl md:text-3xl">
            <span className="font-mono text-base md:text-lg">03</span> Works
          </h2>
        </div>

        <WorksSlider works={items} locale={locale} />

        <div className={`mt-7 ${GUTTER_LEFT}`}>
          <Link
            href={`/${locale}/works`}
            className="group inline-flex items-center gap-3 rounded-pill border border-ink/40 px-7 py-2.5 transition-colors hover:border-olive hover:bg-cream"
          >
            {en ? 'View All' : 'すべて見る'}
            <MoveRight
              size={24}
              strokeWidth={1}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      <SectionSeparator kind="wave" position="bottom" className="text-sand" />
    </section>
  )
}
