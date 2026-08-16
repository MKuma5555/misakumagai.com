// aboutData.ts

export type AboutTab = {
  id: 'about' | 'journey' | 'likes'
  number: string
  label: string
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
    bgColor: 'bg-leaf',
    image: '/images/about/about-me.jpg',
    title: 'Hi, I’m Misa.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo, lorem at cursus volutpat, libero massa ultrices risus, vitae facilisis purus erat vitae augue.',
  },

  {
    id: 'journey',
    number: '02',
    label: 'Journey',
    bgColor: 'bg-amber',
    image: '/images/about/journey.jpg',
    title: 'My Journey',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique nibh at lectus elementum, vitae pretium erat suscipit.',
  },

  {
    id: 'likes',
    number: '03',
    label: 'Likes',
    bgColor: 'bg-yellow',
    image: '/images/about/likes.jpg',
    title: 'Things I Like',
    description:
      'Coffee, travelling, photography, coding, and creating beautiful user experiences. Lorem ipsum dolor sit amet.',
  },
]