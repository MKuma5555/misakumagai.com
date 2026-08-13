/* 仮データ。あとで Sanity から取ってくるものに差し替える。

   型は Sanity のフィールド名に合わせてある。差し替えるときは
   works を getWorks() の戻り値に置き換えるだけで、画面側は触らない。

   thumbnail が無い案件が実際にある（NDA・未公開）ので、任意にしてある。
   無いときはカード側で「In progress…」の枠を出す。空の <img> は出さない。

   tags には「種類」と「技術」の両方を入れる。どちらかは content/tags.ts の
   group が決める。種類は一覧ページの絞り込みボタンになり、技術は表示だけ。
   1つの作品が複数の種類を持ってよい（LPでもありアプリでもある、が実際にある）。 */

export type WorkStatus = 'live' | 'wip' | 'ended' | 'nda' | 'study'

export type Work = {
  slug: string
  titleJa: string
  titleEn: string
  summaryJa: string
  summaryEn: string
  tags: string[]
  year: string
  status: WorkStatus
  showIn: ('ja' | 'en')[]
  featured: boolean

  thumbnail?: string // 一覧とスライダーのカード用

  /* 詳細ページ用。ノートPCとスマホの枠に入れる。
     縦に長い全体スクショでよい。上から表示して下は枠で切る。 */
  screenshotDesktop?: string
  screenshotMobile?: string

  /* 詳細ページの文章。
       overview  何をどう作ったかを2〜4行で
       points    ポイントを短く3つほど。長い文章より読まれる */
  overviewJa?: string
  overviewEn?: string
  pointsJa?: string[]
  pointsEn?: string[]

  roleJa?: string // 担当。「設計・実装・運用」など
  roleEn?: string

  liveUrl?: string // 実際に飛べるURL。無ければボタンを出さない
  repoUrl?: string
}

export const STATUS_LABEL: Record<WorkStatus, { ja: string; en: string }> = {
  live: { ja: '公開中', en: 'Live' },
  wip: { ja: '制作中', en: 'In progress' },
  ended: { ja: '公開前に終了', en: 'Ended before launch' },
  nda: { ja: '非公開', en: 'Confidential' },
  study: { ja: '学習成果物', en: 'Coursework' },
}

export const works: Work[] = [
  {
    slug: 'work-01',
    titleJa: '作品タイトル 01',
    titleEn: 'Project 01',
    summaryJa: 'ここに1〜2行の短い説明が入ります。',
    summaryEn: 'A short one or two line summary goes here.',
    tags: ['web', 'react', 'nextjs'],
    year: '2026',
    status: 'live',
    showIn: ['ja', 'en'],
    featured: true,
    overviewJa:
      'ここに概要が2〜4行で入ります。何を課題として、どう作ったのかを短く書きます。長く書くほど読まれなくなるので、詳しくはポイントに分けます。',
    overviewEn:
      'A two to four line overview goes here. What the problem was, and how it was built.',
    pointsJa: [
      'ポイントを短い一文で書きます',
      '数字が入ると一番効きます',
      '3つくらいが読まれる上限です',
    ],
    pointsEn: ['One short line per point', 'Numbers land hardest', 'Three is about the limit'],
    roleJa: '設計・デザイン・実装',
    roleEn: 'Planning, design, development',
    // 実在するURLだけ入れること。無ければ書かない（ボタンが出ない）
    liveUrl: 'https://www.misakumagai.com',
  },
  {
    slug: 'work-02',
    titleJa: '作品タイトル 02',
    titleEn: 'Project 02',
    summaryJa: 'ここに1〜2行の短い説明が入ります。',
    summaryEn: 'A short one or two line summary goes here.',
    tags: ['lp', 'wordpress'],
    year: '2025',
    status: 'live',
    showIn: ['ja', 'en'],
    featured: true,
  },
  {
    slug: 'work-03',
    titleJa: '作品タイトル 03',
    titleEn: 'Project 03',
    summaryJa: 'ここに1〜2行の短い説明が入ります。',
    summaryEn: 'A short one or two line summary goes here.',
    tags: ['app', 'nextjs', 'supabase'],
    year: '2025',
    status: 'nda',
    showIn: ['ja', 'en'],
    featured: true,
  },
  {
    slug: 'work-04',
    titleJa: '作品タイトル 04',
    titleEn: 'Project 04',
    summaryJa: 'ここに1〜2行の短い説明が入ります。',
    summaryEn: 'A short one or two line summary goes here.',
    tags: ['web', 'astro'],
    year: '2025',
    status: 'ended',
    showIn: ['ja', 'en'],
    featured: true,
  },
  {
    slug: 'work-05',
    titleJa: '作品タイトル 05',
    titleEn: 'Project 05',
    summaryJa: 'ここに1〜2行の短い説明が入ります。',
    summaryEn: 'A short one or two line summary goes here.',
    tags: ['app', 'react', 'supabase'],
    year: '2024',
    status: 'study',
    showIn: ['ja', 'en'],
    featured: true,
  },
  {
    slug: 'work-06',
    titleJa: '作品タイトル 06',
    titleEn: 'Project 06',
    summaryJa: 'ここに1〜2行の短い説明が入ります。',
    summaryEn: 'A short one or two line summary goes here.',
    tags: ['sns', 'design'],
    year: '2024',
    status: 'wip',
    showIn: ['ja', 'en'],
    featured: true,
  },
]
