/* 4ステップのカード。ja と en で中身がまったく違う。

   ja  ご相談から公開までの流れ。クライアント向けの手順
   en  チームの中でどう働くか

   ja をそのまま英訳すると「案件を受ける人」に読まれる。
   転職用のページで一番避けたい誤解なので、内容ごと差し替える。
   部品（番号・アイコン・見出し・本文）は共通で使い回す。

   en を「コードの書き方」ではなく「チームでの働き方」にしてあるのは、
   採用担当が一番知りたいのがそこだから。転職組にとっての不安材料は
   技術より「教える手間がかかるか」で、その問いに直接答える。

   note は補足。無くてもよい（en では使っていない）。 */

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
    note: '3〜7営業日ほど',
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
    icon: 'note',
    title: 'Understand first',
    body: 'When I join a project, I start by reading the documentation and listening to the team to understand how things work.',
  },
  {
    step: '02',
    icon: 'mail',
    title: 'Own my work',
    body: 'I take responsibility for my tasks and work towards the agreed timeline. If I need help along the way, I communicate and keep things moving.',
  },
  {
    step: '03',
    icon: 'ask',
    title: 'Ask and learn',
    body: "When I'm stuck, I research, use AI tools, or ask more experienced teammates. I try to learn from each question and apply it next time.",
  },
  {
    step: '04',
    icon: 'search',
    title: 'Look beyond the task',
    body: 'If I find a bug or something that could be better, I raise it and help work out what to do. I’ve also written test cases and scenario tests to catch issues early.',
  },
]
