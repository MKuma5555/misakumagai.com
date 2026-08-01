'use client'

import { useEffect, useRef } from 'react'
import type { Tech } from '@/content/skills'

/**
 * カーソルが近いとわずかに寄り、触れると発光する。
 * 周りを薄くする方式はやめた（探している人の邪魔になるため）。
 */
export function TechGrid({ items, cols = 4 }: { items: Tech[]; cols?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cells = Array.from(root.querySelectorAll<HTMLElement>('[data-tech]'))
    const onMove = (e: PointerEvent) => {
      for (const el of cells) {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        const d = Math.hypot(dx, dy)
        if (d < 110 && d > 0) {
          const f = (1 - d / 110) * 9
          el.style.transform = `translate(${(dx / d) * f}px, ${(dy / d) * f}px)`
        } else {
          el.style.transform = ''
        }
      }
    }
    const onLeave = () => cells.forEach((el) => (el.style.transform = ''))

    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)
    return () => {
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [items])

  return (
    <div
      ref={ref}
      className="grid gap-x-2 gap-y-3"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {items.map(({ name, Icon, pro }) => (
        <div
          key={name}
          data-tech
          className="tech-cell group flex flex-col items-center gap-2.5 rounded-2xl px-2 py-6"
        >
          <Icon
            size={36}
            stroke={1.4}
            className={`tech-icon ${pro ? 'text-[#4a5e3e]' : 'text-[#8f9a83]'}`}
          />
          <span className="text-center text-[11px] leading-tight text-[#706b5d] transition-colors group-hover:text-[#4a5e3e]">
            {name}
          </span>
        </div>
      ))}
    </div>
  )
}
