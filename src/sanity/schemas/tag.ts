import { defineField, defineType } from 'sanity'

/* 作品に付けるタグ。管理画面からいくつでも追加できる。

   group は content/tags.ts と同じ2種類にしてある。
     type  作ったものの種類。一覧ページの絞り込みボタンになる
     tech  使った技術。カードに出すだけで押せない
   押せる場所を1種類に絞らないと、どちらを押せばいいのか迷う。

   slug は content/tags.ts の slug と合わせること。
   合っていれば、Sanity へ切り替えても絞り込みがそのまま動く。 */

export const tag = defineType({
  name: 'tag',
  title: 'タグ',
  type: 'document',
  fields: [
    defineField({
      name: 'labelJa',
      title: 'タグ名（日本語）',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'labelEn',
      title: 'タグ名（英語）',
      type: 'string',
      description: '技術名はそのまま英語で（React, WordPress など）',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'ID',
      type: 'slug',
      description: 'web / lp / app / react など。小文字とハイフンだけ',
      options: { source: 'labelEn', maxLength: 40 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'group',
      title: '種類',
      type: 'string',
      description: '「種類」は一覧ページの絞り込みボタンになる。「技術」は表示だけ',
      options: {
        list: [
          { title: '種類（Webサイト・LP・アプリ など）', value: 'type' },
          { title: '技術（React・WordPress など）', value: 'tech' },
        ],
        layout: 'radio',
      },
      initialValue: 'tech',
      validation: (r) => r.required(),
    }),
  ],

  preview: {
    select: { title: 'labelJa', subtitle: 'labelEn', group: 'group' },
    prepare: ({ title, subtitle, group }) => ({
      title: title || subtitle,
      subtitle: `${group === 'type' ? '種類' : '技術'} · ${subtitle}`,
    }),
  },
})
