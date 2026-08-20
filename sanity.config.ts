import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemas'

/* 管理画面の設定。/studio で開く。

   basePath を変えるときは src/middleware.ts の matcher も直すこと。
   いま matcher が studio を除外しているので、言語のリダイレクトが効かない。
   ここだけ変えると、/studio が /ja/studio へ飛ばされて開かなくなる。 */

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool(),
    // GROQ（Sanity の問い合わせ言語）をその場で試せる画面
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
