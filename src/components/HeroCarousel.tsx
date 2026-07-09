import { useState, useEffect, useCallback } from 'react'
import { heroItems, typeConfig, type Content } from '../data/mockData'

interface HeroCarouselProps {
  onPlay: (item: Content) => void
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= Math.floor(rating) ? 'var(--amber)' : 'rgba(255,255,255,0.2)'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '2px', fontFamily: 'var(--font-mono)' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

export default function HeroCarousel({ onPlay }: HeroCarouselProps) {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setActive(index)
      setAnimating(false)
    }, 300)
  }, [animating])

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((active + 1) % heroItems.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [active, goTo])

  const item = heroItems[active]
  const cfg = typeConfig[item.type]

  return (
    <div style={{ position: 'relative', width: '100%', height: '520px', overflow: 'hidden', borderRadius: '0 0 24px 24px' }}>
      {/* Background image */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: item.imageId
            ? `url(https://images.unsplash.com/photo-${item.imageId}?w=1600&h=600&fit=crop&auto=format&q=80)`
            : `linear-gradient(135deg, ${item.coverGradient?.[0] ?? '#7C3AED'}, ${item.coverGradient?.[1] ?? '#4C1D95'})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transition: 'opacity 0.5s',
          opacity: animating ? 0 : 1,
        }}
      />

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,7,15,0.95) 40%, rgba(7,7,15,0.3) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,7,15,1) 0%, transparent 50%)' }} />

      {/* Content */}
      <div style={{
        position: 'relative', height: '100%',
        maxWidth: '1400px', margin: '0 auto', padding: '0 40px',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '52px',
        opacity: animating ? 0 : 1, transition: 'opacity 0.3s',
      }}>
        {/* Type badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '5px 12px', borderRadius: '99px',
            background: cfg.glow, border: `1px solid ${cfg.color}`,
            color: cfg.color, fontSize: '12px', fontWeight: 600,
            letterSpacing: '0.5px', textTransform: 'uppercase',
          }}>
            {cfg.icon} {cfg.label}
          </span>
          {item.isTrending && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: '99px',
              background: 'rgba(245,158,11,0.15)', border: '1px solid var(--amber)',
              color: 'var(--amber)', fontSize: '12px', fontWeight: 600,
            }}>
              🔥 Trending
            </span>
          )}
          {item.isNew && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: '99px',
              background: 'rgba(16,185,129,0.15)', border: '1px solid var(--green)',
              color: 'var(--green)', fontSize: '12px', fontWeight: 600,
            }}>
              ✦ New
            </span>
          )}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 800, margin: '0 0 12px', letterSpacing: '-1px',
          lineHeight: 1.08, maxWidth: '600px',
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          {item.title}
        </h1>

        {/* Author + stats row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>by <strong style={{ color: 'var(--text)' }}>{item.author}</strong></span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-dim)' }} />
          <StarRating rating={item.rating} />
          <span style={{ color: 'var(--text-dim)', fontSize: '13px' }}>({item.reviews.toLocaleString()} reviews)</span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-dim)' }} />
          {item.listeners && <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>👥 {item.listeners} listeners</span>}
          {item.episodes && <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>📺 {item.episodes} episodes</span>}
          {item.duration && !item.episodes && <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>⏱ {item.duration}</span>}
          <span style={{ color: 'var(--text-dim)', fontSize: '13px' }}>• {item.language}</span>
        </div>

        {/* Description */}
        <p style={{
          color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6,
          maxWidth: '480px', margin: '0 0 24px',
        }}>
          {item.description}
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onPlay(item)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '13px 28px', borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--violet), var(--violet-mid))',
              border: 'none', color: '#fff', fontSize: '15px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              boxShadow: '0 4px 20px var(--violet-glow-strong)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px var(--violet-glow-strong)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px var(--violet-glow-strong)' }}
          >
            ▶ {item.type === 'book' ? 'Read Now' : 'Play Now'}
          </button>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '13px 24px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-bright)',
              color: 'var(--text)', fontSize: '15px', fontWeight: 500,
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.13)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >
            + Add to Library
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      <div style={{
        position: 'absolute', bottom: '24px', right: '40px',
        display: 'flex', gap: '8px', alignItems: 'center',
      }}>
        {heroItems.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === active ? '28px' : '8px', height: '8px',
              borderRadius: '99px',
              background: i === active ? 'var(--violet)' : 'rgba(255,255,255,0.25)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
