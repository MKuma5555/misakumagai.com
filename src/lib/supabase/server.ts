import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/* サーバー側専用の接続。ブラウザからは絶対に呼ばないこと。

   使うのは SUPABASE_SERVICE_ROLE_KEY。
   NEXT_PUBLIC_ が付いていない環境変数は、Next.js がブラウザに配らない。
   このキーは全部の操作ができてしまうので、外に出したら終わり。

   接続は「使うとき」に作る。読み込んだ瞬間に作ると、
   環境変数が入っていないときにビルドごと落ちる。 */

let cached: SupabaseClient | null = null

export function getServerSupabase(): SupabaseClient {
  if (cached) return cached

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'Supabase の環境変数が設定されていません。' +
        'ローカルは .env.local、本番は Vercel の Settings → Environment Variables を確認してください。' +
        '（NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY）',
    )
  }

  cached = createClient(url, key, {
    auth: { persistSession: false }, // サーバーではログイン状態を保存しない
  })
  return cached
}
