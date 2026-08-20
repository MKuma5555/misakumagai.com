import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { SITE_URL as BASE } from '@/lib/site'

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
