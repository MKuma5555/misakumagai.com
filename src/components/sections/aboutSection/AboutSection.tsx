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
import type { Locale } from '@/lib/i18n'
import { AnimatePresence, motion } from 'motion/react'
import { aboutData } from './aboutData'

// locale は今は使っていない。aboutData を ja/en に分けるときに使う
export default function AboutSection({ locale }: { locale: Locale }) {
  void locale

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
    <section>
      {/* SPは縦積み、PC(md以上)は色面の上に写真を重ねる。
          並び順は order で入れ替える。HTMLの順序は変えない —
          読み上げソフトと検索エンジンには文章の順序で届いてほしいため。 */}
      <div className="relative flex flex-col py-14 md:block md:py-20">
        {/* 色面。中身とは切り離した1枚の背景として敷く。
            SPは写真も文章もまるごと覆う。PCは左85%だけ（写真は右にはみ出す）。 */}
        <motion.div
          animate={{
            backgroundColor: current.bgColor,
          }}
          transition={{
            duration: 0.6,
          }}
          className="absolute inset-0 rounded-tr-[48px] md:right-[15%] md:rounded-tr-[80px]"
          aria-hidden
        />

        {/* テキスト */}
        <div className="relative z-10 order-4 px-8 pt-8 pb-4 md:order-none md:min-h-[650px] md:w-[85%] md:px-12 md:py-12">
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
            >
              <h2 className="mb-5 text-3xl md:mb-8 md:text-5xl">{current.title}</h2>

              <p className="max-w-lg leading-8">{current.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 写真とタブ — SPは色面の中、PCは絶対配置で色面の右端にはみ出す */}
        <div className="relative z-10 order-1 w-full px-8 md:absolute md:top-40 md:right-[5%] md:order-none md:w-[42%] md:px-0">
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
              className="cursor-grab touch-pan-y active:cursor-grabbing"
            >
              {/* Number */}
              <p className="mb-3 text-4xl italic md:text-5xl">{current.number}</p>

              {/* Photo — 高さを固定せず 4:5 の比率で。画面幅に応じて伸び縮みする */}
              <div className="flex aspect-[4/5] items-center justify-center rounded-tl-[28px] rounded-br-[28px] bg-neutral-500 text-4xl text-white select-none md:aspect-auto md:h-[400px]">
                {current.label}
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
                <p className="mb-2 text-[10px] whitespace-nowrap md:text-xs">
                  {tab.number}. {tab.label}
                </p>

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