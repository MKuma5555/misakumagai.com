// Aboutセクションの文章。ここだけ書き換えれば見た目は変わらない。
// 下書きと判断の記録は content-drafts/about-journey.md にある。

export type JourneyStop = {
  key: string
  captionJa: string
  captionEn: string
  headingJa: string
  headingEn: string
  bodyJa: string[]
  bodyEn: string[]
  /** public/ 配下の画像パス。空なら画像枠は出ない */
  image?: string
}

export const journeyIntro = {
  headingJa: ['伝わることを、', 'あきらめなかった。'],
  headingEn: ['I never gave up on', 'being understood.'],
  leadJa: '日本からオーストラリアへ。歯科からWebの世界へ。\n「伝わること」を探して、わたしはつくる側になりました。',
  leadEn: 'From Japan to Australia. From dentistry to the web.\nLooking for ways to be understood, I ended up building things.',
}

export const journey: JourneyStop[] = [
  {
    key: 'JAPAN',
    captionJa: '歯科衛生士だった頃',
    captionEn: 'Dental hygienist',
    headingJa: 'はじめての仕事は、歯科衛生士でした。',
    headingEn: 'My first job was as a dental hygienist.',
    bodyJa: [
      '20歳から5年半、歯科衛生士として働いていました。患者さんと一対一で向き合い、少しずつ変化していく姿を一緒に見守る。その時間が好きでした。',
      'でも、25歳を過ぎた頃、ふと考えるようになりました。「私は、この先もずっと同じ道を歩くのだろうか。」',
      'もともと海外旅行が好きで、いろいろな国の人と話すことも好きでした。もっと広い世界を見てみたい。そう思い、オーストラリアへの渡航を決めました。',
    ],
    bodyEn: ['(英語版は日本語が固まってから書く)'],
    image: '/journey-01-japan.webp',
  },
  {
    key: 'AUSTRALIA',
    captionJa: '言葉が通じなかった',
    captionEn: 'Losing my words',
    headingJa: '旅行と暮らしは、まったく別のものでした。',
    headingEn: 'Travelling and living are not the same thing.',
    bodyJa: [
      '言葉が通じない。自分の考えを伝えられない。しゃべれないというだけで、人として扱われていないように感じたこともあります。',
      '一方で、少しずつ会話ができるようになり、人とつながる喜びも知りました。',
      'この経験を通して、「伝える」ということについて深く考えるようになりました。',
    ],
    bodyEn: ['(英語版は日本語が固まってから書く)'],
    image: '/journey-02-australia.webp',
  },
  {
    key: 'CAD/CAM',
    captionJa: '画面の中でつくりはじめた',
    captionEn: 'Designing on a screen',
    headingJa: '画面の中で、ものづくりを始めました。',
    headingEn: 'I started making things on a screen.',
    bodyJa: [
      'オーストラリアの歯科医院で働くなかで、CAD/CAMテクニシャンへ転職しました。歯の形を設計し、3Dプリンターで模型を作り、実際に患者さんの口の中で使われる装置をデザインする。',
      '画面の中で作ったものが、現実の世界で誰かの役に立つ。その感覚に夢中になりました。',
      'そして、「もっと別の形でものづくりに関わってみたい」と考えるようになりました。',
    ],
    bodyEn: ['(英語版は日本語が固まってから書く)'],
  },
  {
    key: 'LEARNING',
    captionJa: '昼は歯科、夜はコード',
    captionEn: 'Dentistry by day, code by night',
    headingJa: '昼は歯科、夜はコード。',
    headingEn: 'Dentistry by day, code by night.',
    bodyJa: [
      '昼間は歯科助手として働きながら、オーストラリアのブートキャンプに通うことを決めました。3年半、続けています。',
      'CAD/CAMで感じた手ごたえを、もっと別の形で試してみたかった。ソフトウェアエンジニアという仕事を知って、そう思うようになりました。',
    ],
    bodyEn: ['(英語版は日本語が固まってから書く)'],
    image: '/journey-04-learning.webp',
  },
  {
    key: 'NOW',
    captionJa: 'つくることと、伝えること',
    captionEn: 'Making and communicating',
    headingJa: 'つくることと、伝えること。',
    headingEn: 'Making things, and getting them through.',
    bodyJa: [
      '日本の案件に携わる機会をいただくようになりました。Webサイト制作やアプリケーション開発、SNS運用など、さまざまな仕事に挑戦しています。',
      '以前は、歯科とITはまったく別の世界だと思っていました。でも今は、そうは思っていません。相手のことを理解し、課題を見つけ、必要なものを形にする。私がずっと続けてきたのは、「伝えること」と「つくること」なのだと思います。',
      'これからも、新しい技術を学びながら、人と人をつなぐ仕事を続けていきたいと思っています。',
    ],
    bodyEn: ['(英語版は日本語が固まってから書く)'],
    image: '/journey-05-now.webp',
  },
]
