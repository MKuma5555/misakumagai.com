'use client'

import { useEffect } from 'react'

/**
 * data-reveal が付いた要素を監視して、画面に入ったら data-in を立てる。
 * 見た目は globals.css 側で定義している。
 * 一度出たら監視を外す（スクロールを往復するたびに再生されるのを防ぐ）。
 *
 * ページに1つ置けばよい。増やすと同じ要素を二重に監視することになる。
 */
export default function Reveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])')
    if (!targets.length) return

    // 視差効果を減らす設定なら、最初から出したままにする
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.setAttribute('data-in', ''))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.setAttribute('data-in', '')
          io.unobserve(e.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
