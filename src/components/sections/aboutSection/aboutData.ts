// aboutData.ts

export type AboutTab = {
  id: 'about' | 'journey' | 'likes'
  number: string
  label: string
  /* 背景。手持ちの3色を淡くしたもの。新しい色は持ち込んでいない。
     01 #dfe8cc オリーブ由来 / 02 #f7e6c6 差し色由来 / 03 #f2d8cb テラコッタ
     文字 #3f3b30 はどれも 8.2 以上、補助文字 #635c4c も 4.88 以上で通る。 */
  bgColor: string
  image: string
  title: string
  description: string
}

export const aboutData: AboutTab[] = [
  {
    id: 'about',
    number: '01',
    label: 'About me',
    bgColor: '#dfe8cc',
    image: '/images/about/about-me.jpg',
    title: 'Hi, I’m Misa.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo, lorem at cursus volutpat, libero massa ultrices risus, vitae facilisis purus erat vitae augue.',
  },

  {
    id: 'journey',
    number: '02',
    label: 'Journey',
    bgColor: '#f7e6c6',
    image: '/images/about/journey.jpg',
    title: 'My Journey',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique nibh at lectus elementum, vitae pretium erat suscipit.',
  },

  {
    id: 'likes',
    number: '03',
    label: 'Likes',
    bgColor: '#f2d8cb',
    image: '/images/about/likes.jpg',
    title: 'Things I Like',
    description:
      'Coffee, travelling, photography, coding, and creating beautiful user experiences. Lorem ipsum dolor sit amet.',
  },
]