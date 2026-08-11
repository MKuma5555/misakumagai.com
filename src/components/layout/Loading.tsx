'use client'

/* 雲4枚が折り重なった状態から掃けていく。初回のみ・1.2秒。
   手前ほど大きく速く、奥ほど小さくゆっくり動かすと奥行きが出る。

     奥  cloud-3  大きい塊    ゆっくり／上へ
         cloud-4  雲海        下へ沈む
         cloud-2  淡い横長    右へ
     手前 cloud-1  輪郭のある雲 左へ・いちばん速い

   2回目以降は出さない。sessionStorage で判定する。 */

export default function Loading() {
  return null // TODO
}
