import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Fraunces, Inter, JetBrains_Mono, Klee_One } from 'next/font/google'
import { locales, type Locale } from '@/i18n/config'
import '../globals.css'

const fraunces = Fraunces({ variable: '--font-fraunces', subsets: ['latin'], display: 'swap' })
const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' })
const jetbrains = JetBrains_Mono({ variable: '--font-jetbrains', subsets: ['latin'], display: 'swap' })
// 日本語は Klee One（硬筆・手書き寄り）。
// Frauncesは欧文専用でグリフを持たないため、これが無いと端末まかせになる。
// 日本語フォントは分割数が多いので preload は切る（切らないと初回の読み込みが重くなる）
const zen = Klee_One({
  variable: '--font-zen',
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Misa Kumagai',
  description: 'Portfolio of Misa Kumagai.',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale as Locale)) notFound()

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} ${zen.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
