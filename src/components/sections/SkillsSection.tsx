import { Code2, LayoutTemplate, Monitor } from 'lucide-react'
import { IconBrandInstagram } from '@tabler/icons-react'
import type { Locale } from '@/lib/i18n'
import { servicesEn, servicesJa, type Service } from '@/content/skills'
import SkillGrid from '@/components/skills/SkillGrid'

/* 左にロゴ、右にできること。

   ロゴだけだと「使ったことがあるらしい」以上のことが伝わらない。
   右で「それで何ができるのか」を受ける。

   右の中身は ja と en で変える。訳すのではなく別物にする。
     ja  受託メニュー。クライアントは「何を作ってくれるか」を見る
     en  役割。採用担当は「何ができる人か」を見る
   ja の文面をそのまま英訳すると、採用担当には
   「フリーランス志向の人」と読まれてしまう。 */

const ICON = {
  monitor: Monitor,
  layout: LayoutTemplate,
  code: Code2,
  instagram: IconBrandInstagram,
} as const

function ServiceItem({ service }: { service: Service }) {
  const Icon = ICON[service.icon]
  return (
    <li className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow text-cream">
        <Icon size={20} strokeWidth={1.6} />
      </span>
      <div>
        <h3 className="text-base">{service.title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-muted">{service.body}</p>
      </div>
    </li>
  )
}

export default function SkillsSection({ locale }: { locale: Locale }) {
  const en = locale === 'en'
  const services = en ? servicesEn : servicesJa

  return (
    <section id="skills" className="section-y wrapper">
      <header>
        <h2 className="text-3xl md:text-4xl">Skills</h2>
        <p className="mt-2 text-muted">
          {en ? 'What I build with, and what I build' : '使える技術と、できること'}
        </p>
      </header>

      <div className="mt-10 grid gap-14 md:mt-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <SkillGrid locale={locale} />

        <div className="md:border-l md:border-line md:pl-14">
          <h3 className="text-xl md:text-2xl">{en ? 'What I do' : 'できること'}</h3>
          <ul className="mt-7 space-y-7">
            {services.map((service) => (
              <ServiceItem key={service.title} service={service} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
