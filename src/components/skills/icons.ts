/* 使うロゴだけを名前で読み込む。

   simple-icons は3000以上のブランドが入っている。
   文字列で動的に取り出すと「どれを使うか」がビルド時に分からず、
   全部がまとめてサイトに載ってしまう。
   ここで1つずつ名前を書くことで、使うものだけが載る。

   ロゴを足すときは、ここに1行と content/skills.ts に1行。 */

import {
  siHtml5,
  siCss,
  siJavascript,
  siTypescript,
  siReact,
  siTailwindcss,
  siBootstrap,
  siMui,
  siRedux,
  siFastapi,
  siNodedotjs,
  siWordpress,
  siPhp,
  siGit,
  siGithub,
  siPython,
  siFlask,
  siPostgresql,
  siMongodb,
  siCloudflare,
  siVercel,
  siFigma,
  siNextdotjs,
  siAstro,
  siLine,
  siGoogleads,
  siFlutter,
  siFirebase,
  siSupabase,
} from 'simple-icons'

export type BrandIcon = { path: string; hex: string; title: string }

export const ICONS: Record<string, BrandIcon> = {
  siHtml5,
  siCss,
  siJavascript,
  siTypescript,
  siReact,
  siTailwindcss,
  siBootstrap,
  siMui,
  siRedux,
  siFastapi,
  siNodedotjs,
  siWordpress,
  siPhp,
  siGit,
  siGithub,
  siPython,
  siFlask,
  siPostgresql,
  siMongodb,
  siCloudflare,
  siVercel,
  siFigma,
  siNextdotjs,
  siAstro,
  siLine,
  siGoogleads,
  siFlutter,
  siFirebase,
  siSupabase,
}
