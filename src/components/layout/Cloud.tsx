import Image from 'next/image'

/* public/images/clouds/cloud-1〜4.webp を出すだけ。
   使うのは Loading だけなので、Loading の隣に置いてある。
   他のセクションでも浮かべたくなったら ui/ に移す。 */

const SIZES = {
  1: { w: 900, h: 468 },
  2: { w: 900, h: 410 },
  3: { w: 900, h: 605 },
  4: { w: 900, h: 573 },
} as const

export default function Cloud({
  n,
  className,
  priority,
}: {
  n: 1 | 2 | 3 | 4
  className?: string
  priority?: boolean
}) {
  const { w, h } = SIZES[n]
  return (
    <Image
      src={`/images/clouds/cloud-${n}.webp`}
      alt=""
      width={w}
      height={h}
      priority={priority}
      className={className}
    />
  )
}
