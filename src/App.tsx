import { useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import AudioPlayer from './components/AudioPlayer'
import VideoModal from './components/VideoModal'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { getVideoLink } from './data/videoLinks'
import { type Content } from './data/mockData'

type AuthPage = 'login' | 'signup'

interface User {
  name: string
  email: string
}

export default function App() {
  // Auth state
  const [user, setUser] = useState<User | null>(null)
  const [authPage, setAuthPage] = useState<AuthPage>('login')

  // App state
  const [activeCategory, setActiveCategory] = useState('all')
  const [nowPlaying, setNowPlaying] = useState<Content | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Video modal state
  const [videoItem, setVideoItem] = useState<Content | null>(null)

  const handleLogin = (email: string, name: string) => {
    setUser({ email, name })
  }

  const handleLogout = () => {
    setUser(null)
    setNowPlaying(null)
    setIsPlaying(false)
    setVideoItem(null)
    setAuthPage('login')
  }

  const handlePlay = (item: Content) => {
    const videoLink = getVideoLink(item.id)
    if (videoLink) {
      // Has a YouTube link — open embedded video modal
      setVideoItem(item)
    } else {
      // No YouTube link — fall back to audio player
      if (nowPlaying?.id === item.id) {
        setIsPlaying(p => !p)
      } else {
        setNowPlaying(item)
        setIsPlaying(true)
      }
    }
  }

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id)
    setSearchQuery('')
  }

  // Show auth pages if not logged in
  if (!user) {
    if (authPage === 'signup') {
      return (
        <SignupPage
          onSignup={handleLogin}
          onGoLogin={() => setAuthPage('login')}
        />
      )
    }
    return (
      <LoginPage
        onLogin={handleLogin}
        onGoSignup={() => setAuthPage('signup')}
      />
    )
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearch={q => { setSearchQuery(q); if (q) setActiveCategory('all') }}
        user={user}
        onLogout={handleLogout}
      />

      <main style={{ flex: 1, paddingBottom: nowPlaying ? '96px' : '0' }}>
        <HomePage
          activeCategory={activeCategory}
          onPlay={handlePlay}
          searchQuery={searchQuery}
        />
      </main>

      {/* Audio player — shown when playing content without a video link */}
      {nowPlaying && !videoItem && (
        <AudioPlayer
          track={nowPlaying}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(p => !p)}
          onClose={() => { setNowPlaying(null); setIsPlaying(false) }}
        />
      )}

      {/* YouTube video modal — shown when content has a registered video link */}
      {videoItem && (
        <VideoModal
          item={videoItem}
          onClose={() => setVideoItem(null)}
        />
      )}
    </div>
  )
}
