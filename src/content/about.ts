/* About me セクションの文章。Sanity には入れない。
   頻繁に変わらないし、章立てごと動かすことがあるため。 */

export type JourneyChapter = {
  id: string
  label: string
  headingJa: string
  headingEn: string
  bodyJa: string
  bodyEn: string
  image?: string
}

/* 日本語は確定済み（旧リポの content/journey.ts から移す）。
   英語は未執筆。 */
export const journey: JourneyChapter[] = [] // TODO

export type Like = { id: string; labelJa: string; labelEn: string }

export const likes: Like[] = [] // TODO
