'use client'

/* 下から28px・0.9秒で現れる。一度出たら戻さない。
   スクロールのたびに出たり消えたりすると酔う。 */

export default function Reveal({ children }: { children: React.ReactNode }) {
  return <>{children}</> // TODO
}
