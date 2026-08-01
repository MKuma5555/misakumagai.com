import { createClient, type SanityClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

let cached: SanityClient | null = null

/**
 * 読み込み時ではなく、実際に使うときに接続する。
 * 読み込み時に作ると、環境変数が1つ足りないだけでビルド全体が落ちる。
 */
export function getSanityClient(): SanityClient {
  if (cached) return cached
  if (!projectId) {
    throw new Error(
      'NEXT_PUBLIC_SANITY_PROJECT_ID が設定されていません。' +
        'Vercel の Settings → Environment Variables で、Production にもチェックが入っているか確認してください。',
    )
  }
  cached = createClient({
    projectId,
    dataset,
    apiVersion,
    // 公開済みの内容だけを、Sanityのキャッシュ経由で読む（速い・無料枠にやさしい）
    useCdn: true,
  })
  return cached
}
