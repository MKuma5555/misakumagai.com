import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
// lucide には各社のロゴが無い（商標のため削除された）。ブランド系は tabler を使う
import { IconBrandGithub } from '@tabler/icons-react'
import type { Locale } from '@/lib/i18n'
import { STATUS_LABEL, type Work } from '@/content/works'
import { isGroup, tagLabel } from '@/content/tags'
import Badge from '@/components/ui/Badge'
import DeviceFrame from './DeviceFrame'

/* 作品詳細。

   並びは「見せる → 説明する」。先に画面を見せて、
   何のサイトか分かってから文章に入る。逆にすると読まれない。

   外部リンクは rel="noopener noreferrer" を必ず付ける。
   付けないと、開いた先のページから元のタブを操作できてしまう。

   作品は自分で探さない。ページ側が Sanity から1件取って渡す。
   「その言語で出すか」「無ければ404」の判断もページ側でやる。 */

export default function WorkDetail({ work, locale }: { work: Work; locale: Locale }) {
  const en = locale === 'en'
  const title = en ? work.titleEn : work.titleJa
  const summary = en ? work.summaryEn : work.summaryJa
  const overview = en ? work.overviewEn : work.overviewJa
  const points = (en ? work.pointsEn : work.pointsJa) ?? []
  const role = en ? work.roleEn : work.roleJa
  const status = STATUS_LABEL[work.status][en ? 'en' : 'ja']
  const techTags = work.tags.filter((t) => isGroup(t, 'tech'))
  const typeTags = work.tags.filter((t) => isGroup(t, 'type'))

  return (
    <article>
      <Link
        href={`/${locale}/works`}
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} />
        {en ? 'Back to works' : '一覧に戻る'}
      </Link>

      {/* 見出し */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge tone={work.status === 'live' ? 'amber' : 'quiet'}>{status}</Badge>
          {typeTags.map((slug) => (
            <span key={slug} className="text-sm text-muted">
              {tagLabel(slug, locale)}
            </span>
          ))}
          <span className="font-mono text-sm text-muted">{work.year}</span>
        </div>

        <h1 className="mt-4 text-3xl leading-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-[60ch] text-muted">{summary}</p>
      </header>

      {/* 画面。ノートPCの右下にスマホを重ねる。SPは縦に並べる */}
      <div className="relative mt-12 md:mt-16 md:pb-16 md:pr-[16%]">
        <DeviceFrame
          kind="laptop"
          src={work.screenshotDesktop}
          emptyLabel={en ? 'Desktop' : 'PC画面'}
          sizes="(min-width: 768px) 70vw, 92vw"
        />

        <div className="mx-auto mt-8 w-[52%] max-w-[220px] md:absolute md:right-0 md:bottom-0 md:mt-0 md:w-[26%] md:max-w-none">
          <DeviceFrame
            kind="phone"
            src={work.screenshotMobile}
            emptyLabel={en ? 'Mobile' : 'スマホ画面'}
            sizes="(min-width: 768px) 22vw, 50vw"
          />
        </div>
      </div>

      {/* リンク。実在するURLがあるときだけ出す */}
      {(work.liveUrl || work.repoUrl) && (
        <div className="mt-12 flex flex-wrap gap-3">
          {work.liveUrl && (
            <a
              href={work.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-pill bg-amber px-6 py-2.5 text-ink transition-transform hover:-translate-y-0.5"
            >
              {en ? 'Visit site' : 'サイトを見る'}
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          )}

          {work.repoUrl && (
            <a
              href={work.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-pill border border-line px-6 py-2.5 text-ink transition-colors hover:border-olive"
            >
              <IconBrandGithub size={17} stroke={1.6} />
              {en ? 'Source' : 'コード'}
            </a>
          )}
        </div>
      )}

      {/* 概要とポイント。左に本文、右に担当と技術 */}
      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1fr_240px] md:gap-16">
        <div>
          {overview && (
            <section>
              <h2 className="text-xl md:text-2xl">{en ? 'Overview' : '概要'}</h2>
              <p className="mt-4 max-w-[62ch] leading-8">{overview}</p>
            </section>
          )}

          {points.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl md:text-2xl">{en ? 'Points' : 'ポイント'}</h2>
              <ul className="mt-5 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex gap-3 leading-8">
                    <span aria-hidden className="mt-3.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6 text-sm md:border-l md:border-line md:pl-8">
          {role && (
            <div>
              <p className="font-mono text-[11px] tracking-widest text-muted">
                {en ? 'ROLE' : '担当'}
              </p>
              <p className="mt-1.5">{role}</p>
            </div>
          )}

          {techTags.length > 0 && (
            <div>
              <p className="font-mono text-[11px] tracking-widest text-muted">
                {en ? 'STACK' : '使用技術'}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {techTags.map((slug) => (
                  <span
                    key={slug}
                    className="rounded-pill border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
                  >
                    {tagLabel(slug, locale)}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="font-mono text-[11px] tracking-widest text-muted">
              {en ? 'YEAR' : '年'}
            </p>
            <p className="mt-1.5 font-mono">{work.year}</p>
          </div>
        </aside>
      </div>
    </article>
  )
}
