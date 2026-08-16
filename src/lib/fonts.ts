import { Chewy, Quicksand, Zen_Maru_Gothic, Zen_Kaku_Gothic_New, JetBrains_Mono } from 'next/font/google'

/* 役割ごとに1つずつ。いまは5種。

     Chewy       FVの「Hello, I'm Misa.」だけ。欧文のみ
     Quicksand   見出しの欧文。丸ゴシック
     Zen Maru    見出しの和文。Zen Kaku と同じ一家なので本文と喧嘩しない
     Zen Kaku    本文
     JetBrains   数字・ラベル

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

const jetbrains = JetBrains_Mono({
  subsets: ['latin'], weight: ['400', '500'],
  variable: '--font-jetbrains', display: 'swap',
})

export const fontVariables = [
  chewy.variable, quicksand.variable, zenMaru.variable, zen.variable, jetbrains.variable,
].join(' ')
