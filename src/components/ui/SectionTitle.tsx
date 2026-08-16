import { cx } from '@/lib/utils'

/* セクションの見出し。番号 + タイトル + 下線。

   番号は「いま何番目を読んでいるか」の目印。順番を入れ替えるときは
   ここではなく、呼び出し側の no を全部つけ直すこと。
   自動で振ると、言語によって出ないセクション（en に Flow は無い）で
   番号が飛ぶ。ずれるより、手で持っているほうが読みやすい。

   下線は inline-block に付ける。block のままだと画面の端まで伸びて、
   見出しではなく区切り線に見える。文字の幅ぶんで止めたい。

   番号だけ font-mono。数字は等幅のほうが縦に揃って見える。 */

export default function SectionTitle({
  no,
  children,
  className,
}: {
  no: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={cx(
        'inline-block border-b border-ink/40 pb-1.5 text-3xl md:text-4xl',
        className,
      )}
    >
      <span className="mr-2 font-mono text-lg text-muted md:text-xl">{no}</span>
      {children}
    </h2>
  )
}
