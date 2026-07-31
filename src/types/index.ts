export interface LocalizedText {
  en: string
  ja: string
}

export interface Project {
  id: string
  slug: string
  title: LocalizedText
  description: LocalizedText
  overview: LocalizedText
  problem: LocalizedText
  solution: LocalizedText
  my_role: LocalizedText
  lessons: LocalizedText
  tech_stack: string[]
  category: 'React' | 'Frontend' | 'WordPress' | 'UI' | 'Dental' | 'Personal'
  thumbnail_url: string | null
  gallery_urls: string[]
  github_url: string | null
  live_url: string | null
  featured: boolean
  published: boolean
  order_index: number
  view_count: number
  like_count: number
  created_at: string
  updated_at: string
}

export interface Experience {
  id: string
  company: LocalizedText
  role: LocalizedText
  description: LocalizedText
  start_date: string
  end_date: string | null
  type: 'work' | 'education' | 'freelance'
  icon_url: string | null
  order_index: number
}

export interface Skill {
  id: string
  name: string
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design' | 'Other'
  icon_url: string | null
  level: number
  order_index: number
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  created_at: string
}

export type Locale = 'en' | 'ja'
