// Aboutセクションの文章。ここだけ書き換えれば見た目は変わらない。
// 下書きは content-drafts/about-journey.md にある。

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
    captionJa: '好きな仕事だった',
    captionEn: 'A job I loved',
    headingJa: '好きな仕事だった。',
    headingEn: 'It was a job I loved.',
    bodyJa: [
      '20歳から5年半、歯科衛生士として働いていました。患者さんを個人で担当して、少しずつ良くなっていくのを見るのが好きでした。',
      'もともと海外旅行が好きで、年に一度は友達と出かけていました。パッションとジェスチャーでなんとかなる。でも、深い話はできない。',
      'いろんな国の人と、もっとちゃんと話してみたかった。',
    ],
    bodyEn: [
      'I worked as a dental hygienist for five and a half years, from the age of twenty.',
    ],
  },
  {
    key: 'AUSTRALIA',
    captionJa: '赤ちゃんになった気分',
    captionEn: 'Like being an infant again',
    headingJa: '赤ちゃんになった気分だった。',
    headingEn: 'I felt like an infant again.',
    bodyJa: [
      '来る前の一年間、仕事のあとに英会話教室に通っていました。それでも、実際に来たら何も聞き取れなかった。',
      '日本でなら普通に話せることが、話せない。買い物でも、仕事でも、悔しい思いをしました。しゃべれないというだけで、人として扱われていないように感じたこともあります。',
      '明るいタイプだったはずなのに、暗くなっていきました。電話をかけるのが、ずっと怖かった。3年、4年経っても、そんなに変わりませんでした。',
    ],
    bodyEn: ['(英語版は日本語が固まってから書く)'],
  },
  {
    key: 'CAD/CAM',
    captionJa: '画面の中でつくりはじめた',
    captionEn: 'Started building on a screen',
    headingJa: '画面の中で、モノをつくりはじめた。',
    headingEn: 'I started making things on a screen.',
    bodyJa: [
      '矯正専門の歯科で、CAD/CAMの技工を担当していました。3Dで歯のモデルを起こし、スプリントを設計する仕事です。',
      '決められた条件の中で形を決める。現物に合わなければ使えない。',
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
      'SEのブートキャンプと両立するために、歯科助手をパートタイムに切り替えました。3年半、続けています。',
      '日本のオンラインスクールにも入り、そこから案件をいただくようになりました。',
    ],
    bodyEn: ['(英語版は日本語が固まってから書く)'],
  },
  {
    key: 'NOW',
    captionJa: '伝わるものをつくっている',
    captionEn: 'Building things that connect',
    headingJa: '歯医者から、抜け出せないと思っていた。',
    headingEn: 'I thought I would never leave dentistry.',
    bodyJa: [
      'でも今は、そう思っていません。',
      'Instagramの案件で症例写真を見ることがあります。先生は忙しくて、詳しい説明までは書いてくれない。だから写真と症例から自分で読み取って、伝わる言葉に置き換えます。これが、楽しいんです。',
      '毎日歯を見ても、嫌じゃない。たぶん、そこは変わっていません。',
    ],
    bodyEn: ['(英語版は日本語が固まってから書く)'],
  },
]
