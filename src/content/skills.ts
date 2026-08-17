/* Skills セクションの中身。

   level は3段階。Misa 本人が振り分けたもの。
     pro       実務で使った
     used      使用経験あり
     learning  学習中

   icon は simple-icons のキー名。無いものは文字タイルになる。
   AWS と Canva は「ロゴを配らないで」と各社が申し入れていて
   simple-icons から削除されている。REST API はそもそもロゴが無い。
   この3つは文字タイルで出す。 */

export type SkillLevel = 'pro' | 'used' | 'learning'

export type Skill = {
  name: string
  level: SkillLevel
  icon?: string // simple-icons のキー。無ければ文字タイル
}

export const LEVELS: { key: SkillLevel | 'all'; ja: string; en: string }[] = [
  { key: 'all', ja: 'すべて', en: 'All' },
  { key: 'pro', ja: '実務', en: 'Professional' },
  { key: 'used', ja: '使用経験', en: 'Used' },
  { key: 'learning', ja: '学習中', en: 'Learning' },
]

export const skills: Skill[] = [
  // ── 実務で使った ──
  { name: 'HTML', icon: 'siHtml5', level: 'pro' },
  { name: 'CSS', icon: 'siCss', level: 'pro' },
  { name: 'JavaScript', icon: 'siJavascript', level: 'pro' },
  { name: 'TypeScript', icon: 'siTypescript', level: 'pro' },
  { name: 'React', icon: 'siReact', level: 'pro' },
  { name: 'Tailwind CSS', icon: 'siTailwindcss', level: 'pro' },
  { name: 'Bootstrap', icon: 'siBootstrap', level: 'pro' },
  { name: 'MUI', icon: 'siMui', level: 'pro' },
  { name: 'Redux', icon: 'siRedux', level: 'pro' },
  { name: 'FastAPI', icon: 'siFastapi', level: 'pro' },
  { name: 'Node.js', icon: 'siNodedotjs', level: 'pro' },
  { name: 'REST API', level: 'pro' },
  { name: 'AWS', level: 'pro' },
  { name: 'WordPress', icon: 'siWordpress', level: 'pro' },
  { name: 'PHP', icon: 'siPhp', level: 'pro' },
  { name: 'Git', icon: 'siGit', level: 'pro' },
  { name: 'GitHub', icon: 'siGithub', level: 'pro' },
  { name: 'Canva', level: 'pro' },

  // ── 使用経験あり ──
  { name: 'Python', icon: 'siPython', level: 'used' },
  { name: 'Flask', icon: 'siFlask', level: 'used' },
  { name: 'PostgreSQL', icon: 'siPostgresql', level: 'used' },
  { name: 'MongoDB', icon: 'siMongodb', level: 'used' },
  { name: 'Cloudflare', icon: 'siCloudflare', level: 'used' },
  { name: 'Vercel', icon: 'siVercel', level: 'used' },
  { name: 'Figma', icon: 'siFigma', level: 'used' },
  { name: 'Next.js', icon: 'siNextdotjs', level: 'used' },
  { name: 'Astro', icon: 'siAstro', level: 'used' },

  // ── 学習中 ──
  { name: 'LINE', icon: 'siLine', level: 'learning' },
  { name: 'Google Ads', icon: 'siGoogleads', level: 'learning' },
  { name: 'Flutter', icon: 'siFlutter', level: 'learning' },
  { name: 'Firebase', icon: 'siFirebase', level: 'learning' },
  { name: 'Supabase', icon: 'siSupabase', level: 'learning' },
]

/* 右側。ja は受託メニュー、en は役割。
   同じ内容を訳すと、どちらにも刺さらない。
   クライアントは「何を作ってくれるか」、採用担当は「何ができる人か」を見る。

   en の見出しで謝らないこと。「Backend Understanding」のように
   自信のなさを見出しに書くと、FV の「Full-stack Developer」と食い違い、
   読む人は弱いほうを信じる。控えめさは本文の言い回しで出せる。 */

export type Service = {
  icon: 'monitor' | 'layout' | 'code' | 'instagram' | 'languages'
  title: string
  body: string
}

export const servicesJa: Service[] = [
  {
    icon: 'monitor',
    title: 'Webサイト制作',
    body: 'お店や医院の想いを丁寧に聞いて、設計から公開まで。ひとりで最後まで見ます。',
  },
  {
    icon: 'layout',
    title: 'LP制作',
    body: '伝えたいことを整理し、読み手が自然に行動できる導線までつくります。',
  },
  {
    icon: 'code',
    title: 'Webアプリ開発',
    body: '予約・管理など、日々の仕事を少し楽にする仕組みを、使いやすさまで考えて形にします。',
  },
  {
    icon: 'instagram',
    title: 'Instagram運用',
    body: '投稿の企画・設計・制作から運用まで。無理なく続けられる形を一緒に探します。',
  },
]

export const servicesEn: Service[] = [
  {
    icon: 'code',
    title: 'Frontend Development',
    body: 'React, Next.js and TypeScript. I turn designs into working interfaces and bring a developer’s perspective to improve them.',
  },
  {
    icon: 'monitor',
    title: 'Backend & APIs',
    body: 'REST APIs, authentication and databases. Understanding what happens behind the screen helps me ask better questions and build a frontend that fits.',
  },
  {
    icon: 'layout',
    title: 'Design to Code',
    body: 'I use Figma and Canva in my web design process. As a developer, I think about how a design will work in practice, not just how it looks.',
  },
  {
    icon: 'languages',
    title: 'Learning from People',
    body: "I like to think things through and learn from the people around me. I'll try something new — and stick with it.",
  },
];
