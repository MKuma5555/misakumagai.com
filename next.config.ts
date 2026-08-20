import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    /* next/image は、ここに書いたところの画像しか出さない。
       書いていないドメインを渡すと実行時に落ちる。
       他人のサイトの画像を勝手に自分のサーバーで変換してしまわないための仕組み。

       Sanity に上げた画像は cdn.sanity.io から来る。
       pathname を自分のプロジェクトIDに絞ってあるので、
       他のプロジェクトの画像は通らない。 */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/35p43fkv/**',
      },
    ],
  },
}

export default nextConfig
