import Link from 'next/link'
import { ArrowRight, MessageCircle as LineIcon } from 'lucide-react'
import { Linkedin, Instagram } from './BrandIcons'

/** LPの締め。フォームは持たず、/contact へ送るだけ */
export default function ContactBand({ en, locale }: { en: boolean; locale: string }) {
  // 右カラムは言語で中身が変わる。1つ目が主、2つ目は準備中
  const links = en
    ? [
        {
          Icon: Linkedin,
          label: 'LinkedIn',
          note: null as string | null,
          href: 'https://www.linkedin.com/in/misa-k-609305205/',
        },
        { Icon: Instagram, label: 'Instagram', note: 'Coming soon', href: null },
      ]
    : [
        { Icon: (p: { className?: string }) => <LineIcon className={p.className} />, label: 'LINEで相談する', note: '準備中' as string | null, href: null },
        { Icon: Instagram, label: 'Instagram', note: '準備中', href: null },
      ]

  return (
    <section id="contact" className="border-t border-[#2b2820]/10 bg-[#f4f0e6]">
      <div className="mx-auto grid max-w-[1240px] md:grid-cols-[1fr_220px]">
        <div className="px-6 py-20 md:py-28 md:pl-16">
          <p className="max-w-lg text-[13px] leading-7 text-[#706b5d]">
            {en
              ? 'Open to frontend roles in Australia, and to freelance work.'
              : '歯科医院のサイト、Instagramの運用、小さなお店のLP。ご相談はこちらから'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="group mt-5 inline-flex items-center gap-5"
          >
            <span className="font-serif text-4xl tracking-[.04em] text-[#2b2820] md:text-5xl">
              {en ? 'Get in touch' : 'お問い合わせ'}
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4a5e3e] text-[#f4f0e6] transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>

        <div className="border-t border-[#2b2820]/10 md:border-l md:border-t-0">
          {links.map(({ Icon, label, note, href }, n) => {
            const inner = (
              <>
                <span className="mx-auto flex h-[26px] w-[26px] items-center justify-center text-[#4a5e3e]">
                  <Icon className="h-[26px] w-[26px]" />
                </span>
                <span className="mt-2 block text-[11px] text-[#2b2820]">{label}</span>
                {note && (
                  <span className="mt-1 block font-mono text-[9px] text-[#706b5d]">{note}</span>
                )}
              </>
            )
            const cls = `block px-4 py-8 text-center ${n === 0 ? 'border-b border-[#2b2820]/10' : ''}`
            return href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cls} transition-colors hover:bg-[#4a5e3e]/5`}
              >
                {inner}
              </a>
            ) : (
              <div key={label} className={`${cls} opacity-50`}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
