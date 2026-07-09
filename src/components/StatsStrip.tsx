interface Stat {
  value: string
  label: string
  icon: string
  color: string
}

const stats: Stat[] = [
  { value: '50,000+', label: 'Books & Titles',  icon: '📚', color: 'var(--teal)'         },
  { value: '8,500+',  label: 'Audiobooks',       icon: '🎧', color: 'var(--violet-light)' },
  { value: '1,200+',  label: 'Drama Series',     icon: '🎭', color: 'var(--amber)'        },
  { value: '500+',    label: 'Reality Shows',    icon: '📺', color: '#FF6B35'             },
  { value: '100K+',   label: 'Songs on YouTube', icon: '🎵', color: '#A855F7'             },
  { value: '14M+',    label: 'Active Users',     icon: '👥', color: 'var(--green)'        },
]

export default function StatsStrip() {
  return (
    <div style={{
      margin: '32px 24px',
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '0 8px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      overflow: 'hidden',
    }}>
      {stats.map((stat, i) => (
        <div
          key={i}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '20px 12px',
            borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
            transition: 'background 0.18s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <span style={{ fontSize: '22px', marginBottom: '6px' }}>{stat.icon}</span>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800,
            color: stat.color, letterSpacing: '-0.5px',
          }}>
            {stat.value}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', textAlign: 'center' }}>
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}
