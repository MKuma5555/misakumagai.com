export default function ScrollCue({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`} aria-hidden="true">
      <span
        className="font-mono text-[10px] tracking-[.3em] text-[#8c7a55]"
        style={{ writingMode: 'vertical-rl' }}
      >
        SCROLL
      </span>
      <span className="relative block h-16 w-px overflow-hidden bg-[#8c7a55]/25">
        <span className="scroll-cue-line absolute inset-x-0 top-0 block h-full bg-[#4a5e3e]" />
      </span>
    </div>
  )
}
