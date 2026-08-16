import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Locale } from '@/lib/i18n'

/* FV。1画面ぴったり。

   丸い写真を絶対配置で置いて、そのすき間に文字を入れている。
   丸の形は SVG で切り抜かず border-radius を8つの値で作る。
   SVG の clipPath だと写真を差し替えるたびに切り抜きを作り直すことになる。

   PC は3枚（左上・右の大きいの・左下）、SP は2枚。
   縦画面に3枚入れると1枚あたりが小さくなり、何の写真か分からなくなる。

   位置は中の箱（max-w-[1500px]）からの割合。画面からの割合にすると、
   横に広い画面で左右へ引き伸ばされて、真ん中がぽっかり空く。

   高さは h-svh。100vh はスマホのアドレスバーぶん画面より大きくなり、下がはみ出す。
   丸は箱の外へわざとはみ出させているので、overflow-hidden が要る。
   これが無いと横スクロールが出る。

   sticky top-0 で画面の上に貼りついたまま、次のセクションが上にかぶさる。
   ページの最後の Closing と対になっている（入口で敷いて、出口でめくれる）。
   かぶさる側（page.tsx の z-10 の箱）に背景色が要る。
   透けているとここが見えたままになる。 */

/* 写真。用意できたら public/ に置いてここにパスを書く。
   空のままなら枠だけ出る。src="" の <img> は出さないこと —
   ブラウザがページ自身を読みに行って警告が出る。 */
const PHOTOS = {
  main: '', // 右の大きい丸（SPでは上の大きい丸）
  top: '', // PC 左上。上が見切れる
  sub: '', // 左下
}

/* 丸の形。数字は「どのくらい膨らむか」の割合。
   4つ / 4つ で、横方向と縦方向を別々に指定している。
   全部 50% にすると真円になる。 */
const SHAPE = {
  main: '56% 44% 46% 54% / 52% 46% 54% 48%',
  top: '44% 56% 52% 48% / 62% 58% 42% 38%',
  sub: '62% 38% 44% 56% / 46% 56% 44% 54%',
}

const TEXT = {
  ja: {
    role: 'Web制作 / フロントエンド',
    tag: 'はじまりは、いつも人の話を聞くことから。',
    ring: 'WORKS ・ 作品を見る ・ ',
    works: '作品一覧を見る',
    photo: '準備中',
  },
  en: {
    role: 'Full-stack Developer — Melbourne',
    tag: 'It always starts with listening.',
    ring: 'WORKS ・ VIEW ALL ・ ',
    works: 'View all works',
    photo: 'Coming soon',
  },
} as const

export default function HeroSection({ locale }: { locale: Locale }) {
  const t = TEXT[locale]

  return (
    <section className="sticky top-0 z-0 h-svh overflow-hidden">
      {/* 中の箱。ここを基準に全部を置くので、画面が広くても散らばらない */}
      <div className="relative mx-auto h-full w-full max-w-[1500px]">
        {/* 右の大きい丸。SP では画面上いっぱいに置く */}
        <Photo
          src={PHOTOS.main}
          shape={SHAPE.main}
          label={t.photo}
          sizes="(min-width: 768px) 41vw, 82vw"
          className="left-[18%] top-[36%] h-[32%] w-[82%] md:left-[50%] md:top-[16%] md:h-[56%] md:w-[41%]"
        />

        {/* 左上。上が見切れる。SP では出さない */}
        <Photo
          src={PHOTOS.top}
          shape={SHAPE.top}
          label={t.photo}
          sizes="40vw"
          className="hidden md:block md:left-[7%] md:top-[-14%] md:h-[42%] md:w-[40%]"
        />

        {/* 左下 */}
        <Photo
          src={PHOTOS.sub}
          shape={SHAPE.sub}
          label={t.photo}
          sizes="(min-width: 768px) 25vw, 36vw"
          className="left-[2%] top-[68%] h-[20%] w-[36%] md:left-[14%] md:top-[63%] md:h-[29%] md:w-[25%]"
        />

        {/* 文字。SP は左上、PC は左の真ん中。
            ナビのロゴが左上に固定で乗っているので、SP はその下から始める。 */}
        <div className="absolute left-[8%] top-[11%] w-[84%] md:left-[11%] md:top-[31%] md:w-[33%]">
          {/* ここだけ Chewy。欧文しか持たない書体なので他では使わない。
              日本語版でもこの1行は英語なので、そのまま出る。 */}
          <h1 className="font-hero text-[clamp(2.7rem,4.6vw,4rem)] leading-[1.1]">
            Hello, I&apos;m Misa.
          </h1>

          <p className="mt-3 font-mono text-[11px] tracking-[.08em] text-olive-text md:mt-4 md:text-[13px]">
            {t.role}
          </p>

          <p className="mt-3 font-display text-sm leading-[1.85] md:mt-4 md:text-[15px]">{t.tag}</p>
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

/* 丸1つ。写真が無いときは枠だけ出す。 */
function Photo({
  src,
  shape,
  label,
  sizes,
  className,
}: {
  src: string
  shape: string
  label: string
  sizes: string
  className: string
}) {
  return (
    <div
      aria-hidden={!src}
      style={{ borderRadius: shape }}
      className={`absolute overflow-hidden bg-[#cfc9b6] ${className}`}
    >
      {src ? (
        <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-[.2em] text-cream/70">
          {label}
        </span>
      )}
    </div>
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
