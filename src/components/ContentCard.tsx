import { useState } from 'react'
import { typeConfig, type Content } from '../data/mockData'

interface ContentCardProps {
  item: Content
  onPlay: (item: Content) => void
  size?: 'sm' | 'md' | 'lg'
  horizontal?: boolean
}

function CoverImage({ item, size }: { item: Content; size: 'sm' | 'md' | 'lg' }) {
  const heights = { sm: 160, md: 200, lg: 240 }
  const h = heights[size]

  if (item.imageId) {
    return (
      <div style={{
        height: h, borderRadius: '10px 10px 0 0', overflow: 'hidden',
        background: 'var(--bg-elevated)',
      }}>
        <img
          src={`https://images.unsplash.com/photo-${item.imageId}?w=400&h=${h * 2}&fit=crop&auto=format&q=80`}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      </div>
    )
  }

  const [c1, c2] = item.coverGradient ?? ['#7C3AED', '#4C1D95']
  const cfg = typeConfig[item.type]

  return (
    <div style={{
      height: h, borderRadius: '10px 10px 0 0', overflow: 'hidden',
      background: `linear-gradient(145deg, ${c1}, ${c2})`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '16px', position: 'relative',
    }}>
      {/* Decorative pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.1,
        backgroundImage: 'radial-gradient(circle at 30% 30%, white 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }} />
      <div style={{ fontSize: size === 'sm' ? '28px' : '36px', marginBottom: '8px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}>
        {cfg.icon}
      </div>
      <div style={{
        textAlign: 'center', position: 'relative',
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: size === 'sm' ? '12px' : '14px',
        color: 'rgba(255,255,255,0.9)', lineHeight: 1.3, maxWidth: '90%',
        textShadow: '0 1px 4px rgba(0,0,0,0.5)',
      }}>
        {item.title}
      </div>
      {item.year && (
        <div style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>
          {item.year}
        </div>
      )}
    </div>
  )
}

export default function ContentCard({ item, onPlay, size = 'md' }: ContentCardProps) {
  const [hovered, setHovered] = useState(false)
  const cfg = typeConfig[item.type]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)', borderRadius: '12px',
        border: `1px solid ${hovered ? 'var(--border-bright)' : 'var(--border)'}`,
        overflow: 'hidden', cursor: 'pointer',
        transition: 'all 0.22s', flexShrink: 0,
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      {/* Cover */}
      <div style={{ position: 'relative' }}>
        <CoverImage item={item} size={size} />

        {/* Hover overlay with play button */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '10px 10px 0 0',
          background: 'rgba(7,7,15,0.75)', backdropFilter: 'blur(2px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.2s',
        }}>
          <button
            onClick={e => { e.stopPropagation(); onPlay(item) }}
            style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--violet), var(--violet-mid))',
              border: 'none', color: '#fff', fontSize: '20px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px var(--violet-glow-strong)',
              transform: hovered ? 'scale(1)' : 'scale(0.7)',
              transition: 'transform 0.2s',
            }}
          >
            ▶
          </button>
        </div>

        {/* Type badge */}
        <div style={{
          position: 'absolute', top: '8px', left: '8px',
          padding: '3px 8px', borderRadius: '6px',
          background: 'rgba(7,7,15,0.8)', backdropFilter: 'blur(8px)',
          border: `1px solid ${cfg.color}33`,
          color: cfg.color, fontSize: '10px', fontWeight: 600,
          letterSpacing: '0.3px',
        }}>
          {cfg.icon} {cfg.label}
        </div>

        {/* New / Trending badge */}
        {(item.isNew || item.isTrending) && (
          <div style={{
            position: 'absolute', top: '8px', right: '8px',
            padding: '3px 8px', borderRadius: '6px',
            background: item.isTrending ? 'rgba(245,158,11,0.85)' : 'rgba(16,185,129,0.85)',
            color: '#000', fontSize: '10px', fontWeight: 700,
          }}>
            {item.isTrending ? '🔥 Hot' : '✦ New'}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '12px 14px 14px' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700,
          margin: '0 0 3px', color: 'var(--text)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {item.title}
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.author}
        </p>

        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: 'var(--amber)', fontSize: '11px' }}>★</span>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{item.rating.toFixed(1)}</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            {item.duration ?? (item.pages ? `${item.pages} pp` : item.episodes ? `${item.episodes} ep` : '')}
          </span>
        </div>

        {/* Listeners */}
        {item.listeners && (
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
            👥 {item.listeners}
          </div>
        )}
      </div>
    </div>
  )
}
