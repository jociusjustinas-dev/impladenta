import type { WpMedia, WpPage, WpPost } from '../types/wp'

const WP_API_URL = import.meta.env.VITE_WP_API_URL

function getApiBase(): string | null {
  if (!WP_API_URL) return null
  return WP_API_URL.replace(/\/$/, '')
}

async function wpFetch<T>(path: string): Promise<T> {
  const base = getApiBase()
  if (!base) {
    throw new Error('VITE_WP_API_URL is not configured')
  }

  const response = await fetch(`${base}${path}`)
  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export function isWordPressConfigured(): boolean {
  return Boolean(getApiBase())
}

export async function fetchPages(): Promise<WpPage[]> {
  return wpFetch<WpPage[]>('/wp-json/wp/v2/pages?per_page=100&_embed')
}

export async function fetchPageBySlug(slug: string): Promise<WpPage | null> {
  const pages = await wpFetch<WpPage[]>(
    `/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_embed`,
  )
  return pages[0] ?? null
}

export async function fetchPosts(): Promise<WpPost[]> {
  return wpFetch<WpPost[]>('/wp-json/wp/v2/posts?per_page=10&_embed')
}

export async function fetchMedia(id: number): Promise<WpMedia | null> {
  try {
    return await wpFetch<WpMedia>(`/wp-json/wp/v2/media/${id}`)
  } catch {
    return null
  }
}
