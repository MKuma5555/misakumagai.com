/* Sanity への接続に使う3つ。値は .env.local と Vercel の環境変数から。

   NEXT_PUBLIC_ が付いているのは、ブラウザ側（/studio の管理画面）でも
   使うため。作品データは公開情報なので、外に出ても困らない。 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01'
