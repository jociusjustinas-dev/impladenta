export interface WpRenderedContent {
  rendered: string
}

export interface WpPage {
  id: number
  slug: string
  title: WpRenderedContent
  content: WpRenderedContent
  excerpt: WpRenderedContent
  date: string
  modified: string
  featured_media: number
  link: string
}

export interface WpPost extends WpPage {
  categories: number[]
  tags: number[]
}

export interface WpMedia {
  id: number
  source_url: string
  alt_text: string
  media_details: {
    width: number
    height: number
  }
}
