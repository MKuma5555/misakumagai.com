// 管理画面とサイト側の両方から使う定数。
// ここには sanity パッケージを import しないこと。
// import するとサイト側に管理画面のコードが引き込まれてビルドが落ちる。

export const CATEGORIES = [
  { title: 'Web制作', titleEn: 'Web', value: 'web' },
  { title: 'LP制作', titleEn: 'Landing page', value: 'lp' },
  { title: 'フロントエンド開発', titleEn: 'Frontend', value: 'frontend' },
  { title: 'Instagram運用', titleEn: 'Instagram', value: 'instagram' },
]

export const STATUSES = [
  { title: '公開中', titleEn: 'Live', value: 'live' },
  { title: '制作中', titleEn: 'In progress', value: 'wip' },
  { title: '公開前に終了', titleEn: 'Ended before launch', value: 'ended' },
  { title: '非公開（NDA）', titleEn: 'Confidential', value: 'nda' },
  { title: '学習成果物', titleEn: 'Coursework', value: 'study' },
]
