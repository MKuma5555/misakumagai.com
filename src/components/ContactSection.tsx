'use client'

import { useState, type FormEvent } from 'react'
import { Mail, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ContactSection({ en, nav }: { en: boolean; nav: string[] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      // 送信時に初めて接続する。読み込み時に作ると、設定ミスでページ全体が落ちる
      const supabase = createClient()
      const { error } = await supabase.from("contact_messages").insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      if (error) throw error;

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "送信中にエラーが発生しました。しばらくしてから再度お試しください。");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#2b2820] px-6 py-36 text-[#f4f0e6] md:px-16 md:py-52">
      <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full border border-[#d6dfc9]/20" />
      <div className="absolute -bottom-44 left-1/3 h-96 w-96 rounded-full border border-[#d6dfc9]/15" />
      <div className="relative mx-auto max-w-[1240px]">
        <p className="font-mono text-[10px] tracking-[.2em] text-[#d6dfc9]">04 / {nav[3].toUpperCase()}</p>
        <h2 className="mt-10 font-serif text-6xl leading-[.88] tracking-[-.06em] md:text-[9rem]">{en ? <>Have a project<br /><em>worth making?</em></> : <>まずは、<br /><em>お話ししませんか。</em></>}</h2>

        <div className="mt-16 grid gap-12 border-t border-[#d6dfc9]/25 pt-10 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <div>
            <p className="max-w-md text-base leading-8 text-[#c6d1bb]">{en ? "Send me the rough version of your idea. We can make sense of it together." : "つくりたいもののこと、今困っていること。まとまっていなくても大丈夫です。"}</p>
            <div className="mt-10 space-y-4 text-sm text-[#c6d1bb]">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#d6dfc9]" />
                <a href="mailto:hello@misakumagai.com" className="transition-colors hover:text-[#f4f0e6]">hello@misakumagai.com</a>
              </div>
              <p className="font-mono text-[10px] tracking-[.2em] text-[#d6dfc9]/60">{en ? "AUSTRALIA · JAPAN · ONLINE" : "オーストラリア · 日本 · オンライン"}</p>
            </div>
          </div>

          <div>
            {status === "sent" ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[1.5rem] border border-[#d6dfc9]/20 bg-[#4a5e3e]/20 p-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4a5e3e]">
                  <Check size={28} className="text-[#f4f0e6]" />
                </div>
                <h3 className="mt-6 font-serif text-3xl tracking-[-.03em]">{en ? "Thank you." : "ありがとうございました。"}</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-[#c6d1bb]">{en ? "Your message has reached me. I'll get back to you within a few days." : "メッセージを受け取りました。数日以内にご返信いたします。"}</p>
                <button onClick={() => setStatus("idle")} className="mt-8 rounded-full border border-[#d6dfc9]/30 px-6 py-2 text-sm transition-colors hover:bg-[#d6dfc9]/10">{en ? "Send another" : "別のメッセージを送る"}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block font-mono text-[10px] tracking-[.2em] text-[#d6dfc9]">{en ? "NAME" : "お名前"}</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === "sending"}
                    className="w-full rounded-xl border border-[#d6dfc9]/20 bg-[#2b2820] px-4 py-3 text-sm text-[#f4f0e6] placeholder-[#c6d1bb]/40 transition-colors focus:border-[#4a5e3e] focus:outline-none disabled:opacity-50"
                    placeholder={en ? "Your name" : "お名前を入力してください"}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block font-mono text-[10px] tracking-[.2em] text-[#d6dfc9]">{en ? "EMAIL" : "メールアドレス"}</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "sending"}
                    className="w-full rounded-xl border border-[#d6dfc9]/20 bg-[#2b2820] px-4 py-3 text-sm text-[#f4f0e6] placeholder-[#c6d1bb]/40 transition-colors focus:border-[#4a5e3e] focus:outline-none disabled:opacity-50"
                    placeholder={en ? "you@example.com" : "you@example.com"}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block font-mono text-[10px] tracking-[.2em] text-[#d6dfc9]">{en ? "MESSAGE" : "メッセージ"}</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={status === "sending"}
                    className="w-full resize-none rounded-xl border border-[#d6dfc9]/20 bg-[#2b2820] px-4 py-3 text-sm text-[#f4f0e6] placeholder-[#c6d1bb]/40 transition-colors focus:border-[#4a5e3e] focus:outline-none disabled:opacity-50"
                    placeholder={en ? "Tell me about your project, your idea, or just say hello." : "プロジェクトのこと、アイデアのこと、またはただの挨拶でも。"}
                  />
                </div>

                {status === "error" && (
                  <p className="rounded-lg bg-[#a0522d]/20 px-4 py-3 text-sm text-[#e8a87c]">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#4a5e3e] px-7 py-3.5 text-sm text-[#f4f0e6] transition-transform hover:-translate-y-1 disabled:translate-y-0 disabled:opacity-60"
                >
                  {status === "sending" ? (en ? "Sending…" : "送信中…") : en ? "Send message" : "メッセージを送る"}
                  <Mail size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

