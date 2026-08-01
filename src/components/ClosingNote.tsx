import Link from 'next/link'

/**
 * フッターの後ろに敷いておき、本文が上へ流れると下から現れる。
 * 画面下に固定して、本文側の余白（mb）ぶんだけ姿を見せる仕組み。
 */
export default function ClosingNote({ en, locale }: { en: boolean; locale: string }) {
  return (
    <section
      aria-label={en ? 'Closing' : '締めくくり'}
      className="fixed inset-x-0 bottom-0 -z-10 flex h-[340px] flex-col items-center justify-center bg-[#d6dfc9] px-6 text-center md:h-[420px]"
    >
      <p className="font-serif text-[1.9rem] leading-[1.55] tracking-[-.02em] text-[#2b2820] md:text-[2.4rem]">
        {en ? (
          <>Kind websites,<br /><em>made with care.</em></>
        ) : (
          <>ちゃんと伝わる、<br /><em>やさしいWebを。</em></>
        )}
      </p>
      <Link href={`/${locale}`} className="mt-8 font-serif text-xl text-[#2b2820]">
        Misa <span className="text-[#4a5e3e]">.</span>
      </Link>
    </section>
  )
}
