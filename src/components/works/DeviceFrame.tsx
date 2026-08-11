/* ノートPC・スマホの枠。作品詳細で使う */

export default function DeviceFrame({
  kind,
  children,
}: {
  kind: 'laptop' | 'phone'
  children?: React.ReactNode
}) {
  return <div data-device={kind}>{children}</div> // TODO
}
