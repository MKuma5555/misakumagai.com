import { defineField, defineType } from 'sanity'
import { LOCALES, STATUSES } from '../constants'

/* 作品。content/works.ts の Work 型と1対1で対応させてある。

   片方だけ増やさないこと。Sanity に項目があっても、画面が知らなければ出ない。
   逆に画面が期待している項目が無ければ、空欄のまま出る。

   ── ver1 からの変更 ──
     challenge / approach / outcome  →  overview + points
       3つの見出しに分けて書くのは負担が大きく、実際は埋まらなかった。
       概要を数行、ポイントを短く3つ、のほうが書けるし読まれる。
     category（1つ選ぶ）  →  tags に統合
       「Webサイトでもありアプリでもある」案件が実際にあった。
     mobileShot  →  screenshotDesktop / screenshotMobile
       詳細ページがノートPCとスマホの2枚を並べる作りになったため。 */

export const project = defineType({
  name: 'project',
  title: '作品',
  type: 'document',

  groups: [
    { name: 'basic', title: '基本', default: true },
    { name: 'story', title: '内容' },
    { name: 'media', title: '画像' },
    { name: 'publish', title: '公開設定' },
  ],

  fields: [
    // ── 基本 ────────────────────────────────
    defineField({
      name: 'titleJa',
      title: '作品名（日本語）',
      type: 'string',
      group: 'basic',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'titleEn',
      title: '作品名（英語）',
      type: 'string',
      group: 'basic',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      group: 'basic',
      description: '/ja/works/ の後ろに付く文字列。あとから変えるとリンクが切れる',
      options: { source: 'titleEn', maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'summaryJa',
      title: '一言説明（日本語）',
      type: 'text',
      rows: 2,
      group: 'basic',
      description: '一覧カードに出る。3行目からは「…」で切られる',
      validation: (r) => r.max(120),
    }),
    defineField({
      name: 'summaryEn',
      title: '一言説明（英語）',
      type: 'text',
      rows: 2,
      group: 'basic',
      description: '英語は同じ内容でも文字数が増えるので、日本語より長めに取ってある',
      validation: (r) => r.max(200),
    }),
    defineField({
      name: 'tags',
      title: 'タグ',
      type: 'array',
      group: 'basic',
      description: '「種類」を1つ以上と、使った技術。種類は一覧ページの絞り込みに使われる',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'year',
      title: '制作年',
      type: 'string',
      group: 'basic',
      description: '2025 のように4桁で',
    }),
    defineField({
      name: 'roleJa',
      title: '担当（日本語）',
      type: 'string',
      group: 'basic',
      description: '「設計・デザイン・実装」など',
    }),
    defineField({
      name: 'roleEn',
      title: '担当（英語）',
      type: 'string',
      group: 'basic',
    }),

    // ── 内容 ────────────────────────────────
    defineField({
      name: 'overviewJa',
      title: '概要（日本語）',
      type: 'text',
      rows: 4,
      group: 'story',
      description: '何を課題として、どう作ったのかを2〜4行で。長いほど読まれなくなる',
    }),
    defineField({
      name: 'overviewEn',
      title: '概要（英語）',
      type: 'text',
      rows: 4,
      group: 'story',
    }),
    defineField({
      name: 'pointsJa',
      title: 'ポイント（日本語）',
      type: 'array',
      group: 'story',
      description: '短い一文で3つほど。数字が入ると一番効く',
      of: [{ type: 'string' }],
      validation: (r) => r.max(5),
    }),
    defineField({
      name: 'pointsEn',
      title: 'ポイント（英語）',
      type: 'array',
      group: 'story',
      of: [{ type: 'string' }],
      validation: (r) => r.max(5),
    }),

    // ── 画像 ────────────────────────────────
    defineField({
      name: 'thumbnail',
      title: 'サムネイル',
      type: 'image',
      group: 'media',
      description: 'カードに出る1枚。無ければ「準備中」の枠が出る',
      options: { hotspot: true },
    }),
    defineField({
      name: 'screenshotDesktop',
      title: 'PC画面のスクリーンショット',
      type: 'image',
      group: 'media',
      description: '詳細ページのノートPCの枠に入る。縦に長い全体スクショでよい',
      options: { hotspot: true },
    }),
    defineField({
      name: 'screenshotMobile',
      title: 'スマホ画面のスクリーンショット',
      type: 'image',
      group: 'media',
      description: 'ノートPCの右下に重なる。無ければスマホの枠自体を出さない',
      options: { hotspot: true },
    }),

    // ── 公開設定 ──────────────────────────────
    defineField({
      name: 'status',
      title: '状態',
      type: 'string',
      group: 'publish',
      options: { list: STATUSES, layout: 'radio' },
      initialValue: 'live',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'showIn',
      title: 'どちらの言語で見せるか',
      type: 'array',
      group: 'publish',
      description: '学校の課題は英語版だけ、実案件は両方、のように出し分ける',
      of: [{ type: 'string' }],
      options: { list: LOCALES, layout: 'grid' },
      initialValue: ['ja', 'en'],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'featured',
      title: 'トップページに出す',
      type: 'boolean',
      group: 'publish',
      description: 'トップのスライダーに出る。6件くらいが読みやすい上限',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: '並び順',
      type: 'number',
      group: 'publish',
      description: '小さいほど先に出る',
      initialValue: 100,
    }),
    defineField({
      name: 'liveUrl',
      title: '公開URL',
      type: 'url',
      group: 'publish',
      description: '入れるとボタンが出る。無ければ出ない',
    }),
    defineField({
      name: 'repoUrl',
      title: 'コードのURL',
      type: 'url',
      group: 'publish',
    }),
  ],

  orderings: [{ title: '並び順', name: 'byOrder', by: [{ field: 'order', direction: 'asc' }] }],

  preview: {
    select: { title: 'titleJa', status: 'status', year: 'year', media: 'thumbnail' },
    prepare: ({ title, status, year, media }) => ({
      title,
      subtitle: [year, STATUSES.find((s) => s.value === status)?.title].filter(Boolean).join(' · '),
      media,
    }),
  },
})
