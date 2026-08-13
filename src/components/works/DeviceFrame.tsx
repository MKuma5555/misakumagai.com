import Image from 'next/image'

/* ノートPCとスマホの枠。作品詳細で使う。

   枠は画像ではなく CSS で描いている。画像だと解像度ごとに用意が要るうえ、
   色を変えたくなったときに作り直しになる。

   中身のスクショは縦に長くてよい。object-top で上から見せて、
   はみ出したぶんは枠で切る。サイトの「顔」は上にあるので、
   上を残して下を切るのが正しい。

   画像が無いときは枠だけ出す。空の <img> は出さない。 */

function Empty({ label }: { label: string }) {
  return (
    <span className="absolute inset-0 flex items-center justify-center bg-[#cfc9b6] font-mono text-[11px] tracking-widest text-cream">
      {label}
    </span>
  )
}

export default function DeviceFrame({
  kind,
  src,
  emptyLabel,
  sizes,
}: {
  kind: 'laptop' | 'phone'
  src?: string
  emptyLabel: string
  sizes: string
}) {
  if (kind === 'phone') {
    return (
      <div className="rounded-[2rem] border-[7px] border-ink bg-ink p-0 shadow-[0_16px_40px_rgba(63,59,48,.25)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.5rem] bg-cream">
          {/* 上の切り欠き */}
          <span className="absolute left-1/2 top-1.5 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-ink/70" />
          {src ? (
            <Image src={src} alt="" fill sizes={sizes} className="object-cover object-top" />
          ) : (
            <Empty label={emptyLabel} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* 画面 */}
      <div className="rounded-t-xl border-[10px] border-b-0 border-ink bg-ink shadow-[0_16px_40px_rgba(63,59,48,.22)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-cream">
          {src ? (
            <Image src={src} alt="" fill sizes={sizes} className="object-cover object-top" />
          ) : (
            <Empty label={emptyLabel} />
          )}
        </div>
      </div>

      {/* 土台。画面より少しだけ広くすると本物らしく見える */}
      <div className="relative -mx-[2.5%] h-3 rounded-b-xl bg-ink">
        <span className="absolute left-1/2 top-1 h-1 w-12 -translate-x-1/2 rounded-full bg-cream/25" />
      </div>
    </div>
  )
}
