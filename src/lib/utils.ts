/* class 名を条件付きで足すだけの道具。
   clsx を入れるほどでもないのでこれで足りる。 */
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/* 左だけ大きく空けて、右は画面の縁まで伸ばすときの左余白。
   横スライダーで「まだ続きがある」を見せるために使う。

   中央寄せの余りではなく画面幅の割合で持つ。
   そうしないと画面が狭いときに余白が痩せて、カードが左端に貼りつく。
   参考: omicale.co.jp の Company（左端が画面の約21%）。

   見出し・スライダー・矢印・ボタンで必ず同じものを使うこと。
   片方だけ直すと左端がずれるので、ここ1か所にまとめてある。 */
export const GUTTER_LEFT = 'pl-6 md:pl-[min(22vw,440px)]'
