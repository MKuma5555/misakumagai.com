/**
 * セクションの境目にゆるやかな弧をつくる。
 * 下のセクションの色が、上のセクションへドーム状に張り出す形。
 */
export default function SectionCurve({
  from,
  to,
  className = '',
}: {
  /** 上のセクションの色 */
  from: string
  /** 下のセクションの色（弧の色） */
  to: string
  className?: string
}) {
  return (
    <div className={`-mb-px ${className}`} style={{ background: from }} aria-hidden="true">
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="block h-[70px] w-full md:h-[150px]"
      >
        <path d="M0,160 C400,0 1040,0 1440,160 Z" fill={to} />
      </svg>
    </div>
  )
}
