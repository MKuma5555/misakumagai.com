/* セクションの区切り。About Me / Skills / Works で3種類ちがう。
   kind で切り替える。 */

export default function SectionSeparator({ kind }: { kind: 'curve' | 'arc' | 'wave' }) {
  return <div data-separator={kind} aria-hidden /> // TODO
}
