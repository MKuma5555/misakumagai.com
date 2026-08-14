'use client'

import { useState, type FormEvent } from 'react'
import { Mail, Check } from 'lucide-react'
import type { Locale } from '@/lib/i18n'

/* 問い合わせフォーム。/contact ページの中身。
   トップには置かない。トップにフォームを出すと、そこで読むのが止まる。
   トップは sections/ContactBand.tsx が担当し、このページへ送るだけ。

   送信先は /api/contact。ブラウザから直接 Supabase には書かない。
   キーがページに出ないようにするため。

   LINE は公式アカウントがまだ無いので出していない。
   開設したら LINE_URL に入れるだけで出る。 */

const LINE_URL = '' // 例: https://lin.ee/xxxxxxx

type Status = 'idle' | 'sending' | 'sent' | 'error'

const ERROR_TEXT: Record<string, { ja: string; en: string }> = {
  required: { ja: 'すべての項目を入力してください。', en: 'Please fill in every field.' },
  invalid_email: {
    ja: 'メールアドレスの形式を確認してください。',
    en: 'Please check the email address.',
  },
  too_long: { ja: '文字数が多すぎます。', en: 'That is too long.' },
  too_many: {
    ja: '短い時間に何度も送信されています。しばらくしてからお試しください。',
    en: 'Too many messages in a short time. Please try again later.',
  },
  server: {
    ja: '送信に失敗しました。しばらくしてからお試しください。',
    en: 'Could not send. Please try again later.',
  },
}

export default function ContactForm({ locale }: { locale: Locale }) {
  const en = locale === 'en'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // 罠。人は触らない
  const [status, setStatus] = useState<Status>('idle')
  const [errorKey, setErrorKey] = useState('server')

  const sending = status === 'sending'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        setErrorKey(data.error && data.error in ERROR_TEXT ? data.error : 'server')
        setStatus('error')
        return
      }

      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setErrorKey('server')
      setStatus('error')
    }
  }

  const field =
    'w-full rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 text-sm text-cream placeholder-cream/35 transition-colors focus:border-amber focus:outline-none disabled:opacity-50'
  const label = 'mb-2 block font-mono text-[10px] tracking-[.2em] text-cream/65'

  return (
    <section id="contact" className="relative overflow-hidden bg-footer text-cream">
      {/* 飾りの丸。既存のデザインを引き継いでいる */}
      <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full border border-cream/10" />
      <div className="pointer-events-none absolute -bottom-44 left-1/3 h-96 w-96 rounded-full border border-cream/[.07]" />

      <div className="relative wrapper py-[clamp(4rem,9vw,8rem)]">
        <p className="font-mono text-[10px] tracking-[.2em] text-cream/65">
          {en ? '05 / CONTACT' : '05 / お問い合わせ'}
        </p>

        <h2 className="mt-6 text-4xl leading-tight md:text-6xl">
          {en ? (
            <>
              Have a project
              <br />
              <em>worth making?</em>
            </>
          ) : (
            <>
              まずは、
              <br />
              <em>お話ししませんか。</em>
            </>
          )}
        </h2>

        <div className="mt-14 grid gap-12 border-t border-cream/20 pt-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <p className="max-w-md leading-8 text-cream/80">
              {en
                ? 'Send me the rough version of your idea. We can make sense of it together.'
                : 'つくりたいもののこと、今困っていること。まとまっていなくても大丈夫です。'}
            </p>

            <div className="mt-10 space-y-4 text-sm text-cream/80">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-amber" />
                <a
                  href="mailto:hello@misakumagai.com"
                  className="transition-colors hover:text-cream"
                >
                  hello@misakumagai.com
                </a>
              </div>

              {!en && LINE_URL && (
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 transition-colors hover:text-cream"
                >
                  LINEで相談する
                </a>
              )}

              <p className="font-mono text-[10px] tracking-[.2em] text-cream/50">
                {en ? 'AUSTRALIA · JAPAN · ONLINE' : 'オーストラリア · 日本 · オンライン'}
              </p>
            </div>
          </div>

          <div>
            {status === 'sent' ? (
              <div className="flex min-h-[380px] flex-col items-center justify-center rounded-[1.5rem] border border-cream/20 bg-cream/5 p-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber">
                  <Check size={28} className="text-ink" />
                </div>
                <h3 className="mt-6 text-2xl">{en ? 'Thank you.' : 'ありがとうございました。'}</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-cream/80">
                  {en
                    ? "Your message has reached me. I'll get back to you within a few days."
                    : 'メッセージを受け取りました。数日以内にご返信いたします。'}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 rounded-pill border border-cream/30 px-6 py-2 text-sm transition-colors hover:bg-cream/10"
                >
                  {en ? 'Send another' : '別のメッセージを送る'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className={label}>
                    {en ? 'NAME' : 'お名前'}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={sending}
                    className={field}
                    placeholder={en ? 'Your name' : 'お名前を入力してください'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={label}>
                    {en ? 'EMAIL' : 'メールアドレス'}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={200}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={sending}
                    className={field}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={label}>
                    {en ? 'MESSAGE' : 'メッセージ'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={4000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={sending}
                    className={`${field} resize-none`}
                    placeholder={
                      en
                        ? 'Tell me about your project, your idea, or just say hello.'
                        : 'プロジェクトのこと、アイデアのこと、またはただの挨拶でも。'
                    }
                  />
                </div>

                {/* 罠。自動送信のプログラムだけが埋める。
                    hidden ではなく画面の外に置く。hidden だと無視される */}
                <div aria-hidden className="absolute left-[-9999px] top-0">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {status === 'error' && (
                  <p
                    role="alert"
                    className="rounded-lg border border-amber/40 bg-amber/10 px-4 py-3 text-sm text-cream"
                  >
                    {ERROR_TEXT[errorKey][en ? 'en' : 'ja']}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex items-center gap-3 rounded-pill bg-amber px-7 py-3.5 text-sm text-ink transition-transform hover:-translate-y-1 disabled:translate-y-0 disabled:opacity-60"
                >
                  {sending
                    ? en
                      ? 'Sending…'
                      : '送信中…'
                    : en
                      ? 'Send message'
                      : 'メッセージを送る'}
                  <Mail size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
