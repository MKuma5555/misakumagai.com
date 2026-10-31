import { sendGAEvent } from '@next/third-parties/google'

/* 「押されたか」を GA に送る。

   ページが何回見られたかは gtag が勝手に数える。
   でも「問い合わせようとしたか」は自分で送らないと、どこにも残らない。
   最後まで読まれたことと、そこから動いたことは別の話なので、分けて数える。

   NEXT_PUBLIC_GA_ID は Vercel の環境変数にしか入れていない（[locale]/layout.tsx 参照）。
   つまりローカルには dataLayer が無い。無いときは黙って捨てる。
   開発中の自分のクリックを本番の数字に混ぜないため。

   cta_location などのパラメータは、GA の管理画面で「カスタムディメンション」に
   登録しないとレポートの列には出ない。イベントの件数だけなら登録しなくても数えられる。 */

export type TrackedEvent =
  | 'cta_click' // 問い合わせ導線を押した
  | 'contact_submit' // フォームを送り切った ＝ 本命
  | 'email_click' // メールアドレスを押した
  | 'outbound_click' // LinkedIn / GitHub へ出ていった

export function track(event: TrackedEvent, params: Record<string, string> = {}) {
  if (typeof window === 'undefined' || !('dataLayer' in window)) return
  sendGAEvent('event', event, params)
}
