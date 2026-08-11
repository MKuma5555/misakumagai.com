import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'

const BASE = 'https://misakumagai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/works', '/contact']
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
    })),
  )
  // TODO: /works/[slug] を Sanity から足す
}
