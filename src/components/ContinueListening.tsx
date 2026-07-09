import { typeConfig, type Content } from '../data/mockData'

interface ContinueListeningProps {
  items: Content[]
  onPlay: (item: Content) => void
}

const progressMap: Record<string, number> = {
  'ab-1': 65,
  'dr-1': 38,
  'st-2': 82,
}

export default function ContinueListening({ items, onPlay }: ContinueListeningProps) {
  return (
    <section style={{ margin: '0 24px 40px' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700,
        margin: '0 0 16px', letterSpacing: '-0.3px', color: 'var(--text)',
      }}>
        <span style={{ display: 'inline-block', width: '4px', height: '18px', background: 'var(--green)', borderRadius: '2px', marginRight: '10px', verticalAlign: 'middle' }} />
        Continue Where You Left Off
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
        {items.map(item => {
          const progress = progressMap[item.id] ?? 45
          const cfg = typeConfig[item.type]
          return (
            <button
              key={item.id}
              onClick={() => onPlay(item)}
              style={{
                display: 'flex', gap: '14px', alignItems: 'center',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: '14px', padding: '14px', cursor: 'pointer',
                textAlign: 'left', transition: 'all 0.2s', color: 'var(--text)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.background = 'var(--bg-elevated)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)' }}
            >
              {/* Thumbnail */}
              <div style={{
                width: 52, height: 52, borderRadius: '10px', flexShrink: 0, overflow: 'hidden',
                background: item.coverGradient
                  ? `linear-gradient(135deg, ${item.coverGradient[0]}, ${item.coverGradient[1]})`
                  : 'var(--bg-elevated)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', border: `1px solid ${cfg.color}33`,
              }}>
                {item.imageId ? (
                  <img src={`https://images.unsplash.com/photo-${item.imageId}?w=104&h=104&fit=crop&auto=format`} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : cfg.icon}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{item.author}</div>
                {/* Progress bar */}
                <div style={{ marginTop: '8px' }}>
                  <div style={{ height: '4px', background: 'var(--bg-hover)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(to right, ${cfg.color}, ${cfg.color}99)`, borderRadius: '99px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{progress}% complete</span>
                    <span style={{ fontSize: '10px', color: cfg.color, fontFamily: 'var(--font-mono)' }}>Resume ▶</span>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
