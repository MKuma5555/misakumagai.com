/* 作品の「型」と「状態のラベル」を持つファイル。

   ── 中の works 配列はもう使われていない ──
   実際の作品は Sanity にある。取得は src/sanity/queries.ts。
   下の配列は、Sanity へ流し込むときの下書きとして残してあるだけ。
   直しても画面には出ない。編集はスタジオ（/studio）で行う。

   型（Work）と STATUS_LABEL は現役。queries.ts も画面もこれを使っている。

   thumbnail が無い案件が実際にある（NDA・未公開）ので、任意にしてある。
   無いときはカード側で「In progress…」の枠を出す。空の <img> は出さない。

   tags には「種類」と「技術」の両方を入れる。どちらかは content/tags.ts の
   group が決める。種類は一覧ページの絞り込みボタンになり、技術は表示だけ。
   1つの作品が複数の種類を持ってよい（LPでもありアプリでもある、が実際にある）。 */

export type WorkStatus = 'live' | 'wip' | 'ended' | 'nda' | 'study'

export type Work = {
  slug: string
  titleJa: string
  titleEn: string
  summaryJa: string
  summaryEn: string
  tags: string[]
  year: string
  status: WorkStatus
  showIn: ('ja' | 'en')[]
  featured: boolean

  thumbnail?: string // 一覧とスライダーのカード用

  /* 詳細ページ用。ノートPCとスマホの枠に入れる。
     縦に長い全体スクショでよい。上から表示して下は枠で切る。 */
  screenshotDesktop?: string
  screenshotMobile?: string

  /* 詳細ページの文章。
       overview  何をどう作ったかを2〜4行で
       points    ポイントを短く3つほど。長い文章より読まれる */
  overviewJa?: string
  overviewEn?: string
  pointsJa?: string[]
  pointsEn?: string[]

  roleJa?: string // 担当。「設計・実装・運用」など
  roleEn?: string

  liveUrl?: string // 実際に飛べるURL。無ければボタンを出さない
  repoUrl?: string
}

/* 画像が無いときにカードへ出す文字。状態で意味が変わる。
     nda   出せない案件。準備中ではないので、そう書いてはいけない
     それ以外 まだ用意していない

   非公開案件に「準備中」と出ると、サボっているように見える。
   出せない理由がある、と伝わる文にしてある。 */
export const NO_IMAGE_LABEL: Record<WorkStatus, { ja: string; en: string }> = {
  nda: { ja: '画像は非公開', en: 'Images withheld' },
  live: { ja: '準備中…', en: 'In progress…' },
  wip: { ja: '準備中…', en: 'In progress…' },
  ended: { ja: '準備中…', en: 'In progress…' },
  study: { ja: '準備中…', en: 'In progress…' },
}

export const STATUS_LABEL: Record<WorkStatus, { ja: string; en: string }> = {
  live: { ja: '公開中', en: 'Live' },
  wip: { ja: '制作中', en: 'In progress' },
  ended: { ja: '公開前に終了', en: 'Ended before launch' },
  nda: { ja: '非公開', en: 'Confidential' },
  study: { ja: '学習成果物', en: 'Coursework' },
}

export const works: Work[] = [
  {
    slug: 'sg-medical',
    titleJa: 'SG Medical（歯科器材メーカー）',
    titleEn: 'SG Medical',
    summaryJa: '歯科器材メーカーのコーポレートサイト。歯科衛生士としての経験を、製品の見せ方に活かしました。',
    summaryEn:
      'A corporate site for a dental instrument company, where my background as a dental hygienist shaped how the products are presented.',
    tags: ['web', 'wordpress', 'php', 'javascript'],
    year: '2025',
    status: 'live',
    showIn: ['ja', 'en'],
    featured: true,
    overviewJa:
      'チームで担当した実案件です。WordPressのオリジナルテーマで、ブランドに合わせた見た目に作りました。歯科の現場にいた経験があるので、歯科医師や歯科衛生士が何を見て製品を選ぶのかが分かった状態で設計できました。',
    overviewEn:
      'A real client project I worked on as part of a team. Built in WordPress with an original theme, designed around the company\u2019s branding. Having worked in dentistry, I knew what dentists and hygienists actually look for when choosing a product, and designed around that.',
    pointsJa: [
      'WordPressのオリジナルテーマをゼロから作成',
      '製品情報を比べやすく並べる構成に',
      '構成とSEOはチームで相談しながら決めた',
    ],
    pointsEn: [
      'Built an original WordPress theme from scratch',
      'Laid out product information so it can be compared at a glance',
      'Worked with the team on structure and SEO',
    ],
    roleJa: 'テーマ制作・実装',
    roleEn: 'Theme development, implementation',
    liveUrl: 'https://sgmedical.jp/bip/',
  },

  {
    slug: 'triptrail',
    titleJa: 'TripTrail（旅の計画アプリ）',
    titleEn: 'TripTrail',
    summaryJa: '行き先を入れると、AIがその土地の過ごし方を3つ提案してくれる旅の計画アプリ。初めてのチーム開発でした。',
    summaryEn:
      'A travel planner that suggests three things to do in each destination using AI. My first team project.',
    tags: ['app', 'express', 'javascript', 'openai'],
    year: '2024',
    status: 'study',
    showIn: ['ja', 'en'],
    featured: true,
    overviewJa:
      '行き先を入力すると、OpenAIがその場所ならではの過ごし方を3つ返します。旅程を保存でき、あとから見返したり編集したりできます。チームで作った初めてのアプリで、分担の仕方から学びました。',
    overviewEn:
      'Enter your destinations and OpenAI returns three activity ideas for each one. Trips are saved so you can come back, edit, or delete them. This was the first project I built with a team, and where I learned how to split work.',
    pointsJa: [
      'GoogleとGitHubのアカウントでログイン（OAuth2）',
      'OpenAIで、行き先ごとに3つの提案を返す',
      'ログインした人だけが自分の旅程を見られる',
    ],
    pointsEn: [
      'Sign in with Google or GitHub (OAuth2)',
      'Three AI suggestions per destination',
      'Trips are private to the person who made them',
    ],
    roleJa: 'チーム開発（フロント・バック両方）',
    roleEn: 'Team project (frontend and backend)',
    liveUrl: 'https://travel-planner-vza0.onrender.com/',
    repoUrl: 'https://github.com/MKuma5555/TripTrail',
  },

  {
    slug: 'dietmate',
    titleJa: 'DietMate（運動記録アプリ）',
    titleEn: 'DietMate',
    summaryJa: '日々の記録をグラフで見られて、一緒に運動する人も探せるアプリ。続けられる仕組みを考えました。',
    summaryEn:
      'A fitness app that charts your daily progress and helps you find people to train with.',
    tags: ['app', 'react', 'express', 'maps'],
    year: '2024',
    status: 'study',
    showIn: ['ja', 'en'],
    featured: true,
    overviewJa:
      '毎日の記録をグラフで振り返れるアプリです。ひとりだと続かないので、Google Mapsを使って近くのイベントを作ったり参加したりできるようにしました。「続けられるかどうか」を中心に考えた作品です。',
    overviewEn:
      'An app for tracking daily progress, with graphs so you can see how far you have come. Because it is hard to keep going alone, I added Google Maps so people can create and join events nearby. The whole thing was designed around staying motivated.',
    pointsJa: [
      '日々の記録をグラフで振り返れる',
      'Google Mapsで近くのイベントを作る・参加する',
      '目標に合わせたおすすめを出す',
    ],
    pointsEn: [
      'Daily progress shown as graphs',
      'Create and join nearby events with Google Maps',
      'Suggestions based on your own goals',
    ],
    roleJa: 'チーム開発（フロント中心）',
    roleEn: 'Team project (mostly frontend)',
    liveUrl: 'https://diet-mate.onrender.com/',
    repoUrl: 'https://github.com/MKuma5555/socialDiet_Project4',
  },

  {
    slug: 'wedding-venue',
    titleJa: '結婚式場さがしサイト',
    titleEn: 'Wedding Venue Finder',
    summaryJa: 'カテゴリから式場を探して、気に入ったものをお気に入りに保存できるサイト。',
    summaryEn:
      'A site for browsing wedding venues by category and saving your favourites to a personal list.',
    tags: ['web', 'python', 'flask', 'postgresql'],
    year: '2024',
    status: 'study',
    showIn: ['ja', 'en'],
    featured: false,
    overviewJa:
      'カテゴリごとに式場を並べ、気に入ったものをハートで保存できるようにしました。保存したものは自分のページにまとまります。PythonとFlask、PostgreSQLで作った初めてのデータベース付きのサイトです。',
    overviewEn:
      'Venues are grouped by category, and a like button saves the ones you want to remember. Saved venues collect on your own page. This was my first site with a real database, built with Python, Flask and PostgreSQL.',
    pointsJa: [
      'カテゴリで探せる一覧',
      'お気に入りを保存して、自分のページで見返せる',
      'PostgreSQLでデータを持つ',
    ],
    pointsEn: [
      'Browse venues by category',
      'Save favourites and revisit them on your own page',
      'Data stored in PostgreSQL',
    ],
    roleJa: '設計・実装',
    roleEn: 'Planning, development',
    liveUrl: 'https://project2-fnip.onrender.com/',
    repoUrl: 'https://github.com/MKuma5555/project2',
  },

  {
    slug: 'wordle',
    titleJa: 'Wordle（単語あてゲーム）',
    titleEn: 'Wordle Game',
    summaryJa: '5文字の単語を6回で当てるパズル。約13,000語の辞書を持たせています。',
    summaryEn:
      'The five-letter word puzzle, rebuilt from scratch with a 12,971-word dictionary.',
    tags: ['app', 'javascript'],
    year: '2023',
    status: 'study',
    showIn: ['ja', 'en'],
    featured: false,
    overviewJa:
      '5文字の単語を6回以内に当てるパズルを作りました。正しい文字と位置なら緑、文字は合っているが位置が違えば黄色、外れなら灰色。約13,000語の辞書から判定します。素のJavaScriptだけで書いた作品です。',
    overviewEn:
      'A word puzzle where you guess a five-letter word in six tries. Green means the right letter in the right place, yellow means the right letter in the wrong place, grey means it is not in the word. Guesses are checked against a 12,971-word list. Written in plain JavaScript.',
    pointsJa: [
      '約13,000語の辞書で入力を判定',
      '緑・黄・灰の3色で答えに近づける',
      'ライブラリを使わず素のJavaScriptで',
    ],
    pointsEn: [
      'Guesses checked against 12,971 real words',
      'Green, yellow and grey narrow it down',
      'Plain JavaScript, no libraries',
    ],
    roleJa: '個人制作',
    roleEn: 'Solo project',
    liveUrl: 'https://mkuma5555.github.io/wordle-app/wordle.html',
    repoUrl: 'https://github.com/MKuma5555/wordle-app',
  },

  {
    slug: 'fitness-gym',
    titleJa: 'フィットネスジムのサイト',
    titleEn: 'Fitness Gym Website',
    summaryJa: 'CSSの練習で作ったジムのサイト。見た目を整えることに集中した作品です。',
    summaryEn:
      'A gym website built to push my CSS. A concept site, made to practise getting the details right.',
    tags: ['web', 'javascript', 'bootstrap'],
    year: '2023',
    status: 'study',
    showIn: ['ja', 'en'],
    featured: false,
    overviewJa:
      'CSSを鍛えるために作った、ジムの紹介サイトです。Bootstrapのグリッドで画面幅に合わせ、フォントや色、余白を自分で決めて整えました。メニューの開閉はJavaScriptで動かしています。',
    overviewEn:
      'A promotional site for a gym, made to improve my CSS. Bootstrap\u2019s grid handles the widths, and I chose the fonts, colours and spacing myself. The dropdown menu is animated with JavaScript.',
    pointsJa: [
      'Bootstrapのグリッドで画面幅に合わせる',
      'フォント・色・余白を自分で決めて整えた',
      'メニューの開閉をJavaScriptで',
    ],
    pointsEn: [
      'Responsive layout with Bootstrap\u2019s grid',
      'Fonts, colours and spacing chosen by hand',
      'Dropdown menu animated with JavaScript',
    ],
    roleJa: '個人制作',
    roleEn: 'Solo project',
    liveUrl: 'https://mkuma5555.github.io/FitnessGymWeb/',
    repoUrl: 'https://github.com/MKuma5555/FitnessGymWeb',
  },

  {
    slug: 'portfolio-v1',
    titleJa: 'ポートフォリオサイト（旧）',
    titleEn: 'Portfolio Website (v1)',
    summaryJa: 'Reactで作った最初のポートフォリオ。いま見ているサイトの前の版です。',
    summaryEn: 'My first portfolio, built in React. The version before the site you are looking at.',
    tags: ['web', 'react', 'javascript', 'bootstrap'],
    year: '2024',
    status: 'ended',
    showIn: ['en'],
    featured: false,
    overviewJa:
      'Reactで作った最初のポートフォリオです。Vercelで公開し、独自ドメインを繋ぎました。ここで作りながら覚えたことが、いまのサイトの土台になっています。',
    overviewEn:
      'My first portfolio, built with React, deployed on Vercel and connected to my own domain. What I worked out while building it became the foundation for the site you are on now.',
    pointsJa: [
      'Reactで組んだ最初のサイト',
      'Vercelで公開し、独自ドメインを設定',
      'ここでの学びが今のサイトの土台に',
    ],
    pointsEn: [
      'My first site built in React',
      'Deployed on Vercel with a custom domain',
      'The groundwork for the current site',
    ],
    roleJa: '個人制作',
    roleEn: 'Solo project',
    repoUrl: 'https://github.com/MKuma5555/My-portfolio-website',
  },
]
