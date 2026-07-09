import { useState } from 'react'
import { categories } from '../data/mockData'

interface NavbarProps {
  activeCategory: string
  onCategoryChange: (id: string) => void
  searchQuery: string
  onSearch: (q: string) => void
  user?: { name: string; email: string } | null
  onLogout?: () => void
}

export default function Navbar({ activeCategory, onCategoryChange, searchQuery, onSearch, user, onLogout }: NavbarProps) {
  const [searchFocused, setSearchFocused] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(7,7,15,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', height: '64px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, var(--violet), var(--pink))',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', boxShadow: '0 4px 16px var(--violet-glow-strong)',
            }}>
              📚
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}>
              Read<span style={{ color: 'var(--violet-light)' }}>Sphere</span>
            </span>
          </div>

          {/* Search bar */}
          <div style={{
            flex: 1, maxWidth: '480px', position: 'relative',
            boxShadow: searchFocused ? '0 0 0 2px var(--violet)' : '0 0 0 1px var(--border)',
            borderRadius: '12px', transition: 'box-shadow 0.2s',
          }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '15px', pointerEvents: 'none' }}>
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search books, audiobooks, dramas..."
              style={{
                width: '100%', padding: '10px 14px 10px 40px',
                background: 'var(--bg-card)', border: 'none', borderRadius: '12px',
                color: 'var(--text)', fontSize: '14px', outline: 'none',
                fontFamily: 'var(--font-body)',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => onSearch('')}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '16px', padding: '0' }}
              >✕</button>
            )}
          </div>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <NavIconBtn label="Notifications">
              <span style={{ position: 'relative', display: 'inline-block' }}>
                🔔
                <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '7px', height: '7px', background: 'var(--pink)', borderRadius: '50%', border: '1.5px solid var(--bg)' }} />
              </span>
            </NavIconBtn>
            <NavIconBtn label="Downloads">💾</NavIconBtn>
            <div style={{ width: 1, height: 28, background: 'var(--border)', margin: '0 4px' }} />
            {/* Profile dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  borderRadius: '24px', padding: '6px 14px 6px 6px',
                  cursor: 'pointer', color: 'var(--text)', transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-bright)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--violet), var(--pink))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 800, flexShrink: 0,
                }}>
                  {user ? user.name.charAt(0).toUpperCase() : 'R'}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 500, maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user ? user.name.split(' ')[0] : 'Reader'}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>▾</span>
              </button>

              {profileOpen && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setProfileOpen(false)} />
                  <div style={{
                    position: 'absolute', top: '48px', right: 0, zIndex: 50,
                    background: 'var(--bg-card)', border: '1px solid var(--border-bright)',
                    borderRadius: '16px', padding: '8px', minWidth: '220px',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                    animation: 'fadeIn 0.15s ease',
                  }}>
                    <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-4px) } to { opacity:1; transform:none } }`}</style>
                    {user && (
                      <div style={{ padding: '10px 14px 12px', borderBottom: '1px solid var(--border)', marginBottom: '6px' }}>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>{user.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
                        <div style={{ marginTop: '6px', display: 'inline-flex', padding: '2px 8px', borderRadius: '6px', background: 'var(--violet-glow)', border: '1px solid var(--violet)', color: 'var(--violet-light)', fontSize: '10px', fontWeight: 700 }}>
                          ✦ Free Plan
                        </div>
                      </div>
                    )}
                    {[
                      { icon: '📚', label: 'My Library' },
                      { icon: '🔖', label: 'Bookmarks' },
                      { icon: '📊', label: 'Reading Stats' },
                      { icon: '⚙️', label: 'Settings' },
                    ].map(item => (
                      <button key={item.label} onClick={() => setProfileOpen(false)} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                        padding: '9px 14px', background: 'transparent', border: 'none',
                        color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '10px',
                        fontSize: '13px', fontFamily: 'var(--font-body)', transition: 'all 0.15s', textAlign: 'left',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-elevated)'; e.currentTarget.style.color = 'var(--text)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' }}
                      >
                        <span>{item.icon}</span> {item.label}
                      </button>
                    ))}
                    <div style={{ height: '1px', background: 'var(--border)', margin: '6px 0' }} />
                    <button onClick={() => { setProfileOpen(false); onLogout?.() }} style={{
                      display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                      padding: '9px 14px', background: 'transparent', border: 'none',
                      color: '#F87171', cursor: 'pointer', borderRadius: '10px',
                      fontSize: '13px', fontFamily: 'var(--font-body)', transition: 'all 0.15s', textAlign: 'left',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span>🚪</span> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '4px', paddingBottom: '12px', overflowX: 'auto' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 16px', borderRadius: '99px',
                border: activeCategory === cat.id ? '1px solid var(--violet)' : '1px solid var(--border)',
                background: activeCategory === cat.id ? 'var(--violet-glow)' : 'transparent',
                color: activeCategory === cat.id ? 'var(--violet-light)' : 'var(--text-muted)',
                fontSize: '13px', fontWeight: activeCategory === cat.id ? 600 : 400,
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.18s',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.borderColor = 'var(--border-bright)'
                  e.currentTarget.style.color = 'var(--text)'
                }
              }}
              onMouseLeave={e => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                }
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

function NavIconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      title={label}
      style={{
        width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'transparent', border: '1px solid var(--border)', borderRadius: '10px',
        cursor: 'pointer', fontSize: '17px', transition: 'all 0.18s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--bg-elevated)'
        e.currentTarget.style.borderColor = 'var(--border-bright)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      {children}
    </button>
  )
}
