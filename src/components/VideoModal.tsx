import { useEffect, useState } from 'react'
import { getVideoLink, videoTypeBadge } from '../data/videoLinks'
import { typeConfig, type Content } from '../data/mockData'

interface VideoModalProps {
  item: Content
  onClose: () => void
}

export default function VideoModal({ item, onClose }: VideoModalProps) {
  const link = getVideoLink(item.id)
  const [loaded, setLoaded] = useState(false)
  const cfg = typeConfig[item.type]

  // For songs and youtube-mode content: open YouTube directly, then close modal
  useEffect(() => {
    if (link?.playMode === 'youtube' && link.youtubeUrl) {
      window.open(link.youtubeUrl, '_blank', 'noopener,noreferrer')
      onClose()
    }
  }, [link, onClose])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const badge = link ? videoTypeBadge[link.type] : null

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(4,4,12,0.94)', backdropFilter: 'blur(12px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }`}</style>

      {/* Modal container */}
      <div style={{
        width: '100%', maxWidth: '960px',
        background: 'var(--bg-card)', borderRadius: '20px',
        border: '1px solid var(--border-bright)',
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
        animation: 'slideUp 0.25s ease',
      }}>
        <style>{`@keyframes slideUp { from { transform:translateY(16px); opacity:0 } to { transform:none; opacity:1 } }`}</style>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          padding: '18px 20px', borderBottom: '1px solid var(--border)',
        }}>
          {/* Cover thumb */}
          <div style={{
            width: 48, height: 48, borderRadius: '10px', flexShrink: 0, overflow: 'hidden',
            background: item.coverGradient
              ? `linear-gradient(135deg, ${item.coverGradient[0]}, ${item.coverGradient[1]})`
              : 'var(--bg-elevated)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', border: `1px solid ${cfg.color}44`,
          }}>
            {item.imageId
              ? <img src={`https://images.unsplash.com/photo-${item.imageId}?w=96&h=96&fit=crop&auto=format`} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : cfg.icon}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{
                padding: '2px 8px', borderRadius: '6px',
                background: cfg.glow, border: `1px solid ${cfg.color}55`,
                color: cfg.color, fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px',
              }}>
                {cfg.icon} {cfg.label}
              </span>
              {badge && (
                <span style={{
                  padding: '2px 8px', borderRadius: '6px',
                  background: badge.bg, color: badge.color,
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px',
                }}>
                  ▶ YouTube · {badge.label}
                </span>
              )}
              {link?.durationLabel && (
                <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  {link.durationLabel}
                </span>
              )}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.title}
            </h3>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '1px' }}>
              {item.author} · <span style={{ color: 'var(--text-dim)' }}>{item.language}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            {link && (
              <a
                href={`https://www.youtube.com/watch?v=${link.videoId}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '7px 14px', borderRadius: '8px',
                  background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)',
                  color: '#ff4444', fontSize: '12px', fontWeight: 600,
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px',
                }}
              >
                ↗ Open YouTube
              </a>
            )}
            <button
              onClick={onClose}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)',
                color: 'var(--text-muted)', cursor: 'pointer', fontSize: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video player */}
        {link ? (
          <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
            {!loaded && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'var(--bg-elevated)', gap: '12px',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  border: '3px solid var(--violet)', borderTopColor: 'transparent',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading player…</span>
              </div>
            )}
            <iframe
              src={`https://www.youtube.com/embed/${link.videoId}?autoplay=1&rel=0&modestbranding=1&color=white`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setLoaded(true)}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                border: 'none',
                opacity: loaded ? 1 : 0, transition: 'opacity 0.3s',
              }}
            />
          </div>
        ) : (
          // No YouTube link — show info panel instead
          <div style={{
            padding: '48px', textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
          }}>
            <div style={{ fontSize: '48px' }}>{cfg.icon}</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, margin: 0 }}>
              {item.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '400px', lineHeight: 1.6, margin: 0 }}>
              {item.description}
            </p>
            <div style={{
              padding: '12px 20px', borderRadius: '10px',
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px',
            }}>
              No free YouTube link available for this title yet.
              <br />Add a video ID in <code style={{ color: 'var(--violet-light)', fontFamily: 'var(--font-mono)' }}>src/data/videoLinks.ts</code>.
            </div>
          </div>
        )}

        {/* Footer meta */}
        <div style={{
          padding: '14px 20px', borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
        }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <MetaChip icon="⭐" value={item.rating.toFixed(1)} label="Rating" />
            <MetaChip icon="👥" value={item.listeners ?? `${item.reviews.toLocaleString()}`} label="Listeners" />
            {item.language && <MetaChip icon="🌐" value={item.language} label="Language" />}
            {item.category && <MetaChip icon="📂" value={item.category} label="Category" />}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <ActionBtn>+ Library</ActionBtn>
            <ActionBtn>🔖 Bookmark</ActionBtn>
            <ActionBtn>❤️ Like</ActionBtn>
          </div>
        </div>
      </div>

      {/* Keyboard hint */}
      <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-dim)' }}>
        Press <kbd style={{ padding: '2px 6px', background: 'var(--bg-elevated)', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)' }}>Esc</kbd> to close
      </div>
    </div>
  )
}

function MetaChip({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <span style={{ fontSize: '13px' }}>{icon}</span>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{value}</span>
      <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{label}</span>
    </div>
  )
}

function ActionBtn({ children }: { children: React.ReactNode }) {
  return (
    <button style={{
      padding: '6px 14px', borderRadius: '8px',
      background: 'var(--bg-elevated)', border: '1px solid var(--border)',
      color: 'var(--text-muted)', fontSize: '12px', fontWeight: 500,
      cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.color = 'var(--text)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
    >
      {children}
    </button>
  )
}
