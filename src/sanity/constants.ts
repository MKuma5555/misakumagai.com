/* 管理画面とサイト側の両方から使う定数。

   ここには sanity パッケージを import しないこと。
   import すると、サイト側のページに管理画面のコードが引き込まれてビルドが落ちる。

   値は content/works.ts の WorkStatus と揃えてある。
   片方だけ増やすと、Sanity で選べるのに画面が知らない状態になる。 */

export const STATUSES = [
  { title: '公開中', value: 'live' },
  { title: '制作中', value: 'wip' },
  { title: '公開前に終了', value: 'ended' },
  { title: '非公開（NDA）', value: 'nda' },
  { title: '学習成果物', value: 'study' },
]

export const LOCALES = [
  { title: '日本語版 /ja', value: 'ja' },
  { title: '英語版 /en', value: 'en' },
]
