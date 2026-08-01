import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/** 円周を回る文字の作品一覧への誘導。回るのはホバー中だけ */
export default function WorksBadge({
  en,
  locale,
  className = '',
  size = 112,
}: {
  en: boolean
  locale: string
  className?: string
  size?: number
}) {
  const text = en
    ? 'WORKS ・ VIEW ALL ・ '
    : 'WORKS ・ 作品を見る ・ '
  const core = Math.round(size * 0.45)

  return (
    <Link
      href={`/${locale}/works`}
      aria-label={en ? 'View all works' : '作品一覧を見る'}
      className={`works-badge group block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 112 112" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="works-badge-ring" d="M56 56 m -43 0 a 43 43 0 1 1 86 0 a 43 43 0 1 1 -86 0" />
        </defs>
        <g className="works-badge-ring">
          <text fontFamily="var(--font-mono)" fontSize="8.6" letterSpacing="1.6" fill="#4a5e3e">
            <textPath href="#works-badge-ring" startOffset="0">{text + text}</textPath>
          </text>
        </g>
      </svg>
      <span
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#4a5e3e] text-[#f4f0e6] transition-transform duration-300 group-hover:scale-110"
        style={{ width: core, height: core }}
      >
        <ArrowUpRight size={Math.round(core * 0.42)} />
      </span>
    </Link>
  )
}
