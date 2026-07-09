import { useEffect, useMemo, useState } from 'react'
import HeroCarousel from './HeroCarousel'
import ContentRow from './ContentRow'
import StatsStrip from './StatsStrip'
import ContinueListening from './ContinueListening'
import ContentCard from './ContentCard'
import { fetchCatalog, type ContentCatalog } from '../services/contentApi'
import {
  audiobooks as mockAudiobooks,
  dramas as mockDramas,
  stories as mockStories,
  books as mockBooks,
  podcasts as mockPodcasts,
  trending as mockTrending,
  continueListening as mockContinueListening,
  realityShows as mockRealityShows,
  songs as mockSongs,
  type Content, type ContentType,
} from '../data/mockData'

interface HomePageProps {
  activeCategory: string
  onPlay: (item: Content) => void
  searchQuery: string
}

function SearchResults({ query, onPlay, items }: { query: string; onPlay: (item: Content) => void; items: Content[] }) {
  const q = query.toLowerCase()
  const results = items.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.author.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    item.tags.some(t => t.toLowerCase().includes(q)) ||
    (item.genre ?? '').toLowerCase().includes(q) ||
    (item.album ?? '').toLowerCase().includes(q)
  )

  return (
    <div style={{ padding: '32px 24px' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, margin: '0 0 6px' }}>
        Search results for "{query}"
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 24px' }}>
        {results.length} titles found
      </p>
      {results.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <div style={{ fontSize: '18px', fontFamily: 'var(--font-display)', fontWeight: 600 }}>No results found</div>
          <div style={{ fontSize: '14px', marginTop: '6px' }}>Try searching for a title, artist, or genre</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
          {results.map(item => (
            <ContentCard key={item.id} item={item} onPlay={onPlay} size="md" />
          ))}
        </div>
      )}
    </div>
  )
}

function FilteredView({ type, onPlay, items }: { type: ContentType; onPlay: (item: Content) => void; items: Content[] }) {
  const labels: Record<ContentType, string> = {
    audiobook: 'Audiobooks',
    drama: 'Drama Series',
    story: 'Short Stories',
    book: 'Ebooks',
    podcast: 'Podcasts',
    reality: 'Reality Shows',
    song: 'Songs',
  }
  const descriptions: Partial<Record<ContentType, string>> = {
    reality: 'Free episodes from YouTube — India\'s Got Latent, Shark Tank India, TVF & more',
    song: 'Click any song to open its official music video on YouTube',
  }
  return (
    <div style={{ padding: '32px 24px' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.5px' }}>
        {labels[type]}
      </h2>
      {descriptions[type] && (
        <p style={{ margin: '0 0 24px', fontSize: '14px', color: 'var(--text-muted)' }}>{descriptions[type]}</p>
      )}
      {!descriptions[type] && <div style={{ marginBottom: '24px' }} />}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
        {items.map(item => (
          <ContentCard key={item.id} item={item} onPlay={onPlay} size="lg" />
        ))}
      </div>
    </div>
  )
}

/* Themed section wrapper used for Drama, Reality, Songs */
function ThemedSection({
  emoji, eyebrow, title, description, items, onPlay,
  cardWidth, accentColor, accentGlow, accentBorder, btnColor, btnBg, btnBorder,
}: {
  emoji: string; eyebrow: string; title: string; description: string
  items: Content[]; onPlay: (item: Content) => void; cardWidth: number
  accentColor: string; accentGlow: string; accentBorder: string
  btnColor: string; btnBg: string; btnBorder: string
}) {
  return (
    <div style={{
      margin: '0 24px 40px',
      background: accentGlow,
      border: `1px solid ${accentBorder}`,
      borderRadius: '20px', padding: '28px 0 14px', overflow: 'hidden',
    }}>
      <div style={{ padding: '0 24px 16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '22px' }}>{emoji}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: accentColor, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>
              {eyebrow}
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '-0.3px' }}>
            {title}
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>{description}</p>
        </div>
        <button style={{ padding: '8px 16px', borderRadius: '10px', background: btnBg, border: `1px solid ${btnBorder}`, color: btnColor, fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
          See All →
        </button>
      </div>
      <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingLeft: '24px', paddingRight: '24px', scrollbarWidth: 'none' }}>
        {items.map(item => (
          <div key={item.id} style={{ width: cardWidth, flexShrink: 0 }}>
            <ContentCard item={item} onPlay={onPlay} size="lg" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* Horizontal song strip — wider cards, album-art style */
function SongsSection({ items, onPlay }: { items: Content[]; onPlay: (item: Content) => void }) {
  return (
    <div style={{ margin: '0 24px 40px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '22px' }}>🎵</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#A855F7', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>
              Free on YouTube · Click to Play
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '-0.3px' }}>
            Songs
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
            Bollywood hits, indie gems & international bangers — opens official YouTube video instantly
          </p>
        </div>
        <button style={{ padding: '8px 16px', borderRadius: '10px', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)', color: '#A855F7', fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
          All Songs →
        </button>
      </div>

      {/* Song grid — 2-row layout on wide screens */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '10px',
      }}>
        {items.map(item => (
          <SongRow key={item.id} item={item} onPlay={onPlay} />
        ))}
      </div>
    </div>
  )
}

function SongRow({ item, onPlay }: { item: Content; onPlay: (item: Content) => void }) {
  const [hovered, setHovered] = useState(false)
  const [c1, c2] = item.coverGradient ?? ['#7C3AED', '#4C1D95']

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(item)}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
        background: hovered ? 'var(--bg-elevated)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-bright)' : 'var(--border)'}`,
        borderRadius: '12px', padding: '10px', cursor: 'pointer', textAlign: 'left',
        transition: 'all 0.18s', color: 'var(--text)',
      }}
    >
      {/* Album art */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: 52, height: 52, borderRadius: '8px', overflow: 'hidden',
          background: item.imageId ? 'var(--bg-elevated)' : `linear-gradient(135deg, ${c1}, ${c2})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
        }}>
          {item.imageId
            ? <img src={`https://images.unsplash.com/photo-${item.imageId}?w=104&h=104&fit=crop&auto=format`} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : '🎵'}
        </div>
        {/* Play overlay on hover */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '8px',
            background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
              ▶
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.author}</div>
        {item.album && (
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.album}</div>
        )}
      </div>

      {/* Meta */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
        <div style={{
          padding: '2px 6px', borderRadius: '5px',
          background: 'rgba(255,0,0,0.12)', border: '1px solid rgba(255,0,0,0.25)',
          color: '#ff4444', fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px',
        }}>
          ▶ YT
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{item.duration}</span>
      </div>
    </button>
  )
}

export default function HomePage({ activeCategory, onPlay, searchQuery }: HomePageProps) {
  const [catalog, setCatalog] = useState<ContentCatalog | null>(null)

  useEffect(() => {
    fetchCatalog().then(setCatalog).catch(() => setCatalog(null))
  }, [])

  const data = useMemo(() => ({
    heroItems: catalog?.heroItems ?? [] as Content[],
    audiobooks: catalog?.audiobooks ?? mockAudiobooks,
    dramas: catalog?.dramas ?? mockDramas,
    stories: catalog?.stories ?? mockStories,
    books: catalog?.books ?? mockBooks,
    podcasts: catalog?.podcasts ?? mockPodcasts,
    realityShows: catalog?.realityShows ?? mockRealityShows,
    songs: catalog?.songs ?? mockSongs,
    trending: catalog?.trending ?? mockTrending,
    continueListening: catalog?.continueListening ?? mockContinueListening,
  }), [catalog])

  const allContent = useMemo(() => [
    ...data.audiobooks,
    ...data.dramas,
    ...data.stories,
    ...data.books,
    ...data.podcasts,
    ...data.realityShows,
    ...data.songs,
  ], [data])

  if (searchQuery.trim()) {
    return <SearchResults query={searchQuery.trim()} onPlay={onPlay} items={allContent} />
  }

  if (activeCategory !== 'all') {
    const type = activeCategory as ContentType
    const items = {
      audiobook: data.audiobooks,
      drama: data.dramas,
      story: data.stories,
      book: data.books,
      podcast: data.podcasts,
      reality: data.realityShows,
      song: data.songs,
    }[type] ?? []
    return <FilteredView type={type} onPlay={onPlay} items={items} />
  }

  return (
    <div>
      <HeroCarousel items={data.heroItems} onPlay={onPlay} />
      <StatsStrip />
      <ContinueListening items={data.continueListening} onPlay={onPlay} />

      <ContentRow
        title="🔥 Trending Now"
        subtitle="Most popular across all categories this week"
        items={[...data.trending, ...data.realityShows.filter((r: Content) => r.isTrending)]}
        onPlay={onPlay}
        cardSize="md"
        accentColor="var(--amber)"
      />

      <ThemedSection
        emoji="📺"
        eyebrow="100% Free · No Subscription"
        title="Reality Shows"
        description="India's Got Latent, Shark Tank India, Kota Factory & more — full episodes free on YouTube"
        items={data.realityShows}
        onPlay={onPlay}
        cardWidth={210}
        accentColor="#FF6B35"
        accentGlow="linear-gradient(135deg, rgba(255,107,53,0.06), rgba(255,107,53,0.02))"
        accentBorder="rgba(255,107,53,0.14)"
        btnColor="#FF6B35"
        btnBg="rgba(255,107,53,0.1)"
        btnBorder="rgba(255,107,53,0.3)"
      />

      <SongsSection items={data.songs} onPlay={onPlay} />

      <ThemedSection
        emoji="🎭"
        eyebrow="Featured on ReadSphere"
        title="Drama Series"
        description="Binge-worthy audio dramas — romance, crime, thriller & more"
        items={data.dramas}
        onPlay={onPlay}
        cardWidth={200}
        accentColor="var(--amber)"
        accentGlow="linear-gradient(135deg, rgba(245,158,11,0.06), rgba(245,158,11,0.02))"
        accentBorder="rgba(245,158,11,0.12)"
        btnColor="var(--amber)"
        btnBg="rgba(245,158,11,0.1)"
        btnBorder="rgba(245,158,11,0.3)"
      />

      <ThemedSection
        emoji="✨"
        eyebrow="Quick Reads & Listens"
        title="Short Stories"
        description="5–15 min stories in Hindi & English — perfect for your commute"
        items={data.stories}
        onPlay={onPlay}
        cardWidth={172}
        accentColor="var(--pink)"
        accentGlow="linear-gradient(135deg, rgba(236,72,153,0.06), rgba(236,72,153,0.02))"
        accentBorder="rgba(236,72,153,0.12)"
        btnColor="var(--pink)"
        btnBg="rgba(236,72,153,0.1)"
        btnBorder="rgba(236,72,153,0.3)"
      />

      <ContentRow
        title="🎧 Audiobooks"
        subtitle="Listen to bestsellers narrated by world-class voices"
        items={data.audiobooks}
        onPlay={onPlay}
        cardSize="lg"
        accentColor="var(--violet-light)"
      />

      <ContentRow
        title="📖 Ebooks"
        subtitle="Thousands of books — read online, anytime"
        items={data.books}
        onPlay={onPlay}
        cardSize="lg"
        accentColor="var(--teal)"
      />

      <ContentRow
        title="🎙 Podcasts"
        subtitle="Insightful conversations and stories"
        items={data.podcasts}
        onPlay={onPlay}
        cardSize="md"
        accentColor="var(--green)"
      />

      <div style={{ margin: '0 24px 48px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.1))',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: '20px', padding: '28px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--violet-light)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
              Your Reading Streak
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
              🔥 7 Day Streak!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '6px 0 0' }}>
              You've read 3h 42m this week. Keep it up to earn the <strong style={{ color: 'var(--amber)' }}>Scholar Badge</strong>.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {['📚 Reader', '🎯 Explorer', '⭐ Top Fan'].map((badge, i) => (
              <div key={i} style={{ padding: '8px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-bright)', fontSize: '13px', fontWeight: 600 }}>
                {badge}
              </div>
            ))}
            <button style={{
              padding: '10px 22px', borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--violet), var(--pink))',
              border: 'none', color: '#fff', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              boxShadow: '0 4px 16px var(--violet-glow-strong)',
            }}>
              View Achievements
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
