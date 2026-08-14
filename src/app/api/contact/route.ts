import { NextResponse, type NextRequest } from 'next/server'
import { getServerSupabase } from '@/lib/supabase/server'

/* 問い合わせの受け口。Vercel が必要なときだけ動かしてくれる。
   サーバーを借りる必要はない。ファイルを置くだけ。

   ブラウザから直接 Supabase に書かず、ここを通す理由は3つ。
     ① キーがページに出ない
     ② 入力の検証を素通りできない（ブラウザ側の必須チェックは消せる）
     ③ 連投を止められる

   保存先のテーブルは contact_messages（旧サイトと同じ）。 */

const LIMITS = { name: 100, email: 200, message: 4000 }

/* 連投の記録。同じIPから10分に5回まで。
   Vercel の関数は使われないと消えるので、この記録も消える。
   完全な対策ではないが、フォームを連打されるのは止まる。 */
const recent = new Map<string, number[]>()
const WINDOW = 10 * 60 * 1000
const MAX = 5

function tooMany(ip: string) {
  const now = Date.now()
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW)
  hits.push(now)
  recent.set(ip, hits)
  return hits.length > MAX
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const { name, email, message, website } = (body ?? {}) as Record<string, unknown>

  /* 罠。人には見えない入力欄で、埋まっていたら自動送信とみなす。
     成功したふりをして黙って捨てる。エラーを返すと、
     相手が「どうすれば通るか」を学習してしまう。 */
  if (typeof website === 'string' && website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const values = {
    name: typeof name === 'string' ? name.trim() : '',
    email: typeof email === 'string' ? email.trim() : '',
    message: typeof message === 'string' ? message.trim() : '',
  }

  if (!values.name || !values.email || !values.message) {
    return NextResponse.json({ error: 'required' }, { status: 400 })
  }
  if (
    values.name.length > LIMITS.name ||
    values.email.length > LIMITS.email ||
    values.message.length > LIMITS.message
  ) {
    return NextResponse.json({ error: 'too_long' }, { status: 400 })
  }
  // 厳密に判定しようとすると正しいアドレスまで弾く。形だけ見る
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (tooMany(ip)) {
    return NextResponse.json({ error: 'too_many' }, { status: 429 })
  }

  try {
    const { error } = await getServerSupabase().from('contact_messages').insert(values)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err) {
    // 中身のエラーはそのまま返さない。テーブル名などが漏れる
    console.error('[contact]', err)
    return NextResponse.json({ error: 'server' }, { status: 500 })
  }
}
