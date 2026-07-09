export interface ContentCatalog {
  heroItems: any[]
  audiobooks: any[]
  dramas: any[]
  stories: any[]
  books: any[]
  podcasts: any[]
  realityShows: any[]
  songs: any[]
  trending: any[]
  continueListening: any[]
}

export async function fetchCatalog(): Promise<ContentCatalog> {
  const response = await fetch('/api/content/catalog')
  if (!response.ok) {
    throw new Error('Failed to load catalog from backend')
  }
  return response.json()
}
