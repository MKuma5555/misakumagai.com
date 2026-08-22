import {
  Chewy,
  Quicksand,
  Zen_Maru_Gothic,
  Zen_Kaku_Gothic_New,
  JetBrains_Mono,
  Klee_One,
} from 'next/font/google'

/* 役割ごとに1つずつ。いまは6種。

     Chewy       FVの「Hello, I'm Misa.」だけ。欧文のみ
     Quicksand   見出しの欧文。丸ゴシック
     Zen Maru    見出しの和文。Zen Kaku と同じ一家なので本文と喧嘩しない
     Zen Kaku    本文
     JetBrains   数字・ラベル
     Klee One    締めの一言だけ。ペン字。和文と欧文の両方を持っている

   和文は1書体で数MBあるので preload: false。
   true のままだと初回表示が和文の読み込み待ちになる。

   Chewy は 400 の1種類しかない。太さを指定しても変わらない。 */

const chewy = Chewy({
  subsets: ['latin'], weight: ['400'],
  variable: '--font-chewy', display: 'swap',
})

const quicksand = Quicksand({
  subsets: ['latin'], weight: ['400', '500', '600'],
  variable: '--font-quicksand', display: 'swap',
})

const zenMaru = Zen_Maru_Gothic({
  subsets: ['latin'], weight: ['400', '500', '700'],
  variable: '--font-zen-maru', display: 'swap', preload: false,
})

const zen = Zen_Kaku_Gothic_New({
  subsets: ['latin'], weight: ['400', '500', '700'],
  variable: '--font-zen', display: 'swap', preload: false,
})

/* 締めの一言だけに使う。1画面でしか出ないので preload しない。

   600 を選んでいるのは、背景に写真を敷いているから。
   400 は線が細く、写真の明るいところに乗ると読みづらい。

   和文と欧文を1つの書体でまかなえるのがこの書体の利点。
   日本語は落ち着いた楷書、英語は丸みのある手書きになり、
   同じ書体のまま言語で表情が変わる。 */
const klee = Klee_One({
  subsets: ['latin'], weight: ['600'],
  variable: '--font-klee', display: 'swap', preload: false,
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'], weight: ['400', '500'],
  variable: '--font-jetbrains', display: 'swap',
})

export const fontVariables = [
  chewy.variable, quicksand.variable, zenMaru.variable, zen.variable,
  jetbrains.variable, klee.variable,
].join(' ')
