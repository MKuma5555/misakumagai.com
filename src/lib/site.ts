/* サイトのアドレス。ここ1か所だけに書く。

   以前は metadata.ts / sitemap.ts / robots.ts / layout.tsx の
   4か所に同じ文字列が散らばっていた。
   ドメインの向きを変えたとき、直し忘れが必ず出る形だった。

   ── なぜ www 付きなのか ──
   旧サイトが www.misakumagai.com で公開されていたため、向きを変えていない。
   www 無しで来た人は Vercel 側で www へ送っている（308）。

   ここを変えるときは、Vercel の Settings → Domains も必ず一緒に直すこと。
   コードと実際のアドレスがずれると、
     ・検索エンジンに「正しいURL」として別のものを伝えてしまう
     ・SNSに貼ったときの画像が読めなくなる
   どちらも見た目には気づけない壊れ方をする。 */

export const SITE_URL = 'https://www.misakumagai.com'
