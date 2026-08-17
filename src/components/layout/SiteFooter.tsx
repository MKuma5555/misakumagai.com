import { ArrowUp } from 'lucide-react'
import { IconBrandInstagram, IconBrandLine } from '@tabler/icons-react'
import type { Locale } from '@/lib/i18n'

/* フッター。

   ロゴは出さない（まだ無いため）。
   ページ内のリンクも置かない。左上のナビと同じものが並ぶだけで、
   同じ画面に同じ行き先が2つある状態になっていた。

   SNS は言語で中身が変わる。
     ja  LINE公式 / Instagram   どちらもまだ開設していない
     en  Instagram のみ          LinkedIn と GitHub は Contact の帯にある。
                                同じリンクを1画面に2回出さない

   href が空のものは出さない。押せないリンクを置かないため。
   いま ja では1つも出ないので、SNS の行ごと消える。
   アカウントを作ったら URL を入れるだけで出る。

   文字は生成りの75%。フッターの上で 5.37 あるので本文としても読める。
   60%まで下げると 4.08 で落ちるので、それ以上は薄くしないこと。

   スマホは下部にナビが固定されているので、その高さぶん余白を足してある。 */

export default function SiteFooter({ locale }: { locale: Locale }) {
  const en = locale === 'en'

  // URL が入っているものだけ出る
  const socials = en
    ? [{ name: 'Instagram', href: '', Icon: IconBrandInstagram }]
    : [
        { name: 'LINE', href: '', Icon: IconBrandLine },
        { name: 'Instagram', href: '', Icon: IconBrandInstagram },
      ]

  const live = socials.filter((s) => s.href)

  return (
    <footer className="bg-footer text-cream">
      {/* 高さは必要な分だけ。中身は SNS と著作権表示しかないので、
          ページ内リンクを持っていた頃の余白のままだと空きすぎる。
          スマホの pb-24 は、画面下に固定されているナビの高さぶんの逃げ。 */}
      <div className="wrapper pb-24 pt-8 md:pb-8 md:pt-8">
        {live.length > 0 && (
          <div className="flex gap-5">
            {live.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-cream/75 transition-colors hover:text-cream"
              >
                <Icon size={20} stroke={1.5} />
              </a>
            ))}
          </div>
        )}

        {/* 区切り線と上の余白は、SNS の行があるときだけ。
            無いときに付けると、何も無い場所を線で区切ることになる。 */}
        <div
          className={`flex flex-col gap-3 text-sm text-cream/75 sm:flex-row sm:items-center sm:justify-between ${
            live.length > 0 ? 'mt-8 border-t border-cream/20 pt-6' : ''
          }`}
        >
          <p className="font-mono text-[11px] tracking-wider">
            © {new Date().getFullYear()} Misa Kumagai
          </p>

          {/* #top は「文書の先頭」を指す決まりの値。id を用意しなくても効く */}
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-cream">
            {en ? 'Back to top' : 'ページの先頭へ'}
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
