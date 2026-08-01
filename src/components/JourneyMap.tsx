// 水彩の地図の上に、経路と飛行機を重ねる。
// 座標は切り出した画像から実測（viewBox 167×100 ＝ 画像の比率と一致）。
export default function JourneyMap({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <img src="/journey-map.webp" alt="" className="w-full" />
      <svg viewBox="0 0 167 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          id="journey-route"
          d="M115.1 23 Q98 54 119 82"
          fill="none"
          stroke="#4a5e3e"
          strokeWidth=".8"
          strokeOpacity=".5"
          strokeDasharray="2.2 3.2"
          strokeLinecap="round"
        />
        <g fill="#4a5e3e">
          <path d="M115.1 13.5 c-2.4 0 -4 2 -4 4 c0 3 4 7 4 7 s4 -4 4 -7 c0 -2 -1.6 -4 -4 -4 z" />
          <circle cx="115.1" cy="17.5" r="1.4" fill="#f4f0e6" />
          <path d="M119 82.6 c-2.4 0 -4 2 -4 4 c0 3 4 7 4 7 s4 -4 4 -7 c0 -2 -1.6 -4 -4 -4 z" />
          <circle cx="119" cy="86.6" r="1.4" fill="#f4f0e6" />
          <path d="M0 -3.2 L1.1 -0.45 L4.1 0.28 L1.1 1 L0 3.6 L-1.1 1 L-4.1 0.28 L-1.1 -0.45 Z" opacity="0">
            <animate attributeName="opacity" values="0;1;1;1;0" dur="4.6s" repeatCount="indefinite" />
            <animateMotion dur="4.6s" repeatCount="indefinite" rotate="auto">
              <mpath href="#journey-route" />
            </animateMotion>
          </path>
        </g>
        <g fontFamily="var(--font-mono)" fontSize="3.4" letterSpacing=".35" fill="#2b2820">
          <text x="121" y="18">JAPAN</text>
          <text x="125" y="88">MELBOURNE</text>
        </g>
      </svg>
    </div>
  )
}
