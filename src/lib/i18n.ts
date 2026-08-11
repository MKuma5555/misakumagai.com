/* 対応言語。ja と en は翻訳ではなく別編集。目的が違う。
   ja = 案件獲得 / en = 転職 */

export const locales = ['ja', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ja'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
