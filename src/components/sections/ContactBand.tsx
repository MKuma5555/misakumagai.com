import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { IconBrandGithub, IconBrandInstagram, IconBrandLine, IconBrandLinkedin } from '@tabler/icons-react'
import type { Locale } from '@/lib/i18n'
import SectionSeparator from '@/components/ui/SectionSeparator'

/* トップの締め。フォームは持たず /contact へ送るだけ。
   フォームをトップに置くと、そこで読むのが止まる。

   右カラムは言語で中身が変わる。
     ja  LINE / Instagram   案件の相談は LINE が一番早い
     en  LinkedIn / GitHub  採用担当はまず LinkedIn を見て、次にコードを見る
   en の2つはフッターには置かない。同じリンクが1画面に2回出るため。

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
        {
          Icon: IconBrandGithub,
          label: 'GitHub',
          note: null,
          href: 'https://github.com/MKuma5555',
        },
      ]
    : [
        { Icon: IconBrandLine, label: 'LINEで相談する', note: '準備中', href: null },
        { Icon: IconBrandInstagram, label: 'Instagram', note: '準備中', href: null },
      ]

  return (
    /* overflow-hidden は付けないこと。下のカーブはセクションの外（上）に
       出ているので、隠すと消える。 */
    <section id="contact" className="relative bg-yellow">
      {/* この面の黄色が、上の Flow へゆるく膨らんで食い込む。
          渡す色はこの面の色（text-yellow）。
          relative が要る（付いていないと画面の隅に飛ぶ）。 */}
      <SectionSeparator kind="curve" position="top" className="text-yellow" />

      <div className="relative mx-auto grid max-w-[1240px] md:grid-cols-[1fr_220px]">
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
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-olive-deep transition-all duration-300 group-hover:bg-olive group-hover:text-cream group-hover:translate-x-1">
  <ArrowRight size={18} />
</span>
          </Link>
        </div>

        {/* 罫線ではなくカードにする。線で区切ると「表の仕切り」に見えて、
            押せるものだと分からない。地の色を持たせて影を落とすと、
            面が浮いて押せそうに見える。 */}
        <div className="flex gap-4 px-6 pb-24 md:flex-col md:justify-center md:px-0 md:pb-10 md:pr-8">
          {links.map(({ Icon, label, note, href }) => {
            const inner = (
              <>
                <span className="mx-auto flex h-[44px] w-[44px] items-center justify-center text-olive-deep">
                  <Icon size={44} stroke={1.5} />
                </span>
                <span className="mt-2 block text-[13px] text-ink">{label}</span>
                {note && <span className="mt-1 block font-mono text-[9px] text-muted">{note}</span>}
              </>
            )

            const cls =
              'flex-1 rounded-card bg-cream px-4 py-6 text-center shadow-[0_2px_8px_rgba(63,59,48,.10)]'

            return href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                /* ぷくっと浮く。上へ動かすだけだと「ずれた」に見えるので、
                   少し大きくして影を濃くする。3つ揃って初めて浮いて見える。 */
                className={`${cls} transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.04] hover:shadow-[0_14px_30px_rgba(63,59,48,.22)]`}
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
