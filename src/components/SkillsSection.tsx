'use client'

import { useState } from 'react'
import { skillGroups } from '@/content/skills'
import { TechGrid } from './TechIcon'

/**
 * 同じ枠を言語で読み替える。
 * /ja はサービスと料金、/en はカテゴリのタブで技術を切り替える。
 * 英語版で「Web制作 / LP制作」を並べると受注業者に見えてしまうため。
 */
export default function SkillsSection({
  en,
  locale,
  label,
  services,
}: {
  en: boolean
  locale: string
  label: string
  services: [string, string, string][]
}) {
  const [tab, setTab] = useState(0)
  const group = skillGroups[tab]

  return (
    <section id="skills" className="px-6 py-24 md:px-16 md:py-32 md:pl-32">
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-[.62fr_1.38fr] md:gap-12">
          <div>
            <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">
              02 / {label.toUpperCase()}
            </p>
            <h2 className="mt-6 font-serif text-[2.1rem] leading-[1.02] tracking-[-.04em] md:text-[2.9rem]">
              {en ? (
                <>What I work<br /><em>with.</em></>
              ) : (
                <>思いつきから、<br /><em>最後のひと手間まで。</em></>
              )}
            </h2>
            <p className="mt-5 max-w-xs text-[13px] leading-7 text-[#706b5d]">
              {en
                ? 'The tools I reach for. Grouped by what they do.'
                : '企画のはじまりから、公開後の小さな調整まで。すぐそばで伴走します。'}
            </p>
            {en && (
              <div className="mt-8 space-y-2.5 font-mono text-[9.5px] uppercase tracking-[.16em] text-[#706b5d]">
                <span className="flex items-center gap-2.5">
                  <span className="h-2 w-6 rounded-full bg-[#4a5e3e]" /> Professional experience
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="h-2 w-6 rounded-full bg-[#8f9a83]" /> Projects &amp; study
                </span>
              </div>
            )}
          </div>

          <div>
            {en ? (
              <div>
                <div className="flex flex-wrap gap-2">
                  {skillGroups.map((g, n) => (
                    <button
                      key={g.titleEn}
                      onClick={() => setTab(n)}
                      className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                        n === tab
                          ? 'border-[#4a5e3e] bg-[#4a5e3e] text-[#f4f0e6]'
                          : 'border-[#4a5e3e]/30 text-[#4a5e3e] hover:bg-[#4a5e3e]/8'
                      }`}
                    >
                      {g.titleEn}
                      <span className="ml-2 opacity-60">{g.items.length}</span>
                    </button>
                  ))}
                </div>

                {/* 切り替えで高さが跳ねないよう、下限を確保しておく */}
                <div key={tab} className="tab-fade mt-7 min-h-[300px]">
                  <TechGrid items={group.items} cols={4} />
                </div>
              </div>
            ) : (
              /* 文字だけのセクションなので、番号を特大にして強弱をつける。
                 ホバーで番号が濃くなり、行がわずかに右へ寄る。 */
              services.map(([n, title, body], i) => (
                <div
                  key={n}
                  data-reveal
                  style={{ '--d': `${i * 0.07}s` } as React.CSSProperties}
                  className="group flex items-baseline gap-6 border-t border-[#2b2820]/20 py-7 transition-[border-color,padding-left] duration-300 last:border-b hover:border-[#4a5e3e] md:gap-7 md:hover:pl-2.5"
                >
                  <span className="w-[52px] shrink-0 font-serif text-[34px] leading-[.9] text-[#b9c8ad] transition-colors duration-300 group-hover:text-[#4a5e3e] md:w-[78px] md:text-[52px]">
                    {n}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl tracking-[-.03em] md:text-3xl">{title}</h3>
                    <p className="mt-2.5 max-w-md text-sm leading-8 text-[#706b5d]">{body}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
