export function formatDate(date: string | Date, locale: string = 'en'): string {
  const d = new Date(date)
  return d.toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-AU', {
    year: 'numeric',
    month: 'long',
  })
}
