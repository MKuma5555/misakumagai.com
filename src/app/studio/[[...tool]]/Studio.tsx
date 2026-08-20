'use client'

/* 管理画面はブラウザ側だけで動かす。
   サーバー側から sanity.config を読むと、依存の読み込み方が食い違って
   ビルドが落ちる。'use client' を外さないこと。 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function Studio() {
  return <NextStudio config={config} />
}
