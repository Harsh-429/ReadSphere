import { useRef } from 'react'
import ContentCard from './ContentCard'
import { type Content } from '../data/mockData'

interface ContentRowProps {
  title: string
  subtitle?: string
  items: Content[]
  onPlay: (item: Content) => void
  cardSize?: 'sm' | 'md' | 'lg'
  accentColor?: string
}

export default function ContentRow({ title, subtitle, items, onPlay, cardSize = 'md', accentColor }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = dir === 'left' ? -320 : 320
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const cardWidths = { sm: 148, md: 180, lg: 220 }
  const w = cardWidths[cardSize]

  return (
    <section style={{ marginBottom: '40px' }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '18px', padding: '0 24px' }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700,
            margin: 0, letterSpacing: '-0.3px', color: 'var(--text)',
          }}>
            {accentColor && (
              <span style={{ display: 'inline-block', width: '4px', height: '18px', background: accentColor, borderRadius: '2px', marginRight: '10px', verticalAlign: 'middle' }} />
            )}
            {title}
          </h2>
          {subtitle && (
            <p style={{ margin: '3px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>{subtitle}</p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => scroll('left')}
            style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              color: 'var(--text)', cursor: 'pointer', fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.background = 'var(--bg-hover)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-elevated)' }}
          >
            ‹
          </button>
          <button
            onClick={() => scroll('right')}
            style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              color: 'var(--text)', cursor: 'pointer', fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.background = 'var(--bg-hover)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-elevated)' }}
          >
            ›
          </button>
          <button style={{
            padding: '6px 14px', borderRadius: '8px',
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--text-muted)', fontSize: '12px', cursor: 'pointer',
            fontFamily: 'var(--font-body)', transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            See all →
          </button>
        </div>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex', gap: '14px',
          overflowX: 'auto', paddingLeft: '24px', paddingRight: '24px',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
          paddingBottom: '4px',
        }}
      >
        {items.map(item => (
          <div key={item.id} style={{ width: w, flexShrink: 0 }}>
            <ContentCard item={item} onPlay={onPlay} size={cardSize} />
          </div>
        ))}
      </div>
    </section>
  )
}
