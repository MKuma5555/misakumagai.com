import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from './env'

const builder = imageUrlBuilder({ projectId, dataset })

/* Sanity に上げた画像から表示用の URL を作る。
   .width(800) のように書くと、その幅に縮めたものを返してくれる。
   元画像をそのまま出すと数MBになるので、必ず幅を指定すること。 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
