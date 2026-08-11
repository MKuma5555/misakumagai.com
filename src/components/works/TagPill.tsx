'use client'

import { cx } from '@/lib/utils'

export default function TagPill({
  label,
  active,
  onClick,
}: {
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        'rounded-pill px-4 py-1.5 text-sm transition-colors',
        active ? 'bg-amber text-ink' : 'border border-line text-muted hover:border-olive',
      )}
    >
      {label}
    </button>
  )
}
