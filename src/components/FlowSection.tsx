import { flow, flowIntro } from '@/content/flow'

/**
 * 制作の流れ。ja版のみ。
 * 節をつなぐ線は ::before ではなく要素で置いている（Tailwindだけで完結させるため）。
 * 線の位置は丸の中心（高さ26pxの半分＝13px）に合わせること。
 */
export default function FlowSection() {
  return (
    <section id="flow" className="bg-[#d6dfc9] px-6 py-24 md:px-16 md:py-28 md:pl-32">
      <div className="mx-auto w-full max-w-[1240px]">
        <p data-reveal className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">
          03 / 進めかた
        </p>

        <h2 data-reveal className="mt-5 font-serif text-[2rem] leading-[1.1] tracking-[-.04em] md:text-[2.6rem]">
          {flowIntro.heading.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </h2>

        <p data-reveal className="mt-4 max-w-xl text-sm leading-8 text-[#53604d]">
          {flowIntro.lead}
        </p>

        <div className="relative mt-14 grid gap-9 md:mt-16 md:grid-cols-4 md:gap-7">
          {/* 節をつなぐ線。丸の中心に合わせる */}
          <span
            aria-hidden="true"
            className="absolute left-[13px] top-[13px] bottom-[13px] w-px bg-[#4a5e3e]/28 md:bottom-auto md:left-[13px] md:right-[13px] md:h-px md:w-auto"
          />

          {flow.map((s, n) => (
            <div key={s.n} data-reveal style={{ '--d': `${n * 0.1}s` } as React.CSSProperties} className="relative">
              <span className="relative z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#4a5e3e] font-mono text-[10px] text-[#f4f0e6]">
                {s.n}
              </span>
              <h3 className="mt-5 font-serif text-xl tracking-[-.02em]">{s.title}</h3>
              <p className="mt-2.5 text-[13px] leading-[1.95] text-[#53604d]">{s.body}</p>
              <span className="mt-3 inline-block font-mono text-[10px] tracking-[.1em] text-[#4a5e3e]">
                {s.when}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
