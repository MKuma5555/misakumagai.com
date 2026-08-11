import Link from 'next/link'
import { cx } from '@/lib/utils'

export default function Button({
  href,
  children,
  variant = 'solid',
}: {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'outline'
}) {
  return (
    <Link
      href={href}
      className={cx(
        'rounded-pill inline-block px-7 py-3 transition-colors',
        variant === 'solid'
          ? 'bg-amber text-ink'
          : 'border border-olive text-olive-text hover:bg-olive/10',
      )}
    >
      {children}
    </Link>
  )
}
