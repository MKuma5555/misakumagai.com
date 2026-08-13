import { cx } from '@/lib/utils'

/* 公開中 / 制作中 / 非公開 など。
   アンバーの上は必ず濃色の文字（白は 2.36 で読めない）。 */

export default function Badge({
  children,
  tone = 'amber',
}: {
  children: React.ReactNode
  tone?: 'amber' | 'quiet'
}) {
  return (
    <span
      className={cx(
        'rounded-pill px-3 py-1 text-xs',
        // quiet も地を塗る。写真の上に置くので、透明だと読めない
        tone === 'amber' ? 'bg-amber text-ink' : 'border border-line bg-cream text-ink',
      )}
    >
      {children}
    </span>
  )
}
