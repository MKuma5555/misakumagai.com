/* 作品の文章を、指定したものだけ書き換える。

   使い方
     node scripts/update-works.mjs              入っている下書きの一覧を出す
     node scripts/update-works.mjs sg-medical   その1件だけ書き換える
     node scripts/update-works.mjs a b c        まとめて

   ── seed-sanity.mjs との違い ──
     seed    無いものを作る。あるものには触れない
     これ    あるものを狙って書き換える。指定したものだけ

   patch().set() は「書いた項目だけ」を差し替える。
   画像（thumbnail / screenshot*）はここで触っていないので、
   スタジオで上げたものはそのまま残る。

   引数を必ず要るようにしてあるのは、うっかり全件を上書きしないため。
   スタジオで手直ししたあとに流すと、その手直しは消える。 */

import { readFileSync } from 'node:fs'
import { createClient } from '@sanity/client'

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n')
    .filter((line) => line.trim() && !line.trim().startsWith('#'))
    .map((line) => {
      const at = line.indexOf('=')
      return [line.slice(0, at).trim(), line.slice(at + 1).trim()]
    }),
)

if (!env.SANITY_WRITE_TOKEN) {
  console.error('.env.local に SANITY_WRITE_TOKEN がありません。')
  process.exit(1)
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01',
  token: env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const ref = (slug) => ({ _type: 'reference', _ref: `tag-${slug}`, _key: slug })

/* 書き換える中身。キーは「いま Sanity にある作品の slug」。
   docId が現在の書類ID、fields が差し替える項目。
   slug 自体を変えたいときは fields に slug を入れる。

   unset は「消したい項目」。set に空文字を入れても項目は残るので、
   URL を取り下げたいときはこちらを使う。 */
const DRAFTS = {
  'sg-medical': {
    docId: 'project-sg-medical',
    fields: {
      slug: { _type: 'slug', current: 'dental-materials-site' },
      titleJa: '歯科材料メーカー 製品サイト',
      titleEn: 'Dental Materials Company — Product Site',
      summaryJa:
        '歯科材料の製品サイト。2人チームで、JavaScript・お問い合わせ・イベントLPを担当しました。',
      summaryEn:
        'A product site for a dental materials manufacturer. In a team of two, I handled the JavaScript, the contact form, and an event landing page.',
      tags: ['web', 'lp', 'wordpress', 'php', 'javascript', 'html'].map(ref),
      year: '2025',
      roleJa: 'JavaScript実装・お問い合わせ機能・LP制作',
      roleEn: 'JavaScript, contact form, landing page',
      overviewJa:
        '歯科材料メーカーの製品「VIP Powder」を紹介する製品サイトです。歯科医療関係者が製品情報を確認し、問い合わせや関連イベントの情報にたどり着けることを目的として制作しました。2人チームで、もう1名がデザインとメインのコーディング、私がJavaScriptの実装、お問い合わせページ、イベント用ランディングページ、WordPress化に伴うPHP実装を担当しました。制作期間は約3週間です。',
      overviewEn:
        'A product site for VIP Powder, a dental material made by a Japanese manufacturer. It introduces the product to dental professionals and gives them a way to ask questions or find related events. Built in about three weeks by a team of two: the other member led the design and main build, while I handled the JavaScript, the contact page, an event landing page, and the PHP work involved in moving it into WordPress.',
      pointsJa: [
        '歯科材料を扱うサイトのため、一般的な問い合わせとは扱う情報が違う。要件に合わせてフォームの項目から設計しました',
        '資料や料金表を添付できるよう、WordPressの環境に合わせてファイル添付付きのフォームを実装しました',
        '歯科医療関係者が集まるイベント向けに、製品を短時間で理解してもらうためのランディングページを別に制作しました',
      ],
      pointsEn: [
        'Dental materials come with different questions than a typical site, so I designed the contact form fields around what this audience actually needs to ask',
        'Added file uploads so people can attach documents or price lists, built to work within the WordPress setup',
        'Built a separate landing page for a dental industry event, structured so the product can be understood quickly on the day',
      ],
      status: 'live',
      showIn: ['ja', 'en'],
      featured: true,
      order: 50,
      liveUrl: 'https://sgmedical.jp/bip/',
    },
  },

  wordle: {
    docId: 'project-wordle',
    fields: {
      order: 70,
      tags: ['app', 'html', 'css', 'javascript'].map(ref),
      year: '2023',
      featured: true,
      summaryJa: '5文字の単語を6回で当てるパズル。スクールに入って最初に一人で作ったものです。',
      summaryEn:
        'The five-letter word puzzle, rebuilt from scratch. My first solo project after starting to study development.',
      overviewJa:
        '5文字の単語を6回以内に当てるパズルです。プログラミングスクールに入ってすぐ、最初の個人プロジェクトとして約2週間で作りました。入力された単語を正解と比べ、文字と位置の一致を見て判定する部分をJavaScriptで組んでいます。素のHTML・CSS・JavaScriptだけで、ゲームの状態を自分で持たせました。',
      overviewEn:
        'A word puzzle where you guess a five-letter word in six tries. Built in about two weeks as my first solo project after starting at coding school. The core of it is the JavaScript that compares each guess against the answer and works out which letters are right and whether they are in the right place. Plain HTML, CSS and JavaScript, holding the game state myself.',
      pointsJa: [
        '入力された単語を正解と比べ、文字と位置の一致から判定する部分を書きました。約13,000語の辞書を持たせ、ゲームの状態はJavaScriptで管理しています',
        '画面のキーボードが判定に合わせて色を変えます。緑は文字も位置も正解、黄色は文字だけ正解、灰色は含まれていない。今どこまで分かっているかを、覚えていなくても見れば分かるようにしました',
        'ルールや入力の間違いを画面上で伝えるようにしました。動くだけでなく、遊び方が分かることを目標にしています',
      ],
      pointsEn: [
        'Wrote the logic that compares a guess against the answer, letter by letter and position by position, checked against a dictionary of around 13,000 words, with the game state held in JavaScript',
        'The on-screen keyboard recolours as you play — green for right letter and place, yellow for right letter wrong place, grey for not in the word — so you can see what you know without having to remember it',
        'Added messages for the rules and for invalid input. The goal was not just a game that runs, but one you can pick up without being told how',
      ],
      roleJa: '個人制作（ロジック・UI・実装）',
      roleEn: 'Solo project — game logic, UI, build',
    },
  },

  /* 公開されている画面には TRIPTALES と出ている。
     リポジトリ名が TripTrail なので、そちらの名前で登録していた。
     見に行った人が目にするのは画面のほうなので、画面に合わせる。
     書類ID（project-triptrail）は変えない。変えると同じ作品が2件になる。 */
  triptales: {
    docId: 'project-triptrail',
    fields: {
      order: 60,
      slug: { _type: 'slug', current: 'triptales' },
      titleJa: 'TripTales（AI旅行プランアプリ）',
      titleEn: 'TripTales — AI Travel Planner',
      tags: ['app', 'javascript', 'nodejs', 'express', 'ejs', 'bootstrap', 'mongodb', 'openai'].map(
        ref,
      ),
      year: '2023',
      featured: false,
      summaryJa:
        '行き先を入れるとAIが過ごし方を提案する旅行プランアプリ。3人で作った、初めてのチーム開発です。',
      summaryEn:
        'A travel planner that suggests things to do in each destination using AI. Built by a team of three — my first time working with other developers.',
      overviewJa:
        '行き先や日程、行きたい場所を入力すると、OpenAI APIがその土地のおすすめの過ごし方を提案してくれる旅行プランアプリです。スクールでの3つ目の課題で、3人チームによる初めてのフルスタック開発でした。構成や機能をメンバーで話し合って決め、私は主にフロントエンドのUIとCSS、そしてログインやユーザー周りの画面を担当しました。制作期間は4週間ほどです。',
      overviewEn:
        'A travel planning app: enter your destinations, dates and the places you want to see, and the OpenAI API suggests activities for each stop. It was my third school project and my first full-stack build with a team of three. We decided the structure and features together in meetings; my main area was the frontend UI and CSS, along with the login and user-facing screens. Built over about four weeks.',
      pointsJa: [
        '3人それぞれ作りたいものが違ったので、話し合いを重ねて決めました。全員の案を入れることより、4週間で本当に作れる形にまとめることを優先しました',
        '人が書いたコードを扱うのが初めてでした。書き方も組み立て方も自分とは違うので、まず読んで理解してから、自分の担当を足していきました',
        'チームでのGitHubも初めてで、ブランチ・Pull Request・Mergeの流れを実際の開発の中で覚えました。自分の変更だけでなく、人の変更も見てから統合するようにしました',
      ],
      pointsEn: [
        'The three of us each wanted to build something different, so we worked it out over several meetings. Rather than fitting everyone’s idea in, we narrowed it to what we could actually finish in four weeks',
        'It was the first time I worked with code someone else had written. People structure and write things differently, so I read it and understood it first, then added my part',
        'It was also my first time using GitHub on a team. I learned branches, pull requests and merging by doing it — and got used to reading other people’s changes before merging, not just my own',
      ],
      roleJa: 'チーム開発3名（フロントエンドUI・CSS、ログイン画面）',
      roleEn: 'Team of 3 — frontend UI and CSS, login and user screens',
    },
  },

  'portfolio-v1': {
    docId: 'project-portfolio-v1',
    fields: {
      order: 130,
      featured: false,
      /* misakumagai.com ではなく Vercel の自動URLを指している。
         独自ドメインは新しいサイトが取るので、そちらを書くと、
         公開した瞬間このリンクが自分自身を指してしまう。
         この自動URLは奪われないので、旧サイトはここに残り続ける。 */
      liveUrl: 'https://react-test-six-iota.vercel.app',
    },
  },

  'portfolio-v2': {
    docId: 'project-portfolio-v2',
    fields: {
      order: 125,
      featured: false,
      titleJa: 'ポートフォリオサイト（2026年リニューアル）',
      titleEn: 'Portfolio Site — 2026 Rebuild',
      summaryJa:
        '自分の制作実績をまとめたサイト。作品を足すたびにコードを書き換えていた前のサイトを、管理画面から更新できる形に作り直しました。',
      summaryEn:
        'A site bringing my work together in one place. My previous portfolio needed a code change for every new project; this one is updated from an admin screen.',
      overviewJa:
        '自分の制作実績をまとめたポートフォリオサイトです。以前作ったサイトを一から作り直し、企画からデザイン、実装、CMSの設計までを一人で担当しました。制作期間は約15日です。前のサイトでは、作品を1つ追加するたびにコードにデータを書き足し、GitHubへpushする必要がありました。今回はSanityという管理画面を用意して、そこから作品を追加・編集できるようにしています。中身と見た目を切り離したので、これから作品が増えても実装には手を入れずに済みます。日本語版と英語版は、同じ文章を訳したものではありません。読んでくださる方が知りたいことが違うので、それぞれ別に書いています。',
      overviewEn:
        'A portfolio site bringing my work together in one place. I rebuilt my previous site from scratch and handled all of it myself — planning, design, the frontend build, and the CMS architecture. About 15 days from start to finish. On the old site, adding a single project meant writing the data into the code and pushing to GitHub before anything appeared. This version has a Sanity admin screen where projects are added and edited directly. Content and presentation are separated, so the site can keep growing without touching the implementation. The Japanese and English versions are not translations of one another. The people reading them are looking for different things, so each is written on its own.',
      pointsJa: [
        '作品を足すのにコードを触らなくていい形にしました。前のサイトはデータを書き足してpushする必要がありましたが、Sanityを入れて管理画面から追加・編集できるようにしています。中身と実装を分けたので、これから増えても運用が重くなりません',
        '序盤はAIと一緒にデザインの方向性を決めようとしていましたが、寄せるほど「AIらしい見た目」になり、方向が定まりませんでした。一度案を捨て、参考にしたいサイトを調べたうえで、Figmaのワイヤーフレームを自分で引き直しています。方向を自分で決めてからAIを実装のパートナーに回したことで、大枠は約1週間で組めました',
        '一から作り直したので、どのコンポーネントをどこに置くか、どこまでを担当させるかを、最初の段階から確かめながら進めました。あとから足しやすいかどうかは、ここでほとんど決まります',
      ],
      pointsEn: [
        'Adding a project no longer means touching code. The old site needed a data edit and a push; this one uses Sanity, so work is added and edited from an admin screen. Separating content from the implementation keeps the site easy to run as it grows',
        'Early on I tried to work out the visual direction together with AI, but the closer I followed its suggestions, the more generic and AI-made it looked, and the direction never settled. I scrapped it, researched sites whose style I wanted to learn from, and drew the wireframes myself in Figma. Deciding the direction first and then bringing AI in as an implementation partner got the main structure built in about a week',
        'Rebuilding from scratch let me look at the architecture from the very start — where each component sits, and how much any one of them should be responsible for. How easy something is to extend later is mostly decided right there',
      ],
      roleJa: '企画・UI/UXデザイン・フロントエンド実装・CMS設計',
      roleEn: 'Planning, UI/UX design, frontend development, CMS architecture',
    },
  },

  /* ここから下は並び順だけを直すもの。文章には触れない。

     seed-sanity.mjs は「すでにあるもの」に手を触れないので、
     一度入れたあとに seed 側の order を書き換えても反映されない。
     入れ直したい項目は、こちらに書いて狙って流す。 */
  'research-data-platform': {
    docId: 'project-research-data-platform',
    fields: { order: 20, featured: true },
  },
  'business-management-app': {
    docId: 'project-business-management-app',
    fields: { order: 40, featured: true },
  },
  'metalife-lp': {
    docId: 'project-metalife-lp',
    fields: { order: 80, featured: false },
  },
  'dental-ceramic-lp': {
    docId: 'project-dental-ceramic-lp',
    fields: { order: 90, featured: false },
  },
  'dental-invisalign-lp': {
    docId: 'project-dental-invisalign-lp',
    fields: { order: 100, featured: false },
  },
  'fitness-gym': {
    docId: 'project-fitness-gym',
    fields: { order: 120, featured: false },
  },

  dietmate: {
    docId: 'project-dietmate',
    fields: {
      order: 30,
      tags: ['app', 'react', 'javascript', 'bootstrap', 'nodejs', 'express', 'mongodb', 'maps'].map(
        ref,
      ),
      year: '2023',
      featured: true,
      titleJa: 'Diet.Mate（健康管理コミュニティアプリ）',
      titleEn: 'Diet.Mate — Health Tracking Community App',
      summaryJa:
        '体重や気分を記録してグラフで振り返れる健康管理アプリ。誰かと一緒だと続く、という考えから作りました。',
      summaryEn:
        'A health tracking app where you log your weight and mood and see it as a graph. Built on the idea that it is easier to keep going with someone else.',
      overviewJa:
        '体重・気分・水分量などを記録し、グラフで進み具合を振り返れる健康管理アプリです。ダイエットを一人で続けるのは難しいので、近くのアクティビティを探したり、イベントを作って誘ったりできるようにしました。スクールの最終課題で、2人チームで約2週間で作っています。私は会員登録とログイン、認証まわりのバックエンド、記録機能とグラフ表示を担当しました。',
      overviewEn:
        'A health tracking app where you log weight, mood and water intake and see your progress as a graph. Sticking to a diet alone is hard, so we added a way to find activities nearby and create events to invite people to. It was our final school project, built by a team of two in about two weeks. I handled sign-up and login, the backend around authentication, the daily logging, and the graphs.',
      pointsJa: [
        '会員登録・ログインと認証まわりのバックエンドを担当しました。前のプロジェクトでサーバー側を一度経験していたので、今回は自分から手を挙げた部分です',
        '記録した体重を、1ヶ月・6ヶ月・1年で切り替えて見られるようにしました。数字を貯めるだけでは変化が分からないので、期間を変えて眺められることを大事にしました',
        '2人チームで期間は2週間。相手はCSSとUIが得意だったので、そこは任せて私はデータ側に回りました。全部を半分ずつ分けるより、得意なところを持ったほうが早いと分かった作品です',
      ],
      pointsEn: [
        'I took on sign-up, login and the authentication side of the backend. I had written server-side code once before on the previous project, so this time I volunteered for it',
        'Logged weight can be viewed over one month, six months or a year. Numbers alone do not show change, so being able to switch the window and look again mattered',
        'Two people, two weeks. My teammate was strong at CSS and UI, so I left that to her and took the data side. Splitting by what each of us was good at turned out to be far faster than halving everything',
      ],
      roleJa: 'チーム開発2名（認証・バックエンド、記録機能、グラフ表示）',
      roleEn: 'Team of 2 — auth and backend, tracking features, data visualisation',
    },
  },

  'wedding-venue': {
    docId: 'project-wedding-venue',
    /* Render の公開先が Internal Server Error を返すので URL は取り下げる。
       開かないリンクは、無いより印象が悪い。 */
    unset: ['liveUrl'],
    fields: {
      order: 110,
      tags: ['app', 'html', 'css', 'python', 'flask', 'postgresql', 'render'].map(ref),
      year: '2023',
      featured: false,
      summaryJa:
        'メルボルンの式場を探せるWebアプリ。フロント・バック・DB・公開まで、初めて一人で通しました。',
      summaryEn:
        'A web app for finding wedding venues in Melbourne. My first project taken all the way through on my own — frontend, backend, database and deployment.',
      overviewJa:
        'メルボルンの結婚式場をカテゴリごとに見て、気に入った会場を自分のページに保存できるWebアプリです。スクールでの2つ目の課題で、フロントエンドだけでなく、バックエンド・データベース・公開までを初めて一人で担当しました。会員登録とログインを作り、利用者は保存、管理者は会場の追加・編集・削除ができるように、見える画面を分けています。',
      overviewEn:
        'A web app for browsing wedding venues in Melbourne by category and saving the ones you like to your own page. It was my second project at school, and the first where I handled everything myself — frontend, backend, database and deployment. It has sign-up and login, with two sides to it: visitors save venues, while an admin can add, edit and delete them.',
      pointsJa: [
        '初めて自分でサーバー側を書いた作品です。画面から送った内容がどこで処理され、どう返ってくるのかを、動かしながら理解していきました',
        '利用者と管理者で、できることを分けました。管理者は会場の追加・編集・削除ができます。誰が何をしていいかを先に決める必要がある、と気づいた作品です',
        'PostgreSQLにデータを持たせ、Renderで公開しました。フロント・バック・DB・公開までを一度通したことで、Webがどう繋がって動いているのかが初めて像として見えました',
      ],
      pointsEn: [
        'The first thing I built where I wrote the server side myself, learning by running it — where the form data goes, what happens to it, and what comes back',
        'Visitors and admins see different things: an admin can add, edit and delete venues. This was the project where I realised you have to decide who is allowed to do what before you build it',
        'Data lives in PostgreSQL and the app was deployed on Render. Going through frontend, backend, database and deployment once was the first time the whole shape of a web app made sense to me',
      ],
      roleJa: '個人制作（フロント・バックエンド・DB・デプロイ）',
      roleEn: 'Solo project — frontend, backend, database, deployment',
    },
  },
}

// ── 実行 ──────────────────────────────────────────
const keys = process.argv.slice(2)

if (keys.length === 0) {
  console.log('書き換えられるもの:')
  for (const k of Object.keys(DRAFTS)) console.log(`  ${k}`)
  console.log('\n例: node scripts/update-works.mjs sg-medical')
  process.exit(0)
}

const unknown = keys.filter((k) => !DRAFTS[k])
if (unknown.length) {
  console.error(`知らない名前: ${unknown.join(', ')}`)
  process.exit(1)
}

/* 公開済みと下書きは、Sanity では別の書類として置かれている。

     project-x          公開済み。サイトが読むのはこちら
     drafts.project-x   スタジオで編集中の下書き

   片方しか無いこともあるし、両方あることもある。
   無いIDに patch を投げると取引ごと失敗するので、
   先に「実際にあるほう」を訊いてから投げる。

   両方あるときは両方書き換える。下書きだけ直すと、
   スタジオで Publish した瞬間に古い内容が上書きされる。 */
const wanted = keys.flatMap((k) => [DRAFTS[k].docId, `drafts.${DRAFTS[k].docId}`])
const existing = new Set(await client.fetch('*[_id in $ids]._id', { ids: wanted }))

const missing = keys.filter(
  (k) => !existing.has(DRAFTS[k].docId) && !existing.has(`drafts.${DRAFTS[k].docId}`),
)
if (missing.length) {
  console.error(`Sanity に見つかりません: ${missing.join(', ')}`)
  console.error('先に node scripts/seed-sanity.mjs を流してください。')
  process.exit(1)
}

const tx = client.transaction()
for (const k of keys) {
  const { docId, fields, unset } = DRAFTS[k]
  for (const id of [docId, `drafts.${docId}`]) {
    if (!existing.has(id)) continue
    tx.patch(id, (p) => (unset ? p.set(fields).unset(unset) : p.set(fields)))
  }
}

await tx.commit()
console.log(`書き換えました: ${keys.join(', ')}`)
for (const k of keys) {
  const id = DRAFTS[k].docId
  const where = [existing.has(id) && '公開済み', existing.has(`drafts.${id}`) && '下書き']
    .filter(Boolean)
    .join(' + ')
  console.log(`  ${k}  ${where}`)
}
console.log('画像には触れていません。スタジオで Publish してください。')
