import { defineField, defineType } from 'sanity'
import { CATEGORIES, STATUSES } from '../constants'

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
    // ── 基本 ─────────────────────────────
    defineField({ name: 'titleJa', title: '作品名（日本語）', type: 'string', group: 'basic', validation: (r) => r.required() }),
    defineField({ name: 'titleEn', title: '作品名（英語）', type: 'string', group: 'basic', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'URL', type: 'slug', group: 'basic',
      description: '/ja/works/ の後ろに付く文字列',
      options: { source: 'titleEn', maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'summaryJa', title: '一言説明（日本語）', type: 'text', rows: 2, group: 'basic' }),
    defineField({ name: 'summaryEn', title: '一言説明（英語）', type: 'text', rows: 2, group: 'basic' }),
    defineField({
      name: 'category', title: 'カテゴリ', type: 'string', group: 'basic',
      description: '1つだけ選ぶ。一覧ページの絞り込みタブになる',
      options: { list: CATEGORIES, layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tags', title: 'タグ', type: 'array', group: 'basic',
      description: '業種と技術。新しいタグはその場で追加できる',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({ name: 'client', title: 'クライアント', type: 'string', group: 'basic', description: '出せない場合は空でよい' }),
    defineField({ name: 'role', title: '担当した範囲', type: 'string', group: 'basic' }),
    defineField({ name: 'year', title: '制作年', type: 'string', group: 'basic' }),

    // ── 内容 ─────────────────────────────
    defineField({ name: 'challengeJa', title: '課題（日本語）', type: 'text', rows: 4, group: 'story' }),
    defineField({ name: 'challengeEn', title: '課題（英語）', type: 'text', rows: 4, group: 'story' }),
    defineField({ name: 'approachJa', title: 'アプローチ（日本語）', type: 'text', rows: 4, group: 'story' }),
    defineField({ name: 'approachEn', title: 'アプローチ（英語）', type: 'text', rows: 4, group: 'story' }),
    defineField({ name: 'outcomeJa', title: '結果（日本語）', type: 'text', rows: 4, group: 'story' }),
    defineField({ name: 'outcomeEn', title: '結果（英語）', type: 'text', rows: 4, group: 'story' }),

    // ── 画像 ─────────────────────────────
    defineField({
      name: 'thumbnail', title: 'サムネイル', type: 'image', group: 'media',
      description: 'カードに出る1枚。トリミング位置を指定できる',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mobileShot', title: 'スマホのスクリーンショット', type: 'image', group: 'media',
      description: '詳細ページでPCの右下に重ねて出る1枚。入れないとスマホの枠自体を出さない',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery', title: 'ギャラリー', type: 'array', group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    // ── 公開設定 ─────────────────────────
    defineField({
      name: 'status', title: '状態', type: 'string', group: 'publish',
      options: { list: STATUSES, layout: 'radio' },
      initialValue: 'live',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'showIn', title: 'どちらの言語で見せるか', type: 'array', group: 'publish',
      description: '学校の課題は英語版だけ、など出し分けに使う',
      of: [{ type: 'string' }],
      options: { list: [{ title: '英語版 /en', value: 'en' }, { title: '日本語版 /ja', value: 'ja' }], layout: 'grid' },
      initialValue: ['en', 'ja'],
      validation: (r) => r.min(1),
    }),
    defineField({ name: 'featured', title: 'トップページに出す', type: 'boolean', group: 'publish', initialValue: false }),
    defineField({ name: 'order', title: '並び順', type: 'number', group: 'publish', description: '小さいほど先に出る', initialValue: 100 }),
    defineField({ name: 'liveUrl', title: '公開URL', type: 'url', group: 'publish' }),
    defineField({ name: 'repoUrl', title: 'コードのURL', type: 'url', group: 'publish' }),
  ],
  orderings: [
    { title: '並び順', name: 'byOrder', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'titleJa', category: 'category', status: 'status', media: 'thumbnail' },
    prepare: ({ title, category, status, media }) => ({
      title,
      subtitle: [
        CATEGORIES.find((c) => c.value === category)?.title,
        STATUSES.find((s) => s.value === status)?.title,
      ].filter(Boolean).join(' · '),
      media,
    }),
  },
})
