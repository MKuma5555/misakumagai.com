import { EB_Garamond, Shippori_Mincho_B1, Zen_Kaku_Gothic_New, JetBrains_Mono } from 'next/font/google'

/* 4種まで。増やさない。
   和文は1書体で数MBあるので preload: false。
   true のままだと初回表示が和文の読み込み待ちになる。 */

const garamond = EB_Garamond({
  subsets: ['latin'], weight: ['400', '500'],
  variable: '--font-garamond', display: 'swap',
})

const shippori = Shippori_Mincho_B1({
  subsets: ['latin'], weight: ['400', '500'],
  variable: '--font-shippori', display: 'swap', preload: false,
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
  garamond.variable, shippori.variable, zen.variable, jetbrains.variable,
].join(' ')
