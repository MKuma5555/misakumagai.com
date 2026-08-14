import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { IconBrandInstagram, IconBrandLine, IconBrandLinkedin } from '@tabler/icons-react'
import type { Locale } from '@/lib/i18n'

/* トップの締め。フォームは持たず /contact へ送るだけ。
   フォームをトップに置くと、そこで読むのが止まる。

   右カラムは言語で中身が変わる。
     ja  LINE / Instagram   案件の相談は LINE が一番早い
     en  LinkedIn / Instagram  採用担当はまず LinkedIn を見る

   href が null のものは「準備中」として薄く出す。
   押せそうなのに押せない、を避けるためリンクにしない。
   アカウントを作ったら href を入れるだけで生きる。 */

type LinkItem = {
  Icon: (p: { size?: number; stroke?: number; className?: string }) => React.ReactNode
  label: string
  note: string | null
  href: string | null
}

export default function ContactBand({ locale }: { locale: Locale }) {
  const en = locale === 'en'

  const links: LinkItem[] = en
    ? [
        {
          Icon: IconBrandLinkedin,
          label: 'LinkedIn',
          note: null,
          href: 'https://www.linkedin.com/in/misa-k-609305205/',
        },
        { Icon: IconBrandInstagram, label: 'Instagram', note: 'Coming soon', href: null },
      ]
    : [
        { Icon: IconBrandLine, label: 'LINEで相談する', note: '準備中', href: null },
        { Icon: IconBrandInstagram, label: 'Instagram', note: '準備中', href: null },
      ]

  return (
    <section id="contact" className="bg-cream">
      <div className="mx-auto grid max-w-[1240px] md:grid-cols-[1fr_220px]">
        <div className="px-6 py-20 md:py-28 md:pl-16">
          <p className="max-w-lg text-[13px] leading-7 text-muted">
            {en
              ? 'Open to frontend roles in Australia, and to freelance work.'
              : '歯科医院のサイト、Instagramの運用、小さなお店のLP。ご相談はこちらから'}
          </p>

          <Link href={`/${locale}/contact`} className="group mt-5 inline-flex items-center gap-5">
            <span className="text-4xl tracking-[.04em] md:text-5xl">
              {en ? 'Get in touch' : 'お問い合わせ'}
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive-deep text-cream transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>

        <div className="border-t border-ink/10 md:border-l md:border-t-0">
          {links.map(({ Icon, label, note, href }, n) => {
            const inner = (
              <>
                <span className="mx-auto flex h-[26px] w-[26px] items-center justify-center text-olive-deep">
                  <Icon size={26} stroke={1.5} />
                </span>
                <span className="mt-2 block text-[11px] text-ink">{label}</span>
                {note && <span className="mt-1 block font-mono text-[9px] text-muted">{note}</span>}
              </>
            )

            const cls = `block px-4 py-8 text-center ${n === 0 ? 'border-b border-ink/10' : ''}`

            return href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cls} transition-colors hover:bg-olive/5`}
              >
                {inner}
              </a>
            ) : (
              // 準備中。押せないので薄くして、リンクにもしない
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
