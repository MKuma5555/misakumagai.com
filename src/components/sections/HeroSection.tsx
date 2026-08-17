import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { cx } from '@/lib/utils'

/* FV。1画面ぴったり。

   右に切り抜きの絵、左に文字、余白は Loading と同じ形（blobs）で埋める。
   形はゆっくり漂わせる。

   絵と文字は中の箱（max-w-[1500px]）からの割合。
   画面からの割合にすると、横に広い画面で左右へ引き伸ばされて真ん中が空く。
   飾りの形だけは逆で、画面の縁が基準。縁から離れると浮いて見える。

   高さは h-svh。100vh はスマホのアドレスバーぶん画面より大きくなり、下がはみ出す。
   形は箱の外へわざとはみ出させているので、overflow-hidden が要る。
   これが無いと横スクロールが出る。

   sticky top-0 で画面の上に貼りついたまま、次のセクションが上にかぶさる。
   ページの最後の Closing と対になっている（入口で敷いて、出口でめくれる）。
   かぶさる側（page.tsx の z-10 の箱）に背景色が要る。
   透けているとここが見えたままになる。 */

/* 主役の絵。切り抜き済みの透過画像なので、丸で囲わずそのまま置く。
   写真だった頃は blob 型に切り抜いていたが、絵の輪郭がすでに形になっている。
   囲うと形が二重になって窮屈に見える。

   写真に戻すときは、下の <Image> に object-cover と丸い枠を付け直すこと。
   そのままだと、余白の中に小さく収まってしまう。 */
const ILLUST = '/images/fv/illust.webp'

/* 飾りの形。Loading と同じ4枚を使い回している。
   画面の縁からわざとはみ出させて、続きがあるように見せる。

     x, y   置く位置（％。形の左上）
     w      PC での幅（vw）
     wSp    スマホでの幅（vw）。0 ならスマホには出さない
     fx, fy 漂う向きと振れ幅
     fr     傾く角度
     dur    1往復にかかる時間
     delay  始まりをずらす。揃うと全部が同じ動きになる

   幅を vw で持つと、同じ数字でも画面が狭いほど小さくなる。
   11vw は PC で 170px、スマホでは 41px。点にしか見えない。
   なので PC とスマホで別々の数字を持たせている。 */
type Deco = {
  kind: 'leaf' | 'peach' | 'blush' | 'mint'
  x: number
  y: number
  w: number
  wSp: number
  fx: string
  fy: string
  fr: string
  dur: number
  delay: number
}

const BLOB = {
  leaf: { src: '/images/blobs/leaf.webp', w: 900, h: 869 },
  peach: { src: '/images/blobs/peach.webp', w: 610, h: 900 },
  blush: { src: '/images/blobs/blush.webp', w: 830, h: 900 },
  mint: { src: '/images/blobs/mint.webp', w: 830, h: 900 },
} as const

/* fx / fy の % は「その形自身の大きさ」に対する割合。画面ではない。
   小さい形ほど同じ % でも動く距離が短くなるので、小さいものほど大きめの数字にしてある。
   目安は、動く距離が形の1割くらい。それ以下だと止まって見える。 */
const DECO: Deco[] = [
  /* 画面の四隅。濃い色のもの */
  { kind: 'peach', x: 2, y: -8, w: 11, wSp: 30, fx: '14%', fy: '18%', fr: '-6deg', dur: 9, delay: 0 },
  { kind: 'leaf', x: 82, y: -11, w: 22, wSp: 52, fx: '8%', fy: '-9%', fr: '4deg', dur: 10, delay: 0.5 },
  { kind: 'peach', x: -8, y: 78, w: 14, wSp: 40, fx: '11%', fy: '-12%', fr: '6deg', dur: 10, delay: 1.6 },
  { kind: 'leaf', x: 91, y: 84, w: 12, wSp: 34, fx: '-13%', fy: '-14%', fr: '-6deg', dur: 12, delay: 2.4 },

  /* 絵の後ろ。もともと絵に描き込まれていた淡い形を、こちらに移したもの。
     描き込みのままだと動かせず、絵を差し替えるたびに付いてくる。
     切り離しておけば、色も位置も動きもここで決められる。
     絵より後ろに来るのは、この層が中の箱（z-10）より前に書かれているため。 */
  { kind: 'blush', x: 40, y: 10, w: 30, wSp: 0, fx: '-6%', fy: '7%', fr: '3deg', dur: 16, delay: 0.3 },
  { kind: 'mint', x: 70, y: 52, w: 24, wSp: 0, fx: '7%', fy: '-6%', fr: '-3deg', dur: 14, delay: 1.9 },
  { kind: 'blush', x: 4, y: 52, w: 20, wSp: 46, fx: '9%', fy: '8%', fr: '4deg', dur: 13, delay: 1.1 },
]

const TEXT = {
  ja: {
    role: 'Web制作 / フロントエンド',
    tag: 'はじまりは、いつも人の話を聞くことから。',
    ring: 'WORKS ・ 作品を見る ・ ',
    works: '作品一覧を見る',
  },
  en: {
    role: 'Software Developer — Melbourne',
    tag: 'It always starts with listening.',
    ring: 'WORKS ・ VIEW ALL ・ ',
    works: 'View all works',
  },
} as const

export default function HeroSection({ locale }: { locale: Locale }) {
  const t = TEXT[locale]

  return (
    <section className="sticky top-0 z-0 h-svh overflow-hidden">
      {/* 飾りの形。画面の縁を基準に置くので、中の箱ではなくここに直接。
          中の箱（最大1500px）に入れると、広い画面で縁から離れて浮く。 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {DECO.map((d, i) => {
          const b = BLOB[d.kind]
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={b.src}
              width={b.w}
              height={b.h}
              alt=""
              /* 幅は CSS 変数で渡して、クラス側で画面幅ごとに切り替える。
                 インラインの style には「画面が広いときだけ」が書けないため。 */
              className={cx(
                'absolute h-auto max-w-none w-[var(--w-sp)] md:w-[var(--w-pc)]',
                d.wSp === 0 && 'hidden md:block',
              )}
              style={
                {
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  '--w-sp': `${d.wSp}vw`,
                  '--w-pc': `${d.w}vw`,
                  '--fx': d.fx,
                  '--fy': d.fy,
                  '--fr': d.fr,
                  animation: `blob-float ${d.dur}s ease-in-out ${d.delay}s infinite`,
                } as React.CSSProperties
              }
            />
          )
        })}
      </div>

      {/* 中の箱。ここを基準に置くので、画面が広くても散らばらない */}
      <div className="relative z-10 mx-auto h-full w-full max-w-[1500px]">
        {/* 主役の絵。高さを決めれば幅は元画像の比で決まる（aspect-[1022/1166]）。
            幅で決めると、背の低い画面（ノートPCを横向きで開いたとき）で
            下がはみ出して足元が切れる。高さ基準なら必ず収まる。

            比の数字は画像の実寸。透明な余白を切り落としてあるので、
            この箱＝絵の見えている範囲になる。差し替えたら比も直すこと。

            object-contain。切り抜き済みの絵なので、cover にすると縁が切れる。 */}
        <div className="absolute left-1/2 top-[31%] aspect-[1022/1166] h-[48%] w-auto -translate-x-1/2 md:left-auto md:right-[10%] md:top-[9%] md:h-[82%] md:translate-x-0">
          <Image
            src={ILLUST}
            alt=""
            fill
            sizes="(min-width: 768px) 46vw, 80vw"
            priority
            className="object-contain"
          />
        </div>

        {/* 文字。SP は左上、PC は左の真ん中。
            ナビのロゴが左上に固定で乗っているので、SP はその下から始める。 */}
        {/* 幅は 33% → 36%。文字を大きくしたぶん、置き場所も広げないと折り返す。
            36% が上限。絵は右から10%・幅43%なので、47% から先は絵に重なる。 */}
        <div className="absolute left-[8%] top-[11%] w-[84%] md:left-[11%] md:top-[31%] md:w-[36%]">
          {/* ここだけ Chewy。欧文しか持たない書体なので他では使わない。
              日本語版でもこの1行は英語なので、そのまま出る。

              大きさは画面幅に対する割合。3行とも1行に収めたいので、
              文字数 × 幅 が箱に収まる範囲で頭打ちにしてある。
              上限を上げると、狭い画面から順に折り返し始める。 */}
          <h1 className="font-hero text-[10vw] leading-[1.1] md:text-[clamp(2.6rem,4.2vw,4rem)]">
            Hello, I&apos;m Misa.
          </h1>

          <p className="mt-3 font-mono text-[13px] tracking-[.08em] text-olive-text md:mt-4 md:text-[18px]">
            {t.role}
          </p>

          {/* 一言は日本語のほうが長い（1文字が欧文の倍の幅）。
              日本語で収まる大きさにしてある。英語だけ大きくはしない。 */}
          <p className="mt-3 font-display text-[15px] leading-[1.85] md:mt-4 md:text-[20px]">
            {t.tag}
          </p>
        </div>

        {/* Works への入口。文字と対角になる位置 */}
        <WorksBadge
          locale={locale}
          ring={t.ring}
          label={t.works}
          className="absolute right-[8%] top-[70%] md:right-[9%] md:top-[70%]"
        />
      </div>
    </section>
  )
}

/* 円に沿う文字は SVG の textPath。
   CSS で1文字ずつ回すやり方は、文字数が変わるたびに角度を計算し直すことになる。

   回転は止めた状態で置いておき、ホバーの間だけ動かす（play-state）。
   ホバーで animation を付け外しすると、外れた瞬間に0度へ戻って跳ねる。

   大きさは % ではなく px。画面幅で伸び縮みすると、
   文字が読める大きさを下回ったり、丸を押しのけたりする。 */
function WorksBadge({
  locale,
  ring,
  label,
  className,
}: {
  locale: Locale
  ring: string
  label: string
  className: string
}) {
  return (
    <Link
      href={`/${locale}/works`}
      aria-label={label}
      className={`group block h-[108px] w-[108px] md:h-[150px] md:w-[150px] ${className}`}
    >
      <div className="relative h-full w-full">
        <svg viewBox="0 0 112 112" aria-hidden className="h-full w-full">
          <defs>
            {/* 文字を乗せる円。線としては描かない */}
            <path id="hero-ring" d="M56,56 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" fill="none" />
          </defs>

          <g
            style={{ transformOrigin: '50% 50%' }}
            className="animate-[ring-spin_16s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running] group-focus-visible:[animation-play-state:running]"
          >
            <text fontSize="8.6" letterSpacing="1.6" className="fill-amber font-mono">
              <textPath href="#hero-ring">{ring + ring}</textPath>
            </text>
          </g>
        </svg>

        {/* 真ん中の丸。外径の45%。SVGの中に入れず上に重ねる —
            SVG内だと文字の大きさに引きずられて調整が面倒になる */}
        <span className="absolute left-1/2 top-1/2 flex h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber text-cream transition-transform duration-300 group-hover:scale-110">
          <ArrowUpRight size={20} />
        </span>
      </div>
    </Link>
  )
}
