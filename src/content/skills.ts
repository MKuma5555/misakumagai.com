// 技術スタック。ここを直せば、帯・LP・下層ページのすべてに反映される。
import {
  IconBrandJavascript, IconBrandTypescript, IconBrandHtml5, IconBrandCss3, IconBrandPhp,
  IconBrandPython, IconDatabase, IconCoffee,
  IconBrandReact, IconBrandNextjs, IconBrandAstro, IconBrandTailwind, IconBrandBootstrap,
  IconLayoutGrid, IconBrandNodejs, IconApi, IconFlask,
  IconBrandMongodb,
  IconBrandGit, IconBrandGithub, IconBrandWordpress, IconBrandFigma, IconBrandVercel,
  IconCloud, IconBrandAws, IconBrandSupabase, IconPencil,
  type Icon,
} from '@tabler/icons-react'

export type Tech = { name: string; Icon: Icon; /** 業務経験なら true */ pro: boolean }

export const skillGroups: { titleEn: string; titleJa: string; items: Tech[] }[] = [
  {
    titleEn: 'Languages',
    titleJa: '言語',
    items: [
      { name: 'JavaScript', Icon: IconBrandJavascript, pro: true },
      { name: 'TypeScript', Icon: IconBrandTypescript, pro: true },
      { name: 'HTML5', Icon: IconBrandHtml5, pro: true },
      { name: 'CSS3', Icon: IconBrandCss3, pro: true },
      { name: 'PHP', Icon: IconBrandPhp, pro: true },
      { name: 'Python', Icon: IconBrandPython, pro: false },
      { name: 'SQL', Icon: IconDatabase, pro: false },
      { name: 'Java', Icon: IconCoffee, pro: false },
    ],
  },
  {
    titleEn: 'Frameworks & Libraries',
    titleJa: 'フレームワーク / ライブラリ',
    items: [
      { name: 'React', Icon: IconBrandReact, pro: true },
      { name: 'React Router', Icon: IconBrandReact, pro: true },
      { name: 'Next.js', Icon: IconBrandNextjs, pro: true },
      { name: 'Astro', Icon: IconBrandAstro, pro: true },
      { name: 'Tailwind CSS', Icon: IconBrandTailwind, pro: true },
      { name: 'Bootstrap', Icon: IconBrandBootstrap, pro: true },
      { name: 'Material UI', Icon: IconLayoutGrid, pro: true },
      { name: 'Node.js', Icon: IconBrandNodejs, pro: false },
      { name: 'Express.js', Icon: IconApi, pro: false },
      { name: 'FastAPI', Icon: IconApi, pro: false },
      { name: 'Flask', Icon: IconFlask, pro: false },
    ],
  },
  {
    titleEn: 'Database',
    titleJa: 'データベース',
    items: [
      { name: 'PostgreSQL', Icon: IconDatabase, pro: false },
      { name: 'MongoDB', Icon: IconBrandMongodb, pro: false },
    ],
  },
  {
    titleEn: 'Cloud & Tools',
    titleJa: 'クラウド / ツール',
    items: [
      { name: 'Git', Icon: IconBrandGit, pro: true },
      { name: 'GitHub', Icon: IconBrandGithub, pro: true },
      { name: 'WordPress', Icon: IconBrandWordpress, pro: true },
      { name: 'Figma', Icon: IconBrandFigma, pro: true },
      { name: 'Vercel', Icon: IconBrandVercel, pro: true },
      { name: 'Render', Icon: IconCloud, pro: true },
      { name: 'AWS', Icon: IconBrandAws, pro: true },
      { name: 'Supabase', Icon: IconBrandSupabase, pro: true },
      { name: 'Sanity', Icon: IconPencil, pro: true },
    ],
  },
]

/** LPに出す主力。全部は下層ページで見せる */
export const featuredTech: Tech[] = [
  { name: 'TypeScript', Icon: IconBrandTypescript, pro: true },
  { name: 'React', Icon: IconBrandReact, pro: true },
  { name: 'Next.js', Icon: IconBrandNextjs, pro: true },
  { name: 'Astro', Icon: IconBrandAstro, pro: true },
  { name: 'Tailwind CSS', Icon: IconBrandTailwind, pro: true },
  { name: 'WordPress', Icon: IconBrandWordpress, pro: true },
]

/** FV下の帯（日本語版のみ）。上段と下段で流す向きが逆 */
export const marqueeTop: Icon[] = [
  IconBrandJavascript, IconBrandTypescript, IconBrandReact, IconBrandNextjs,
  IconBrandAstro, IconBrandTailwind, IconBrandHtml5, IconBrandCss3,
]
export const marqueeBottom: Icon[] = [
  IconBrandWordpress, IconBrandPhp, IconBrandFigma, IconBrandGit,
  IconBrandGithub, IconBrandVercel, IconBrandAws, IconBrandSupabase,
]

/** 英語版の帯に流す文字。採用担当が拾いたい情報を並べる */
export const marqueeTextTop = [
  'FRONTEND DEVELOPER',
  'FULL-STACK ENGINEER',
  'MELBOURNE, AUSTRALIA',
  'JAPANESE & ENGLISH',
]
export const marqueeTextBottom = [
  'FROM DENTISTRY TO DEVELOPMENT',
  'BUILDING THINGS THAT GET THROUGH',
  'OPEN TO WORK',
]
