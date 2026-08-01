// 節目のアイコン。画像ではなくSVGなので、色も大きさも自由に変わる。
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const Torii = () => <path d="M-17 4 h34 M-20 0 q17 -5 40 0 M-13 4 v26 M13 4 v26 M-15 11 h30" {...base} />
const Opera = () => (
  <g {...base}>
    <path d="M-19 30 h38" />
    <path d="M-17 30 q3 -20 13 -22 q-2 12 3 22" />
    <path d="M-4 30 q4 -24 15 -26 q-3 14 2 26" />
    <path d="M9 30 q4 -16 11 -17 q-2 9 1 17" />
  </g>
)
const Tooth = () => (
  <g {...base}>
    <path d="M-11 3 q-7 0 -7 8 q0 10 3 17 q2 4 4 0 q2 -6 3 -12 q1 -3 2 0 q1 6 3 12 q2 4 4 0 q3 -7 3 -17 q0 -8 -7 -8 q-4 2 -8 0" />
    <circle cx="16" cy="6" r="5.5" />
    <path d="M16 12 v14" />
  </g>
)
const Laptop = () => (
  <g {...base}>
    <rect x="-15" y="4" width="30" height="20" rx="2.5" />
    <path d="M-21 28 h42 M-15 28 l3 -4 M15 28 l-3 -4" />
  </g>
)
const Spark = () => <path d="M0 2 q3 12 12 15 q-9 3 -12 15 q-3 -12 -12 -15 q9 -3 12 -15" {...base} />

const shapes = [Torii, Opera, Tooth, Laptop, Spark]

export default function JourneyIcon({ index, size = 44 }: { index: number; size?: number }) {
  const Shape = shapes[index] ?? Spark
  return (
    <svg viewBox="-24 -4 48 40" width={size} height={size * 40 / 48} aria-hidden="true">
      <Shape />
    </svg>
  )
}
