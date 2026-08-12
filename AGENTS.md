<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# misakumagai.com

ポートフォリオサイト。Next.js 16 / Tailwind v4 / Sanity / Supabase / Vercel。

`/ja` は案件獲得（歯科医院・サロン・小規模店舗）向け。
`/en` は転職（オーストラリアのフロントエンド職）向け。
翻訳ではなく別編集。目的が違うので構成から変える。

## 決まっていること（蒸し返さない）

### 色

| | | |
|---|---|---|
| 生成り | `#f2f2eb` | ページ全体の地 |
| 砂 | `#e0dac3` | セクションを交互に敷く |
| 差し色 | `#e59902` | CTA・アクティブ・バッジ |
| オリーブ | `#74882f` | 線とアイコン |
| 濃オリーブ | `#5e6e26` | 面。ナビの丸など、白を抜いて乗せる |
| 文字 | `#3f3b30` | |
| フッター | `#4a4a34` | 文字は生成り |

制約:

- 差し色に白文字は 2.36 で読めない。必ず濃色（`#3f3b30` で 4.73）
- オリーブは線とアイコンのみ。文字にすると 3.52 で落ちる。文字は `#526022`
- 補助文字は `#635c4c`。砂の上でも 4.73 で通る
- 差し色と砂は色相が3°しか違わない。砂の上のカードは生成りを敷く

オリーブは3段。用途で使い分ける。

```
olive       #74882f  線とアイコン
olive-deep  #5e6e26  面。白抜き（白 5.62）
olive-text  #526022  文字（生成り 6.11 / 砂 4.91）
```

About セクションのタブ3枚は、手持ちの色を淡くしたもの。新しい色は持ち込まない。

```
01 About me  #dfe8cc  オリーブ由来
02 Journey   #f7e6c6  差し色由来
03 Likes     #f2d8cb  テラコッタ
```

ナビは `fixed` なのでこの3色の上も通過する。**ナビの丸の色は5種類の背景すべてで成立すること**（生成り・砂・上の3色）。生成りの丸は生成りの上で消えるので使えない。

色を足すときは必ずコントラスト比を計算する。生成りと砂の**両方**で。

### フォント（4種まで。増やさない）

EB Garamond / Shippori Mincho B1 / Zen Kaku Gothic New / JetBrains Mono

和文は `preload: false`。1書体で数MBあるので、初回表示が待たされる。

### セクションの並び

```
FV → About me → Skills → Works → Flow(jaのみ) → Contact → Closing
```

**Journey と Likes は About me の中。** 別セクションに割らない。

### Works

6件・自動再生の横スライダー。ホバーとフォーカスで停止、矢印で手動送り。
`prefers-reduced-motion` に従う。

絞り込みは**タグのピルだけ**。カテゴリタブは作らない（12件に2階層は多すぎる）。
タグを出すのは一覧ページだけ。トップのスライダーには出さない。

## フォルダの分け方

| | |
|---|---|
| `layout/` | 全ページに出る入れ物。中身を持たない |
| `sections/` | トップの1ブロック = 1ファイル |
| `works/` | Worksだけで完結。一覧・詳細・スライダーで共有 |
| `ui/` | どこでも使う無名の部品。ドメインを知らない |

`page.tsx` はセクションを並べるだけ。見た目は書かない。

共有CSSに置くのは「2箇所以上で使うもの」だけ。
1箇所しか使わない見た目はコンポーネント側で完結させる。

## Tailwind v4 の注意

- **設定ファイルは読まれない。** `@theme` は `src/styles/theme.css` に1つだけ
- **リセットは必ず `@layer base` の中。** 裸で書くとユーティリティに勝ってしまい、
  `px-6` などが全部効かなくなる
- **`@layer components` は使わない**（効かない）。共通クラスは `@utility`
- `@import "tailwindcss"` は必ず一番上
