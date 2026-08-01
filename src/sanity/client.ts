import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // 公開済みの内容だけを、Sanityのキャッシュ経由で読む（速い・無料枠にやさしい）
  useCdn: true,
})
