/* Sanity にタグと作品をまとめて入れる。

   使い方
     1  Sanity で書き込み用のトークンを作る（API → Tokens → Editor）
     2  .env.local に SANITY_WRITE_TOKEN=... を足す
     3  node scripts/seed-sanity.mjs

   何度流しても安全。すでにあるものには手を触れない（createIfNotExists）。
   スタジオで直した文章も、上げた画像も消えない。

   逆に言うと、ここの文章を直して流し直しても反映されない。
   入れたあとの編集はスタジオが正。1件だけ入れ直したいときは、
   先にスタジオでその作品を削除してから流すこと。

   画像は入れられない。ファイルをアップロードする必要があるので、
   スタジオから1枚ずつ上げること。

   このファイルは Node から直接動かす。Next.js のビルドには含まれない。 */

import { readFileSync } from 'node:fs'
import { createClient } from '@sanity/client'

// ── .env.local を読む（Next.js を通さないので自分で読む） ──────────
const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n')
    .filter((line) => line.trim() && !line.trim().startsWith('#'))
    .map((line) => {
      const at = line.indexOf('=')
      return [line.slice(0, at).trim(), line.slice(at + 1).trim()]
    }),
)

const token = env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('.env.local に SANITY_WRITE_TOKEN がありません。')
  process.exit(1)
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01',
  token,
  useCdn: false, // 書き込むのでキャッシュは使わない
})

// ── タグ ───────────────────────────────────────────
// slug は content/tags.ts と同じにすること。合っていれば絞り込みがそのまま動く
const TAGS = [
  // 種類。一覧ページの絞り込みボタンになる
  ['web', 'type', 'Webサイト', 'Website'],
  ['lp', 'type', 'LP', 'Landing Page'],
  ['app', 'type', 'アプリ', 'App'],
  ['design', 'type', 'デザイン', 'Design'],
  ['sns', 'type', 'インスタ運用', 'Social'],

  // 技術。カードに出るだけ
  ['react', 'tech', 'React', 'React'],
  ['nextjs', 'tech', 'Next.js', 'Next.js'],
  ['typescript', 'tech', 'TypeScript', 'TypeScript'],
  ['javascript', 'tech', 'JavaScript', 'JavaScript'],
  ['html', 'tech', 'HTML', 'HTML'],
  ['css', 'tech', 'CSS', 'CSS'],
  ['scss', 'tech', 'SCSS', 'SCSS'],
  ['figma', 'tech', 'Figma', 'Figma'],
  ['wordpress', 'tech', 'WordPress', 'WordPress'],
  ['php', 'tech', 'PHP', 'PHP'],
  ['python', 'tech', 'Python', 'Python'],
  ['flask', 'tech', 'Flask', 'Flask'],
  ['nodejs', 'tech', 'Node.js', 'Node.js'],
  ['express', 'tech', 'Express', 'Express'],
  ['ejs', 'tech', 'EJS', 'EJS'],
  ['mongodb', 'tech', 'MongoDB', 'MongoDB'],
  ['postgresql', 'tech', 'PostgreSQL', 'PostgreSQL'],
  ['tailwind', 'tech', 'Tailwind CSS', 'Tailwind CSS'],
  ['fastapi', 'tech', 'FastAPI', 'FastAPI'],
  ['aws', 'tech', 'AWS', 'AWS'],
  ['render', 'tech', 'Render', 'Render'],
  ['supabase', 'tech', 'Supabase', 'Supabase'],
  ['sanity', 'tech', 'Sanity', 'Sanity'],
  ['bootstrap', 'tech', 'Bootstrap', 'Bootstrap'],
  ['openai', 'tech', 'OpenAI API', 'OpenAI API'],
  ['maps', 'tech', 'Google Maps API', 'Google Maps API'],
]

const tagDocs = TAGS.map(([slug, group, labelJa, labelEn]) => ({
  _id: `tag-${slug}`,
  _type: 'tag',
  slug: { _type: 'slug', current: slug },
  group,
  labelJa,
  labelEn,
}))

// 作品からタグを参照するときの形
const ref = (slug) => ({ _type: 'reference', _ref: `tag-${slug}`, _key: slug })

// ── 作品 ───────────────────────────────────────────
const WORKS = [
  {
    slug: 'research-data-platform',
    order: 20,
    featured: true,
    status: 'nda',
    year: '2025–2026',
    showIn: ['ja', 'en'],
    tags: ['app', 'react', 'javascript', 'figma'],
    titleJa: '研究データ管理アプリ（非公開案件）',
    titleEn: 'Research Data Platform (confidential)',
    summaryJa:
      '研究データを扱うWebアプリ。動いているシステムに途中から入り、機能追加と改修を担当しました。',
    summaryEn:
      'A web app for managing research data. I joined an existing product mid-flight to add features and improve what was already there.',
    overviewJa:
      '研究者が研究データを管理・保存するためのWebアプリケーションです。すでに動いているシステムに途中から加わり、フロントエンドとして新機能の実装、既存機能の改修、バグ修正、UIの改善を担当しました。8名以上のチームで、週1回のチーム定例とフロントエンドの定例に参加しながら、Notionで管理されたタスクを期限内に進めています。担当期間は2025年11月から2026年4月まで。システムは現在も研究の現場で使われています。',
    overviewEn:
      'A web application researchers use to store and manage their data. I joined the team partway through, working on the frontend: new features, changes to existing ones, bug fixes and UI improvements. The team was eight-plus people across frontend, backend and design. Tasks came through Notion, and we met weekly as a whole team and again as the frontend group. I was on the project from November 2025 to April 2026; the system is still in use in the field.',
    pointsJa: [
      '扱うのが研究データだったので、参加する前に約2週間かけて資料を読みました。何のためのデータで、どんな流れで使われるのかが分からないと、画面は作れても正しくは作れません',
      '大きな既存のコードに途中から入ったので、担当箇所だけを見ずに、どこがどこに繋がっているかを調べてから直しました。他の機能を壊さないことが前提でした',
      'Notionで管理されたタスクを期限内に進め、詰まったところは週2回の定例で共有しました。抱え込まないことを意識しました',
    ],
    pointsEn: [
      'Because the data was research data, I spent about two weeks reading up before I started. Without knowing what the data is for and how it moves through a study, you can build the screen but not the right screen',
      'I came into a large existing codebase, so before changing anything I traced how the pieces connected. Not breaking the other features was the starting condition',
      'Work came through Notion with deadlines, and I brought anything I was stuck on to the two weekly meetings rather than sitting on it',
    ],
    roleJa: 'フロントエンド開発（React）・既存機能の改修・UI改善',
    roleEn: 'Frontend (React), feature work on an existing product, UI improvements',
  },

  {
    slug: 'business-management-app',
    order: 40,
    featured: true,
    status: 'nda',
    year: '2025',
    showIn: ['ja', 'en'],
    tags: ['app', 'react', 'typescript', 'tailwind', 'aws', 'fastapi', 'postgresql'],
    titleJa: '業務管理Webアプリ（非公開案件）',
    titleEn: 'Business Management Web App (confidential)',
    summaryJa:
      '紙とFAXで回していた申込み業務をWebに移した業務アプリ。6〜7名のチームでゼロから作り、いまも使われています。',
    summaryEn:
      'An internal web app that replaced a paper and fax workflow. Built from nothing with a team of six to seven, and still in daily use.',
    overviewJa:
      '自動車関連企業向けの業務管理Webアプリケーションです。それまで紙やFAXで回していたイベントの申込みと管理をWeb上にまとめ、申込みから関連する制作物のやり取りまでを一か所で扱えるようにしました。約6〜7名のチームで、プロダクトが何も無い状態から開発を始め、私はフロントエンドを担当。バックエンドの担当者とAPIの定義やデータの持ち方を相談しながら進めました。2025年2月から約5か月。いまも実際の業務で使われています。',
    overviewEn:
      'An internal web app for a company in the automotive industry. Event applications and the related back-and-forth used to run on paper and fax; this brought all of it into one place. I joined as a frontend engineer on a team of six to seven, starting from nothing — there was no product yet. I worked closely with the backend engineers on the API definitions and how the data should be shaped. About five months from February 2025, and it is still in active use.',
    pointsJa: [
      'AWS Cognito は実務で使うのが初めてだったので、本番でいきなり試すのではなく、先に小さな検証用アプリを作って認証の流れを理解してから入れました',
      '実装を進める中で、最初のAPI定義では足りないケースが見つかりました。バックエンドの担当者と相談しながら、必要なAPIを足していきました',
      'シナリオテストにも入り、実際の操作を想定して確認しました。「動く」と「使える」は別だと、ここで身体で覚えました',
    ],
    pointsEn: [
      'It was my first time using AWS Cognito on real work, so rather than experimenting on the production project I built a small test app first and learned the auth flow there',
      'As the build progressed, the original API definitions turned out not to cover every case. I worked through the gaps with the backend engineers and we added what was needed',
      'I also took part in scenario testing, walking through real user paths. That is where I learned that "it works" and "it is usable" are two different things',
    ],
    roleJa: 'フロントエンド開発（React / TypeScript）・API連携・テスト',
    roleEn: 'Frontend (React / TypeScript), API integration, testing',
  },

  {
    slug: 'portnavi',
    order: 10,
    featured: true,
    status: 'live',
    year: '2025',
    showIn: ['ja', 'en'],
    tags: ['web', 'wordpress', 'php', 'javascript', 'html', 'scss'],
    titleJa: 'PortNavi（Web制作ギャラリー）',
    titleEn: 'PortNavi',
    summaryJa:
      'Web制作の参考を探す人に向けた作品ギャラリー。3人チームで、FigmaからWordPress化まで担当しました。',
    summaryEn:
      'A gallery site for people learning web development. Built by a team of three, from Figma through to a custom WordPress theme.',
    overviewJa:
      'Web制作やコーディングを学ぶ人が、作品を探して参考にできるギャラリーサイトです。一覧やカテゴリーから作品を探し、詳細ページで中身を見られます。3人チームで、FigmaのデザインからWordPressのオリジナルテーマ化まで担当しました。私は実装のほか、メンバーのコードをまとめる開発環境とテスト環境の整備も受け持っています。',
    overviewEn:
      'A gallery site where people learning web development can browse real projects for reference. Visitors can search or filter by category, then open each project for the details. Built by a team of three, from the Figma design through to a custom WordPress theme. Alongside the build, I set up the local and test environments the team worked in.',
    pointsJa: [
      '無料で使えるプラグインを比較して選定。検索・閲覧数・Likeを、既存テーマとぶつからない形で追加しました',
      '3人ぶんのコードを1つにまとめる開発環境とテスト環境を構築。動作を確認してから統合できる状態にしました',
      '公開後にクライアント自身が更新できるよう、操作と仕様をまとめた仕様書を作成しました',
    ],
    pointsEn: [
      "Compared and chose free plugins for search, view counts and likes, so they would not clash with the theme or the client's budget",
      "Set up the local and test environments where three people's code came together and could be checked before merging",
      'Wrote a handover document so the client can update and run the site themselves after launch',
    ],
    roleJa: '実装・機能開発・開発環境の整備',
    roleEn: 'Implementation, feature development, dev environment',
    liveUrl: 'https://pronavi-board.noe-p.com/',
  },

  {
    slug: 'metalife-lp',
    order: 80,
    featured: false,
    status: 'study',
    year: '2025',
    showIn: ['ja', 'en'],
    tags: ['lp', 'html', 'scss', 'javascript', 'figma'],
    titleJa: 'MetaLife 活用紹介LP',
    titleEn: 'MetaLife Landing Page',
    summaryJa:
      'オンライン交流ツールの使い方を紹介するLP。チーム制作で、ファーストビューと診断コンテンツを担当しました。',
    summaryEn:
      'A landing page introducing how a community uses MetaLife, an online communication tool. A team build where I handled the hero and an interactive quiz.',
    overviewJa:
      'プログラミングスクールのコミュニティで使っていたオンライン交流ツール「MetaLife」の活用方法を紹介するランディングページです。チーム全員で構成とデザインを決め、私はファーストビューのデザインと実装、そこで使う動画の制作、そして診断コンテンツの設計と実装を担当しました。制作期間は約2週間。4チーム中2チームが選ばれる成果発表で、優勝しました。',
    overviewEn:
      'A landing page showing how a coding school community actually uses MetaLife, an online communication tool. The team decided the structure and design together; I designed and built the hero section, made the video used in it, and designed and built an interactive quiz. Built in about two weeks. Of four teams, two were selected at the final presentation — ours won.',
    pointsJa: [
      '説明するだけでなく体験してもらうために、いくつかの質問に答えると自分に合った使い方が分かる診断コンテンツを設計・実装しました',
      'メンバーには学習を始めて半年ほどの人もいたため、Git / GitHub の使い方と開発の流れを共有し、それぞれが自分の担当を実装できる状態を作りました',
      '短い制作期間の中で印象に残るファーストビューにするため、AIで動画素材を作って組み込みました',
    ],
    pointsEn: [
      'Designed and built a short quiz so visitors could find their own way of using the tool, rather than just reading about it',
      'Some teammates were six months into learning and had barely used Git. I walked them through the workflow so each of them could ship their own section',
      'With only two weeks, I generated video material with AI and built it into the hero to make the first screen land',
    ],
    roleJa: 'ファーストビュー・診断コンテンツ・チーム開発の環境づくり',
    roleEn: 'Hero section, interactive quiz, team workflow',
    liveUrl: 'https://mkuma5555.github.io/Team-Global/',
    repoUrl: 'https://github.com/MKuma5555/portnavi-team-global',
  },

  {
    slug: 'dental-ceramic-lp',
    order: 90,
    featured: false,
    status: 'live',
    year: '2025',
    showIn: ['ja', 'en'],
    tags: ['lp', 'html', 'css', 'javascript', 'php', 'wordpress'],
    titleJa: '歯科医院 セラミック治療のLP',
    titleEn: 'Dental Clinic — Ceramic Treatment Landing Page',
    summaryJa:
      'セラミック治療を検討している患者さん向けのLP。デザインデータを受け取り、実装と既存WordPressへの組み込みを担当しました。',
    summaryEn:
      'A landing page for patients considering ceramic dental treatment. I took the design files and built the page, then folded it into the clinic’s existing WordPress site.',
    overviewJa:
      'セラミック治療を検討している患者さんに向けて、治療の特徴・症例・料金・治療の流れ・よくある質問をまとめたランディングページです。デザイナーが Photoshop / Illustrator で作ったデータを受け取り、実装を担当しました。PC・スマートフォンのレスポンシブ対応まで整えたうえで PHP 化し、既存の WordPress サイトに組み込んでいます。制作期間は約2〜3週間です。',
    overviewEn:
      'A landing page for patients considering ceramic treatment, covering what the treatment involves, case examples, pricing, the steps, and common questions. I received the design as Photoshop and Illustrator files and built it from there — responsive across desktop, tablet and mobile — then converted it to PHP and folded it into the clinic’s existing WordPress site. Built in about two to three weeks.',
    pointsJa: [
      'デザイナーの意図をそのまま出すため、余白・文字サイズ・画像の位置を一つずつ合わせて再現しました',
      'デザインは1枚ぶんしかないので、画面幅が変わったときにどこをどう畳むかを判断しながらレスポンシブ対応しました',
      '静的なHTML/CSSとして作ったページをPHP化し、すでに動いているWordPressサイトに組み込みました',
    ],
    pointsEn: [
      'Matched the design closely — spacing, type sizes and image placement — so the designer’s intent survived the handover',
      'The design existed at one width, so I decided how each section should fold as the screen narrows, and built the responsive behaviour from there',
      'Converted the static HTML and CSS into PHP and integrated it into the clinic’s live WordPress site',
    ],
    roleJa: 'コーディング・レスポンシブ対応・WordPress組み込み',
    roleEn: 'Frontend build, responsive, WordPress integration',
    liveUrl: 'https://dentaloffice-k.com/ceramiclp/',
  },

  {
    slug: 'dental-invisalign-lp',
    order: 100,
    featured: false,
    status: 'live',
    year: '2025',
    showIn: ['ja', 'en'],
    tags: ['lp', 'html', 'css', 'php', 'wordpress'],
    titleJa: '歯科医院 マウスピース矯正のLP',
    titleEn: 'Dental Clinic — Invisalign Landing Page',
    summaryJa:
      'マウスピース矯正を検討している患者さん向けのLP。すでに動いている医院のサイトに、影響を出さずに組み込みました。',
    summaryEn:
      'A landing page about Invisalign for a dental clinic, added to their live WordPress site without disturbing what was already there.',
    overviewJa:
      'マウスピース矯正（Invisalign）を検討している患者さんに向けて、治療の内容や特徴を分かりやすくまとめたランディングページです。デザイナーが Illustrator / Photoshop で作ったデータをもとに実装し、PHP化して既存の WordPress サイトへ組み込みました。すでに患者さんが見ているサイトなので、他のページに影響が出ないことを確かめながら進めています。制作期間は約2〜3週間です。',
    overviewEn:
      'A landing page explaining Invisalign clear aligner treatment for people considering it. I built it from the designer’s Illustrator and Photoshop files, converted it to PHP, and added it to the clinic’s existing WordPress site. Because patients were already using that site, the work had to land without affecting anything else. Built in about two to three weeks.',
    pointsJa: [
      'すでに動いている医院のサイトに足すので、先に既存の構成とファイルを読んでから実装しました。他のページに影響を出さないことが前提でした',
      'デザイナーのデータをもとに、余白・文字サイズ・画像の位置まで合わせて再現しました',
      'PC向けに作られたデザインを、スマートフォンでも読みやすい形に組み直しました',
    ],
    pointsEn: [
      'The clinic’s site was already live, so I read through its structure and files before writing anything — nothing else could break',
      'Matched the designer’s files down to spacing, type sizes and image placement',
      'Rebuilt a desktop-first design so it still reads well on a phone',
    ],
    roleJa: 'コーディング・レスポンシブ対応・WordPress組み込み',
    roleEn: 'Frontend build, responsive, WordPress integration',
    liveUrl: 'https://prince-dental.jp/invisalign-lp/',
  },

  {
    slug: 'sg-medical',
    order: 50,
    featured: true,
    status: 'live',
    year: '2025',
    showIn: ['ja', 'en'],
    tags: ['web', 'wordpress', 'php', 'javascript'],
    titleJa: 'SG Medical（歯科器材メーカー）',
    titleEn: 'SG Medical',
    summaryJa:
      '歯科器材メーカーのコーポレートサイト。歯科衛生士としての経験を、製品の見せ方に活かしました。',
    summaryEn:
      'A corporate site for a dental instrument company, where my background as a dental hygienist shaped how the products are presented.',
    overviewJa:
      'チームで担当した実案件です。WordPressのオリジナルテーマで、ブランドに合わせた見た目に作りました。歯科の現場にいた経験があるので、歯科医師や歯科衛生士が何を見て製品を選ぶのかが分かった状態で設計できました。',
    overviewEn:
      'A real client project I worked on as part of a team. Built in WordPress with an original theme, designed around the company’s branding. Having worked in dentistry, I knew what dentists and hygienists actually look for when choosing a product, and designed around that.',
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
    slug: 'triptales',
    id: 'triptrail', // 書類IDは変えない。変えると同じ作品が2件になる
    order: 60,
    featured: false,
    status: 'study',
    year: '2023',
    showIn: ['ja', 'en'],
    tags: ['app', 'javascript', 'nodejs', 'express', 'ejs', 'bootstrap', 'mongodb', 'openai'],
    titleJa: 'TripTales（AI旅行プランアプリ）',
    titleEn: 'TripTales — AI Travel Planner',
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
    liveUrl: 'https://travel-planner-vza0.onrender.com/',
    repoUrl: 'https://github.com/MKuma5555/TripTrail',
  },

  {
    slug: 'dietmate',
    order: 30,
    featured: true,
    status: 'study',
    year: '2023',
    showIn: ['ja', 'en'],
    tags: ['app', 'react', 'javascript', 'bootstrap', 'nodejs', 'express', 'mongodb', 'maps'],
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
    liveUrl: 'https://diet-mate.onrender.com/',
    repoUrl: 'https://github.com/MKuma5555/socialDiet_Project4',
  },

  {
    slug: 'wedding-venue',
    order: 110,
    featured: false,
    status: 'study',
    year: '2023',
    showIn: ['ja', 'en'],
    tags: ['app', 'html', 'css', 'python', 'flask', 'postgresql', 'render'],
    titleJa: '結婚式場さがしサイト',
    titleEn: 'Wedding Venue Finder',
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
    repoUrl: 'https://github.com/MKuma5555/project2',
  },

  {
    slug: 'wordle',
    order: 70,
    featured: true,
    status: 'study',
    year: '2023',
    showIn: ['ja', 'en'],
    tags: ['app', 'html', 'css', 'javascript'],
    titleJa: 'Wordle（単語あてゲーム）',
    titleEn: 'Wordle Game',
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
    liveUrl: 'https://mkuma5555.github.io/wordle-app/wordle.html',
    repoUrl: 'https://github.com/MKuma5555/wordle-app',
  },

  {
    slug: 'fitness-gym',
    order: 120,
    featured: false,
    status: 'study',
    year: '2024',
    showIn: ['ja', 'en'],
    tags: ['web', 'html', 'css', 'javascript', 'bootstrap'],
    titleJa: 'フィットネスジムのサイト（モック）',
    titleEn: 'Fitness Gym Website (mock)',
    summaryJa:
      '架空のジムのサイトを、デザインからコーディングまで1日で作ったもの。手を速く動かす練習です。',
    summaryEn:
      'A mock site for a fictional gym, designed and coded in a single day. A speed exercise.',
    overviewJa:
      '実在しないジムを想定して、ラフなデザインを起こしてからコーディングまでを1日で仕上げたモックサイトです。作り込むことより、決めて手を動かして形にするまでの速さを目的にしました。Bootstrapのグリッドで画面幅に合わせ、メニューの開閉だけJavaScriptで動かしています。',
    overviewEn:
      'A mock site for a gym that does not exist, sketched and coded in one day. The goal was speed — deciding and shipping, rather than polishing. Bootstrap’s grid handles the widths, and JavaScript drives the dropdown menu.',
    pointsJa: [
      'デザインからコーディングまで1日。作り込むより、決めて形にするまでの速さを目的にしました',
      'Bootstrapのグリッドを使い、画面幅に合わせて崩れない形にしました',
      'メニューの開閉だけJavaScriptで動かしています',
    ],
    pointsEn: [
      'Design to code in one day — the point was to decide and ship, not to polish',
      'Used Bootstrap’s grid so the layout holds at any width',
      'JavaScript only where it earned its place: the dropdown menu',
    ],
    roleJa: '個人制作（デザイン・実装）',
    roleEn: 'Solo project (design and build)',
    liveUrl: 'https://mkuma5555.github.io/FitnessGymWeb/',
    repoUrl: 'https://github.com/MKuma5555/FitnessGymWeb',
  },

  {
    slug: 'portfolio-v2',
    order: 125,
    featured: false,
    status: 'live',
    year: '2026',
    showIn: ['ja', 'en'],
    tags: ['web', 'nextjs', 'react', 'typescript', 'tailwind', 'sanity', 'figma'],
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

  {
    slug: 'portfolio-v1',
    order: 130,
    featured: false,
    status: 'ended',
    year: '2024',
    showIn: ['en'],
    tags: ['web', 'react', 'javascript', 'bootstrap'],
    titleJa: 'ポートフォリオサイト（旧）',
    titleEn: 'Portfolio Website (v1)',
    summaryJa: 'Reactで作った最初のポートフォリオ。いま見ているサイトの前の版です。',
    summaryEn:
      'My first portfolio, built in React. The version before the site you are looking at.',
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
    /* misakumagai.com ではなく Vercel の自動URLを指している。
       独自ドメインは新しいサイトが取るので、そちらを書くと、
       公開した瞬間このリンクが自分自身を指してしまう。
       この自動URLは奪われないので、旧サイトはここに残り続ける。 */
    liveUrl: 'https://react-test-six-iota.vercel.app',
    repoUrl: 'https://github.com/MKuma5555/My-portfolio-website',
  },
]

/* 書類IDは slug から作る。ただし id を書いてあればそちらを優先する。

   slug を変えたい作品が出たときのため。Sanity ではIDが同一性そのものなので、
   IDまで変えると「別の作品」になり、同じものが2件並ぶ。
   すでにスタジオに入っている作品の slug を変えるときは、
   元の slug を id に書き写してから slug のほうを変えること。 */
const workDocs = WORKS.map((w) => ({
  _id: `project-${w.id ?? w.slug}`,
  _type: 'project',
  slug: { _type: 'slug', current: w.slug },
  titleJa: w.titleJa,
  titleEn: w.titleEn,
  summaryJa: w.summaryJa,
  summaryEn: w.summaryEn,
  tags: w.tags.map(ref),
  year: w.year,
  status: w.status,
  showIn: w.showIn,
  featured: w.featured,
  order: w.order,
  overviewJa: w.overviewJa,
  overviewEn: w.overviewEn,
  pointsJa: w.pointsJa,
  pointsEn: w.pointsEn,
  roleJa: w.roleJa,
  roleEn: w.roleEn,
  ...(w.liveUrl ? { liveUrl: w.liveUrl } : {}),
  ...(w.repoUrl ? { repoUrl: w.repoUrl } : {}),
}))

// ── 流し込む ────────────────────────────────────────
/* createIfNotExists を使う。createOrReplace ではない。

   replace だと、すでにあるものを丸ごと上書きしてしまう。
   スタジオで直した文章も、上げた画像も消える。
   一度入れたあとは、編集はスタジオ側が正。ここは触らない。

   入れ直したい1件があるときは、先にスタジオでその作品を削除してから流す。

   タグを先に作る。作品がタグを参照しているので、逆だと参照先が無い。 */
async function run() {
  const tx = client.transaction()
  for (const doc of [...tagDocs, ...workDocs]) tx.createIfNotExists(doc)
  await tx.commit()

  console.log(`タグ ${tagDocs.length}件 / 作品 ${workDocs.length}件 を確認しました。`)
  console.log('すでにあるものはそのままです（上書きしません）。')
  console.log('画像はスタジオから1枚ずつ上げてください。')
}

run().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
