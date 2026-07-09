import http from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const contentData = {
  heroItems: [
    {
      id: 'hero-1',
      title: 'Kaali Raat',
      author: 'Suresh Sharma',
      type: 'drama',
      imageId: '1536440136628-849c177e76a1',
      language: 'Hindi',
      rating: 4.8,
      reviews: 21400,
      description: 'A chilling crime thriller set in the dark alleys of Mumbai.',
      category: 'Crime Thriller',
      tags: ['Crime', 'Thriller', 'Mystery', 'Suspense'],
      isTrending: true,
      episodes: 12,
      listeners: '2.1M',
      season: 2,
    },
    {
      id: 'hero-2',
      title: 'Atomic Habits',
      author: 'James Clear',
      type: 'audiobook',
      imageId: '1507003211169-0a1dd7228f2d',
      duration: '5h 35m',
      language: 'English',
      rating: 4.9,
      reviews: 84200,
      description: 'Tiny changes, remarkable results.',
      category: 'Self-Help',
      tags: ['Habits', 'Productivity', 'Psychology'],
      isPopular: true,
      listeners: '5.4M',
      narrator: 'James Clear',
    },
  ],
  audiobooks: [
    {
      id: 'ab-1',
      title: 'Atomic Habits',
      author: 'James Clear',
      type: 'audiobook',
      imageId: '1544947950-fa07a98d237f',
      coverGradient: ['#7C3AED', '#4C1D95'],
      duration: '5h 35m',
      language: 'English',
      rating: 4.9,
      reviews: 84200,
      description: 'Build better habits with this transformative guide.',
      category: 'Self-Help',
      tags: ['Habits', 'Productivity'],
      isPopular: true,
      listeners: '5.4M',
      narrator: 'James Clear',
    },
    {
      id: 'ab-2',
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      type: 'audiobook',
      imageId: '1579621970563-ebec7560ff3e',
      coverGradient: ['#D97706', '#78350F'],
      duration: '6h 10m',
      language: 'English',
      rating: 4.7,
      reviews: 62100,
      description: 'What the rich teach their kids about money.',
      category: 'Finance',
      tags: ['Finance', 'Business', 'Money'],
      isPopular: true,
      listeners: '4.2M',
      narrator: 'Tim Wheeler',
    },
  ],
  dramas: [
    {
      id: 'dr-1',
      title: 'Kaali Raat',
      author: 'Suresh Sharma',
      type: 'drama',
      imageId: '1536440136628-849c177e76a1',
      language: 'Hindi',
      rating: 4.8,
      reviews: 21400,
      description: 'Crime thriller set in Mumbai\'s dark underbelly.',
      category: 'Crime',
      tags: ['Crime', 'Thriller', 'Mumbai'],
      isTrending: true,
      episodes: 12,
      listeners: '2.1M',
      season: 2,
    },
  ],
  stories: [],
  books: [],
  podcasts: [],
  realityShows: [],
  songs: [],
  trending: [],
  continueListening: [],
}

export async function startServer(port = 3001) {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

    if (req.method === 'GET' && url.pathname === '/api/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'ok', service: 'readsphere-backend' }))
      return
    }

    if (req.method === 'GET' && url.pathname === '/api/content/catalog') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(contentData))
      return
    }

    if (req.method === 'GET' && url.pathname.startsWith('/api/content/') && url.pathname !== '/api/content/catalog') {
      const id = url.pathname.split('/').pop()
      const allContent = Object.values(contentData).flat()
      const item = allContent.find(entry => entry.id === id)
      if (!item) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Not found' }))
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(item))
      return
    }

    if (req.method === 'GET' && url.pathname === '/api/content/search') {
      const query = (url.searchParams.get('q') || '').trim().toLowerCase()
      const allContent = Object.values(contentData).flat()
      const results = allContent.filter(item => {
        const haystack = [item.title, item.author, item.category, ...(item.tags || []), item.genre, item.album]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(query)
      })
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(results))
      return
    }

    if (req.method === 'GET') {
      try {
        const indexHtml = await readFile(path.join(__dirname, 'index.html'), 'utf8')
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(indexHtml)
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('Not found')
      }
      return
    }

    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
  })

  const host = process.env.HOST || '0.0.0.0'
  await new Promise(resolve => server.listen(port, host, resolve))
  return server
}

if (process.env.NODE_ENV !== 'test') {
  startServer(process.env.PORT ? Number(process.env.PORT) : 3001).then(() => {
    console.log('Backend running on port 3001')
  }).catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
