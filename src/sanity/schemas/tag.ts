import { defineField, defineType } from 'sanity'

/** 作品に付けるタグ。管理画面からいくつでも追加できる */
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
      description: '技術名はそのまま英語で（React, Astro など）',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL用のID',
      type: 'slug',
      options: { source: 'labelEn', maxLength: 40 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'group',
      title: '種類',
      type: 'string',
      options: {
        list: [
          { title: '業種（医療・飲食など）', value: 'industry' },
          { title: '技術（React・Astroなど）', value: 'tech' },
        ],
        layout: 'radio',
      },
      initialValue: 'tech',
    }),
  ],
  preview: {
    select: { title: 'labelJa', subtitle: 'labelEn', group: 'group' },
    prepare: ({ title, subtitle, group }) => ({
      title: title || subtitle,
      subtitle: `${group === 'industry' ? '業種' : '技術'} · ${subtitle}`,
    }),
  },
})
