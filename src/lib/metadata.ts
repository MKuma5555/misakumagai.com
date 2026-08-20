import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { SITE_URL as BASE } from '@/lib/site'

/* ja と en は同じ内容の別言語版だと Google に伝えるための印。
   これが無いと「似たページが2つある」と見なされて、
   どちらか片方しか検索結果に出なくなることがある。

   /ja/works なら
     canonical  https://www.misakumagai.com/ja/works
     ja         https://www.misakumagai.com/ja/works
     en         https://www.misakumagai.com/en/works

   path は言語を含まない部分だけ渡す（'' / '/works' / '/works/xxx'）。 */

export function localeAlternates(locale: Locale, path = ''): Metadata['alternates'] {
  return {
    canonical: `${BASE}/${locale}${path}`,
    languages: {
      ja: `${BASE}/ja${path}`,
      en: `${BASE}/en${path}`,
      'x-default': `${BASE}/ja${path}`,
    },
  }
}
