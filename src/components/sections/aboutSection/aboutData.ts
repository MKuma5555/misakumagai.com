// aboutData.ts

/* About / Journey / Likes の中身。

   ja と en は翻訳ではない。同じ人の話だが、読む相手が違う。
     ja  お店や医院の人。何を頼めるか、どんな人かを知りたい
     en  採用担当。何ができる人か、なぜこの道に来たかを知りたい
   片方を直したときに、もう片方も直す必要はない。

   body は段落の配列。1つ目だけ大きく出す（AboutSection 側で処理）。
   別に見出しを持たせると、セクションの見出しと二重になる。 */

export type AboutTab = {
  id: 'about' | 'journey' | 'likes'
  number: string
  label: string
  bgColor: string
  image: string

  /* 写真のどこを残すか。枠が横長・写真が縦長なので上下が切れる。
     'center top' で上、下げたいほど数字を大きく。
     省略したら上寄せ（AboutSection 側の既定値）。 */
  focus?: string

  body: { ja: string[]; en: string[] }
}

export const aboutData: AboutTab[] = [
  {
    id: 'about',
    number: '01',
    label: 'About me',
    bgColor: 'bg-leaf',
    image: '/images/journey/myphoto2.webp',
    focus: 'center top',
    body: {
      ja: [
        '日本生まれ。20代でオーストラリアへ渡り、現在はメルボルンを拠点にしています。',
        '30代になり、これから長く続けられる仕事として、苦手だけど興味のあったWeb開発に挑戦。現在はWeb Developerとして、Webサイト・LP・Webアプリケーションの制作や、歯科医院のInstagram運用などに携わっています。',
        '新しいことを学ぶこと、人と一緒につくることが好きです。日本語・英語でコミュニケーションを取りながら、相手の話を聞き、一緒に考えて形にしていくことを大切にしています。',
      ],
      en: [
        'Born in Japan, I moved to Australia in my twenties and now call Melbourne home.',
        'In my thirties, I decided to take on a field I was interested in but never thought I was good at. I studied web development and now work on websites, landing pages, web applications, and Instagram content for dental clinics.',
        'I enjoy learning new things and building with people. I work comfortably in both Japanese and English, listening to what people need and working together to turn ideas into something real.',
      ],
    },
  },

  {
    id: 'journey',
    number: '02',
    label: 'Journey',
    bgColor: 'bg-amber',
    image: '/images/journey/journey-airplane.webp',
    focus: 'center top',
    body: {
      ja: [
        'ロックダウン中に自分のWordPressサイトを作ったことをきっかけに、コードを書くようになりました。',
        '「どうやって動いているんだろう？」とカスタマイズするうちに、ものをつくる楽しさに惹かれ、General AssemblyでFull Stack Software Engineeringを学びました。',
        'その後Web Developerとしての仕事を始め、現在はフロントエンド開発を中心に、Webサイト・LP・Webアプリなどを制作しています。日本で5年以上働いた歯科衛生士としての経験も、相手の話を聞き、必要なものを考える今の仕事に活きています。',
      ],
      en: [
        'My journey into tech started during lockdown, when I began building and customising my own WordPress site.',
        'As I kept asking, “How does this actually work?”, I became interested in coding and went on to study Full Stack Software Engineering at General Assembly.',
        'Since then, I’ve worked mainly in frontend development across websites, landing pages and web applications. My five-plus years as a dental hygienist in Japan still shape how I listen, understand needs, and work with people.',
      ],
    },
  },

  {
    id: 'likes',
    number: '03',
    label: 'Likes',
    bgColor: 'bg-yellow',
    image: '/images/journey/likes2.webp',
    focus: 'center 42%',
    body: {
      ja: [
        '仕事以外の時間は、好きなことをしながらのんびり過ごしています。',
        '海が大好きで、きれいなビーチを散歩したり、夕日や朝日の時間を楽しんだり。旅行先も、きれいな海がある場所を選びがちです。',
        'そして、甘いものも大好き。特にアイスクリームとケーキには目がなくて、時間があると自分でケーキを焼いたりもします。',
      ],
      en: [
        'When I’m not coding, I like to slow down and enjoy my own time.',
        'I love the ocean — beautiful beaches, sunset walks, and quiet mornings by the water. I’m naturally drawn to places with a good coastline when I travel.',
        'I also have a serious sweet tooth. I love ice cream and cake, and I bake my own when I have the time.',
      ],
    },
  },
]
