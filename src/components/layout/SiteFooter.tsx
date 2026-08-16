import Link from 'next/link'
import { ArrowUp, Folder, Home, Layers, Mail, User } from 'lucide-react'
import { IconBrandGithub, IconBrandInstagram, IconBrandLine, IconBrandLinkedin } from '@tabler/icons-react'
import type { Locale } from '@/lib/i18n'

/* フッター。

   ロゴは出さない（まだ無いため）。
   「MADE IN AUSTRALIA」の一文も外した。

   SNS は言語で中身が変わる。
     ja  LINE公式 / Instagram   どちらもまだ開設していない
     en  GitHub / LinkedIn

   href が空のものは出さない。押せないリンクを置かないため。
   いま ja では1つも出ないので、SNS の行ごと消える。
   アカウントを作ったら URL を入れるだけで出る。

   文字は生成りの75%。フッターの上で 5.37 あるので本文としても読める。
   60%まで下げると 4.08 で落ちるので、それ以上は薄くしないこと。

   スマホは下部にナビが固定されているので、その高さぶん余白を足してある。 */

const NAV = [
  { id: 'top', ja: 'トップ', en: 'Top', Icon: Home },
  { id: 'about', ja: 'わたしについて', en: 'About', Icon: User },
  { id: 'skills', ja: 'できること', en: 'Skills', Icon: Layers },
  { id: 'works', ja: 'つくったもの', en: 'Works', Icon: Folder },
  { id: 'contact', ja: 'ご相談', en: 'Contact', Icon: Mail },
] as const

export default function SiteFooter({ locale }: { locale: Locale }) {
  const en = locale === 'en'

  // URL が入っているものだけ出る
  const socials = en
    ? [
        { name: 'GitHub', href: 'https://github.com/MKuma5555', Icon: IconBrandGithub },
        {
          name: 'LinkedIn',
          href: 'https://www.linkedin.com/in/misa-k-609305205/',
          Icon: IconBrandLinkedin,
        },
      ]
    : [
        { name: 'LINE', href: '', Icon: IconBrandLine },
        { name: 'Instagram', href: '', Icon: IconBrandInstagram },
      ]

  const live = socials.filter((s) => s.href)

  return (
    <footer className="bg-footer text-cream">
      <div className="wrapper pb-28 pt-14 md:pb-14">
        <nav className="flex flex-wrap gap-2.5">
          {NAV.map(({ id, ja, en: labelEn, Icon }) => (
            <Link
              key={id}
              href={id === 'top' ? `/${locale}` : `/${locale}/#${id}`}
              className="inline-flex items-center gap-2 rounded-pill bg-cream/12 px-4 py-2 text-xs transition-colors hover:bg-cream/25"
            >
              <Icon size={14} />
              {en ? labelEn : ja}
            </Link>
          ))}
        </nav>

        {live.length > 0 && (
          <div className="mt-8 flex gap-5">
            {live.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-cream/75 transition-colors hover:text-cream"
              >
                <Icon size={20} stroke={1.5} />
              </a>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col gap-4 border-t border-cream/20 pt-6 text-sm text-cream/75 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] tracking-wider">
            © {new Date().getFullYear()} Misa Kumagai
          </p>

          {/* #top は「文書の先頭」を指す決まりの値。id を用意しなくても効く */}
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-cream">
            {en ? 'Back to top' : 'ページの先頭へ'}
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
