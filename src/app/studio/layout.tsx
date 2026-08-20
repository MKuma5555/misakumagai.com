/* 管理画面は言語の外側にある（/ja でも /en でもない）。
   このサイトは app/[locale]/layout.tsx が html と body を出しているので、
   その外にあるこの画面には html と body が無い。ここで用意する。 */

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
