'use client'

import { motion } from 'motion/react'
import { Mail, MessagesSquare, NotebookPen, PenLine, Rocket, Search } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { flowEn, flowJa, type FlowStep } from '@/content/flow'
import { cx } from '@/lib/utils'

/* 4ステップのカード。ja は制作の流れ、en は仕事の進め方。

   ── 番号の置き方 ──
   PC  カードの上端の線に重なる位置。数字が線をまたいで見える
   SP  カードの左枠に重なる位置
   どちらも枠を跨ぐのがデザインの特徴。カードの内側に収めない。

   番号はカードの「中」に置いてある（absolute で外へ出している）。
   カードの外に出すと、ホバーでカードだけが浮いて番号が取り残される。

   スクロールで見えたら 01 から順にじわっと出す。
   バネではなく素直なフェード。手順の説明で弾ませると落ち着かない。 */

const ICON = {
  mail: Mail,
  search: Search,
  pen: PenLine,
  rocket: Rocket,
  note: NotebookPen,
  ask: MessagesSquare,
} as const

/* 地の色を敷いているのは、下を通るカードの枠線を消すため。
   数字の後ろで線が続いて見えると、乗せただけに見える。
   カードもページも生成りなので、同じ色で隠せる。 */
function StepNumber({ item, className }: { item: FlowStep; className?: string }) {
  return (
    <div className={cx('bg-cream text-center', className)}>
      <p className="font-serif text-2xl leading-none text-muted md:text-[28px]">{item.step}</p>
      <p className="mt-1 font-mono text-[10px] tracking-widest text-muted">step</p>
    </div>
  )
}

/* 点と線。カード4枚をまたぐ1枚の層として、カードの外に置く。

   カードの中に入れると、ホバーでカードが浮いたときに線も一緒に動いて、
   そこだけ途切れて見える。外に出しておけば線は動かず、
   カードが線から浮き上がる形になる。

   位置は上から 36px（カードの md:pt-9 と同じ）。
   カードの内側の場所取り（h-2）と合わせてある。
   -mx-2.5（10px）が gap-x-5（20px）の半分。左右から伸びて隣と出会う。 */
function Connector({ count }: { count: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-9 z-10 hidden grid-cols-4 gap-x-5 md:grid"
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="-mx-2.5 flex items-center">
          <span className={cx('h-px flex-1 bg-line', i === 0 && 'invisible')} />
          <span className="h-2 w-2 shrink-0 rounded-full bg-olive-deep" />
          <span className={cx('h-px flex-1 bg-line', i === count - 1 && 'invisible')} />
        </div>
      ))}
    </div>
  )
}

function Card({ item, index }: { item: FlowStep; index: number }) {
  const Icon = ICON[item.icon]

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35, margin: '-8%' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.13 }}
      className="pl-7 md:pl-0"
    >
      {/* 番号はカードの中に置く。外に出すと、ホバーでカードだけが動いて番号が取り残される */}
      <div className="relative rounded-[2rem] border border-line bg-cream p-6 pl-10 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_16px_34px_rgba(63,59,48,.16)] md:rounded-[20px] md:px-7 md:pb-7 md:pl-7 md:pt-9">
        {/* SP の番号。カードの左枠に重なる位置 */}
        <StepNumber item={item} className="absolute -left-7 top-6 z-10 w-11 py-1 md:hidden" />

        {/* PC の番号。カードの上端の線に重なる位置 */}
        <StepNumber
          item={item}
          className="absolute -top-5 left-1/2 z-10 hidden -translate-x-1/2 px-3 md:block"
        />

        {/* 点と線が入る高さぶんの場所取り。線そのものはカードの外にある */}
        <div aria-hidden className="hidden h-2 md:block" />

        {/* アイコンと見出し。SPは横並び、PCは縦 */}
        <div className="flex items-center gap-4 md:mt-7 md:flex-col md:gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-olive-deep/8 text-olive-deep md:h-14 md:w-14">
            <Icon size={24} strokeWidth={1.4} />
          </span>
          <h3 className="text-lg md:text-center md:text-xl">{item.title}</h3>
        </div>

        <p className="mt-4 text-sm leading-7 text-muted">{item.body}</p>

        {item.note && (
          <p className="mt-5 border-t border-line pt-4 text-center font-mono text-[11px] text-muted">
            {item.note}
          </p>
        )}
      </div>
    </motion.li>
  )
}

export default function FlowSection({ locale }: { locale: Locale }) {
  const en = locale === 'en'
  const steps = en ? flowEn : flowJa

  return (
    <section id="flow" className="section-y wrapper">
      <header>
        <h2 className="text-3xl md:text-4xl">{en ? 'How I work' : 'Flow'}</h2>
        <p className="mt-2 text-muted">
          {en ? 'What I keep in mind when I build' : 'ご相談から公開までの流れ'}
        </p>
      </header>

      <div className="relative mt-12 md:mt-16">
        <Connector count={steps.length} />

        <ol className="grid gap-5 md:grid-cols-4 md:gap-x-5">
          {steps.map((item, i) => (
            <Card key={item.step} item={item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
