import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from './env'

const builder = imageUrlBuilder({ projectId, dataset })

/** Sanityの画像から表示用URLを作る。幅を指定すると自動で縮小してくれる */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
