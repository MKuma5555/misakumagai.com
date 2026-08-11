インラインの SVG アイコンを React コンポーネントとして置く場所。

画像ファイル（public/）ではなくここに置く理由は、
ホバーで色を変えたり光らせたりするため。
img で読み込んだ SVG は中身を CSS から触れない。

lucide-react に無いブランドロゴ（React / Next.js / Supabase など）は
@tabler/icons-react にある。無いものだけここに自作する。
