import Link from 'next/link'
import { Home, User, Layers, Folder, Mail, ArrowUpRight } from 'lucide-react'

const items = [
  { id: 'top', en: 'Top', ja: 'トップ', Icon: Home },
  { id: 'about', en: 'About', ja: 'わたしについて', Icon: User },
  { id: 'skills', en: 'Skills', ja: 'できること', Icon: Layers },
  { id: 'works', en: 'Works', ja: 'つくったもの', Icon: Folder },
  { id: 'contact', en: 'Contact', ja: 'ご相談', Icon: Mail },
] as const

import { Github, Linkedin, Instagram } from './BrandIcons'

export default function SiteFooter({ en, locale }: { en: boolean; locale: string }) {
  // /ja は Instagram を前に（Instagram運用がサービスにあるため自分の運用が実力の証明になる）
  const github = { name: 'GitHub', href: 'https://github.com/MKuma5555', Icon: Github }
  const linkedin = { name: 'LinkedIn', href: 'https://www.linkedin.com/in/misa-k-609305205/', Icon: Linkedin }
  // Instagram は未開設。アカウントを作ったら instagram を配列に戻す
  // const instagram = { name: 'Instagram', href: '', Icon: Instagram }
  const socials = en ? [github, linkedin] : [linkedin, github]

  return (
    <footer className="bg-[#4a5e3e] px-6 py-14 text-[#f4f0e6] md:px-16">
      <div className="mx-auto max-w-[1240px]">
        <Link href={`/${locale}`} className="font-serif text-2xl">
          Misa <span className="text-[#d6dfc9]">.</span>
        </Link>

        <div className="mt-7 flex flex-wrap gap-2.5">
          {items.map(({ id, en: labelEn, ja: labelJa, Icon }) => (
            <Link
              key={id}
              href={`/${locale}/#${id}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#f4f0e6]/12 px-4 py-2 text-xs transition-colors hover:bg-[#f4f0e6]/22"
            >
              <Icon size={14} />
              {en ? labelEn : labelJa}
            </Link>
          ))}
        </div>

        <div className="mt-7 flex gap-4">
          {socials.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-[#d6dfc9] transition-colors hover:text-[#f4f0e6]"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[#d6dfc9]/20 pt-6 md:flex-row md:items-center">
          <span className="font-mono text-[10px] tracking-wider text-[#d6dfc9]">
            MADE IN AUSTRALIA · FOR EVERYWHERE
          </span>
          <a href="#" className="flex items-center gap-2 text-sm">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
