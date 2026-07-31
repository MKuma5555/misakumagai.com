// misa-site から移植した作品データ。#7 で Sanity に移す予定のモックデータ。

export type Work = {
  id: string;
  title: string;
  titleEn: string;
  type: string;
  typeEn: string;
  summary: string;
  summaryEn: string;
  image: string;
  role: string;
  roleEn: string;
  year: string;
  client: string;
  clientEn: string;
  description: string;
  descriptionEn: string;
  challenge: string;
  challengeEn: string;
  approach: string;
  approachEn: string;
  outcome: string;
  outcomeEn: string;
  gallery: string[];
};

export const works: Work[] = [
  {
    id: "01",
    title: "こもれび歯科クリニック",
    titleEn: "Komorebi Dental Clinic",
    type: "Web制作 / 医療",
    typeEn: "Web Design / Healthcare",
    summary: "不安を抱えて訪れる人のために、やさしい導線と光のある色を設計しました。",
    summaryEn: "Gentle navigation and light-filled colors for anxious patients visiting the clinic.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1000&q=80",
    role: "デザイン・実装",
    roleEn: "Design & Development",
    year: "2024",
    client: "こもれび歯科クリニック",
    clientEn: "Komorebi Dental Clinic",
    description: "地域密着型の歯科クリニックのWebサイトを、ゼロから設計・制作しました。患者さんが安心して来院できるよう、院内の雰囲気が伝わる写真を多用し、予約の導線をシンプルに整えました。",
    descriptionEn: "Designed and built the website for a community-focused dental clinic from scratch. Used warm photography that conveys the clinic's atmosphere, and simplified the appointment booking flow so patients can act without hesitation.",
    challenge: "歯科に対する不安感を持つ患者さんが、サイトを見て「ここなら大丈夫かも」と思える安心感を、画面からどう伝えるかが課題でした。",
    challengeEn: "The challenge was conveying a sense of safety through the screen — so that anxious patients feel 'maybe I'll be okay here' before they even visit.",
    approach: "光の差し込む院内の写真をヒーローに据え、手書き風のフォントと生成色のパレットで温かみを表現。予約ボタンは全ページの目立つ位置に固定し、迷わない導線を設計しました。",
    approachEn: "Placed sunlit interior photography as the hero, paired with a handwritten-style font and generative color palette for warmth. The booking button stays fixed in a prominent position on every page for a frictionless path.",
    outcome: "公開後3ヶ月で予約のWeb経由率が40%向上。問い合わせの質も上がり、初診患者さんの不安に関する質問が増えるなど、サイトが安心感を伝えていることが数字にも表れました。",
    outcomeEn: "Within three months of launch, web-based bookings rose 40%. The quality of inquiries improved too — more first-time patients asked anxiety-related questions, evidence the site was doing its job.",
    gallery: [
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1000&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e6573c8f51?w=1000&q=80",
      "https://images.unsplash.com/photo-1588776818647-5132b6415323?w=1000&q=80",
    ],
  },
  {
    id: "02",
    title: "Mori habit tracker",
    titleEn: "Mori Habit Tracker",
    type: "Frontend / React",
    typeEn: "Frontend / React",
    summary: "毎日の小さな変化を記録する、静かで軽やかなReactアプリ。",
    summaryEn: "A calm, lightweight React app for tracking small daily changes.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1000&q=80",
    role: "フロントエンド開発",
    roleEn: "Frontend Development",
    year: "2024",
    client: "個人プロジェクト",
    clientEn: "Personal Project",
    description: "習慣化をサポートするReactアプリを設計から実装まで担当。無理なく続けられることを第一に、一日の記録が「できた」と思える体験を目指しました。",
    descriptionEn: "Led design and implementation of a habit-tracking React app. Prioritized sustainability over streaks — the daily interaction should feel like a small win, not a chore.",
    challenge: "習慣化アプリは「連続記録」にプレッシャーを感じて続かなくなる人が多いという問題がありました。どうすれば、やさしく、長く続けられるかが問いでした。",
    challengeEn: "Habit apps often create pressure around 'streaks' that makes people quit. The question was how to keep it gentle enough to sustain long-term.",
    approach: "連続日数は表示せず、その日の達成だけを静かに祝うUIに。モーションは控えめに、色は森林を思わせる緑のトーンで統一。オフラインでも動くよう、データはローカルに保存しています。",
    approachEn: "Removed streak counters entirely — the UI quietly celebrates only today's completion. Motion is restrained, colors are unified in forest-green tones, and data is stored locally so it works offline.",
    outcome: "個人で3ヶ月以上継続使用中。友人へのシェアをきっかけに、小さなコミュニティが自然発生的にでき、互いの記録を見せ合う文化が生まれました。",
    outcomeEn: "Personally used for 3+ months. Sharing with friends organically grew a small community where people show each other their daily records.",
    gallery: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1000&q=80",
      "https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=1000&q=80",
      "https://images.unsplash.com/photo-1506784983877-45594efa89c8?w=1000&q=80",
    ],
  },
  {
    id: "03",
    title: "喫茶ヒバリ 季節の便り",
    titleEn: "Cafe Hibari Seasonal Letter",
    type: "LP制作 / 食",
    typeEn: "Landing Page / Food",
    summary: "メルボルンの空気と、東京の喫茶店をひとつのページに。",
    summaryEn: "Melbourne's atmosphere and a Tokyo cafe, woven into one page.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&q=80",
    role: "デザイン・実装",
    roleEn: "Design & Development",
    year: "2023",
    client: "喫茶ヒバリ",
    clientEn: "Cafe Hibari",
    description: "東京の古い喫茶店と、メルボルンのコーヒーカルチャーを融合した季節限定のLPを制作。季節ごとに内容が変わる仕組みも設計しました。",
    descriptionEn: "Created a seasonal landing page fusing a historic Tokyo cafe with Melbourne coffee culture. Designed a system so the content updates with each season.",
    challenge: "二つの異なる文化背景を持つお店の魅力を、一枚のページで矛盾なく伝える必要がありました。どちらかが強調されすぎると、もう一方の魅力が消えてしまうバランスが難点でした。",
    challengeEn: "The shop bridges two distinct cultures. Emphasizing one risked erasing the other — the balance was the hard part.",
    approach: "メルボルンの路地感を想起させるレイアウトに、日本語の縦書き見出しを組み合わせることで、二つの文化が「並走する」構成に。季節の便りという名の通り、内容は四半期ごとに更新されます。",
    approachEn: "Combined a Melbourne-lane layout with Japanese vertical headings, so the two cultures 'run side by side.' True to the name 'seasonal letter,' the content refreshes each quarter.",
    outcome: "公開後、来店者の「サイトを見て来た」という声が増加。季節メニューの注文率も20%上がり、サイトが来店動機として機能していることがわかりました。",
    outcomeEn: "Post-launch, more visitors cited the site as their reason for coming. Seasonal menu orders rose 20%, confirming the site works as a real visit driver.",
    gallery: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&q=80",
      "https://images.unsplash.com/photo-1554118811-93e07977f3d2?w=1000&q=80",
      "https://images.unsplash.com/photo-1521017432531-fbd8441c6d6d?w=1000&q=80",
    ],
  },
  {
    id: "04",
    title: "moku skincare",
    titleEn: "moku Skincare",
    type: "運用 / Instagram",
    typeEn: "Management / Instagram",
    summary: "投稿の企画から撮影の方向性まで、ブランドの声を一緒に育てます。",
    summaryEn: "From content planning to shoot direction, growing the brand's voice together.",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=1000&q=80",
    role: "コンサル・運用支援",
    roleEn: "Consulting & Content Support",
    year: "2023-継続中",
    client: "moku skincare",
    clientEn: "moku skincare",
    description: "ナチュラルスキンケアブランドのInstagram運用を、企画から撮影ディレクションまで包括的に支援。ブランドの哲学を、継続できるリズムで発信できる仕組みを作りました。",
    descriptionEn: "Comprehensively supported an indie skincare brand's Instagram — from planning to shoot direction. Built a sustainable rhythm for communicating the brand's philosophy without burnout.",
    challenge: "ブランドの哲学は深いものの、それを毎週の投稿でどう表現し続けるかが負担になっていました。「質を保ちながら無理なく続く」運用設計が求められていました。",
    challengeEn: "The brand's philosophy was deep, but expressing it weekly was becoming a burden. They needed an operating design that maintained quality without burning out.",
    approach: "月4本の投稿テーマをあらかじめ決め、撮影は月1回にまとめて実施。テキストのトーンはブランドノートとして文書化し、誰が書いてもブランドらしい声になるようにしました。",
    approachEn: "Pre-decided four monthly themes, batched shoots once a month. Documented the brand voice so anyone writing stays on-tone.",
    outcome: "フォロワー数は半年で1.8倍に。投稿への保存率も上がり、商品ページへの流入も安定。今でも月1のリズムで、無理なく続いています。",
    outcomeEn: "Followers grew 1.8x in six months. Save rates rose, traffic to the product page stabilized. The monthly rhythm is still running sustainably.",
    gallery: [
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=1000&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=1000&q=80",
      "https://images.unsplash.com/photo-1612817288484-6f916006713a?w=1000&q=80",
    ],
  },
];

