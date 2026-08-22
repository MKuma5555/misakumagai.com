// import type { Locale } from '@/lib/i18n'

// /* About me。3つを1つのセクションにまとめる（Figma の About me フレーム）。

//      ① About me   自己紹介
//      ② Journey    5章。もう線ではない
//      ③ Likes      好きなもの

//    別セクションに割らないこと。分けたくなったら Figma を見直す。
//    ja / en は同じ構成。文章だけ差し替える。 */

// export default function AboutSection({ locale }: { locale: Locale }) {
//   return (
//     <section className="section-y wrapper">
//       {/* TODO: ① About me */}
//       {/* TODO: ② Journey 5章 */}
//       {/* TODO: ③ Likes */}
//       <p className="font-mono text-xs text-muted">AboutSection / {locale}</p>
//     </section>
//   )
// }


'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import { AnimatePresence, motion } from 'motion/react'
import { aboutData } from './aboutData'
import SectionTitle from '@/components/ui/SectionTitle'

// 文章は aboutData が ja / en の両方を持っている。locale で選ぶだけ
export default function AboutSection({ locale }: { locale: Locale }) {

  const [activeTab, setActiveTab] = useState(0)
  const [direction, setDirection] = useState(1)

  const current = aboutData[activeTab]

  const changeTab = (nextIndex: number) => {
    if (nextIndex === activeTab) return

    setDirection(nextIndex > activeTab ? 1 : -1)
    setActiveTab(nextIndex)
  }

  /* スワイプ。払った距離と勢いの両方を見る。
     ゆっくり大きく払っても、素早く小さく払っても送れる。
     端では止める（1枚目で右に払っても何も起きない）。 */
  const onSwipe = (offsetX: number, velocityX: number) => {
    const swipe = Math.abs(offsetX) * velocityX
    if (offsetX < -60 || swipe < -600) changeTab(Math.min(activeTab + 1, aboutData.length - 1))
    else if (offsetX > 60 || swipe > 600) changeTab(Math.max(activeTab - 1, 0))
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),

    center: {
      x: 0,
      opacity: 1,
    },

    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
    }),
  }

  return (
    /* id はフッターとナビの「わたしについて」の飛び先。無いと何も起きない */
    <section id="about">
      {/* SPは縦積み、PC(md以上)は色面の上に写真を重ねる。
          並び順は order で入れ替える。HTMLの順序は変えない —
          読み上げソフトと検索エンジンには文章の順序で届いてほしいため。 */}
      {/* min-h は写真の下端より余裕を持って大きくすること。

            写真の上端 md:top-40   160px
          + 写真の高さ md:h-[480px] 480px
          = 下端                   640px

          色面は絶対配置ではなく、この箱の高さいっぱいに広がる。
          写真は絶対配置なので、高さを押し上げない。
          つまり min-h が写真より短いと、色面だけが先に終わる。

          文章の長いタブ（About / Journey）は中身で伸びるので気づけない。
          Likes は文章が短く、min-h のままになるのでそこで露出する。
          写真の高さを変えたら、ここも必ず一緒に見直すこと。 */}
      <div className="relative flex flex-col py-14 md:block md:min-h-[730px] md:py-20">
        {/* 色面。中身とは切り離した1枚の背景として敷く。
            SPは写真も文章もまるごと覆う。PCは左85%だけ（写真は右にはみ出す）。 */}
        {/* 色はクラスの付け替えで変わる。切り替えは CSS の transition に任せる。

            以前は Motion の animate に backgroundColor を渡していたが、
            渡していたのは 'bg-leaf' というクラス名で、色の値ではなかった。
            Motion は色として読めず、コンソールに警告を出し続けていた。
            実際に色を付けていたのは、下の className のほう。

            Tailwind のクラス名を、色を受け取る場所に渡さないこと。
            'bg-leaf' は「クラスの名前」であって「色」ではない。 */}
        <div
          className={`absolute inset-0 rounded-tr-[48px] transition-colors duration-[600ms] md:right-[25%] md:rounded-tr-[80px] ${current.bgColor}`}
          aria-hidden
        />

        {/* 見出し。SPは写真の上、PCは文章の上。
            本文と1つの箱に入れていたが、SPだと写真より下に落ちてしまう。
            別の箱にして order で位置を決めている。

            左の余白は 8%。画面の左上にナビの丸が固定で浮いていて、
            そこは 84px まで使われている。48px だと文章がその下に潜る。
            8% なら 1500px 幅で 120px。どの画面幅でもナビをよけられる。 */}
        <div className="relative z-10 order-1 px-8 pb-6 md:order-none md:w-[72%] md:pb-8 md:pl-[8%] md:pr-12 md:pt-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* 番号はタブが変わっても 01 のまま。セクションの通し番号であって、
                  タブの番号ではない。タブ側の番号（01/02/03）とは別物。 */}
              <SectionTitle no="01">{current.label}</SectionTitle>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 本文。SPは写真の下。
            文字の幅は色面（75%）の内側に収める。色面より広くすると、
            文章が色面からはみ出して読みにくくなる。 */}
        <div className="relative z-10 order-3 px-8 pt-8 pb-4 md:order-none md:w-[72%] md:pb-12 md:pl-[8%] md:pr-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* 1段落目だけ大きく出す。ここが章の見出し代わり。
                  2段落目からは本文の大きさ。 */}
              <div className="max-w-lg space-y-5">
                {current.body[locale].map((text, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'text-xl leading-9 md:text-2xl md:leading-[1.9]'
                        : 'leading-8 text-muted'
                    }
                  >
                    {text}
                  </p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 写真とタブ — SPは色面の中、PCは絶対配置で色面の右端にはみ出す */}
        {/* 色面を狭めたぶん、写真も左へ寄せる。
            right-12% で、色面の右端（25%）を写真が跨ぐ形になる。 */}
        <div className="relative z-10 order-2 w-full px-8 md:absolute md:top-40 md:right-[12%] md:order-none md:w-[42%] md:px-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              /* 指で払っても送れる。押せることは下の線で示しつつ、
                 スマホでは払うほうが自然なので両方受ける。 */
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => onSwipe(info.offset.x, info.velocity.x)}
              className="relative cursor-grab touch-pan-y active:cursor-grabbing"
            >
              {/* 番号。写真の左上の角に重ねる。
                  写真の枠は overflow-hidden なので、中に入れると外へ出た分が切れる。
                  外に置いて absolute で乗せている。

                  白抜き + 細い縁取り。写真は明るいところも暗いところもあるので、
                  白だけだと明るい写真の上で消える。縁取りが下限を作る。 */}
              <p
                className="pointer-events-none absolute -top-5 left-2 z-10 font-hero text-[clamp(3.2rem,11vw,5.5rem)] leading-none text-cream md:-top-8 md:left-4"
                style={{
                  WebkitTextStroke: '1.5px var(--color-ink)',
                  textShadow: '0 3px 14px rgba(63,59,48,.25)',
                }}
              >
                {current.number}
              </p>

              {/* Photo — SPは 4:5 の比率、PCは高さ 400px 固定。
                  fill を使うので親に relative が要る。
                  overflow-hidden が無いと、角丸から写真がはみ出す。

                  alt は空。隣に本文があり、写真は雰囲気を伝えるためのもの。
                  読み上げソフトに「写真」とだけ言われても情報が増えない。 */}
              {/* PCは幅42% × 高さ480px。1500px幅の画面なら 630 × 480 になる。

                  400px にしていたが、写真が引きの構図だと人が小さく見えた。
                  480 は写真の縦横比（1403:1121 ≒ 1.25）に近く、切れる量が減る。

                  これ以上高くしないこと。写真の上端は md:top-40（160px）にあり、
                  160 + 480 = 640。セクションの min-h は 650px なので、
                  520 にすると下にはみ出して次のセクションと重なる。

                  切る位置は focus（aboutData 側）で写真ごとに決める。 */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-tl-[28px] rounded-br-[28px] bg-line select-none md:aspect-auto md:h-[480px]">
                <Image
                  src={current.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 42vw, 84vw"
                  style={{ objectPosition: current.focus ?? 'center top' }}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Tabs — SPは3等分、PCは固定幅 */}
          <div className="mt-5 flex gap-3 md:mt-6 md:gap-10">
            {aboutData.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => changeTab(index)}
                aria-current={activeTab === index ? 'true' : undefined}
                className="group flex-1 text-left md:flex-none"
              >
                {/* 番号は出さない。見出し側の 01 と、写真の上の番号と、
                    ここと、3か所に数字が並ぶと何の数字か分からなくなる */}
                <p className="mb-2 text-[10px] whitespace-nowrap md:text-xs">{tab.label}</p>

                <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-neutral-300 md:w-20">
                  {activeTab === index && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 rounded-full bg-neutral-500"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}