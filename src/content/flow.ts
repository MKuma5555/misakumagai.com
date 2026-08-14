/* 4ステップのカード。ja と en で中身がまったく違う。

   ja  ご相談から公開までの流れ。クライアント向けの手順
   en  コーディングで意識していること

   ja をそのまま英訳すると「案件を受ける人」に読まれる。
   転職用のページで一番避けたい誤解なので、内容ごと差し替える。
   部品（番号・アイコン・見出し・本文）は共通で使い回す。

   ※ 文章は叩き台。Misa の言葉に置き換える予定。
   note は補足。無くてもよい。 */

export type FlowIcon = 'mail' | 'search' | 'pen' | 'rocket' | 'note' | 'ask'

export type FlowStep = {
  step: string
  icon: FlowIcon
  title: string
  body: string
  note?: string
}

export const flowJa: FlowStep[] = [
  {
    step: '01',
    icon: 'mail',
    title: 'ご相談',
    body: 'やりたいこと、困っていることを聞かせてください。まとまっていなくて構いません。',
    note: '無料・30分ほど',
  },
  {
    step: '02',
    icon: 'search',
    title: 'お見積り・ご提案',
    body: 'お話をもとに、内容と費用、期間をお出しします。ここまで費用はかかりません。',
    note: '3営業日ほど',
  },
  {
    step: '03',
    icon: 'pen',
    title: '制作',
    body: 'デザインから実装まで進めます。途中で見ていただきながら、一緒に形にします。',
    note: '1〜2か月ほど',
  },
  {
    step: '04',
    icon: 'rocket',
    title: '公開・その後',
    body: '公開して終わりにしません。更新のしかたもお渡しして、運用を続けられる形にします。',
    note: '公開後も相談できます',
  },
]

export const flowEn: FlowStep[] = [
  {
    step: '01',
    icon: 'pen',
    title: 'Design before code',
    body: 'I sketch the screen and the data first. Redoing a layout is cheap. Redoing a data model is not.',
  },
  {
    step: '02',
    icon: 'rocket',
    title: 'Ship small',
    body: 'Small changes, often. Easier to review, easier to undo when something turns out wrong.',
  },
  {
    step: '03',
    icon: 'note',
    title: 'Write down the why',
    body: 'Comments explain the reason, not the code. In six months I am a stranger to my own work.',
  },
  {
    step: '04',
    icon: 'ask',
    title: 'Ask early',
    body: 'Stuck for an hour? I ask. Guessing quietly is the expensive option for everyone.',
  },
]
