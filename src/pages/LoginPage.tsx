import { useState, type FormEvent } from 'react'

interface LoginPageProps {
  onLogin: (email: string, name: string) => void
  onGoSignup: () => void
}

export default function LoginPage({ onLogin, onGoSignup }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) { setError('Please enter your email.'); return }
    if (!password) { setError('Please enter your password.'); return }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email address.'); return }
    setLoading(true)
    // Simulate auth delay
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    onLogin(email, name)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '15%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: 56, height: 56, margin: '0 auto 14px',
            background: 'linear-gradient(135deg, var(--violet), var(--pink))',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', boxShadow: '0 8px 32px var(--violet-glow-strong)',
          }}>
            📚
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800,
            margin: '0 0 4px', letterSpacing: '-0.5px',
          }}>
            Welcome back to <span style={{ color: 'var(--violet-light)' }}>ReadSphere</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
            Your library awaits. Sign in to continue.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: '20px',
          border: '1px solid var(--border-bright)', padding: '32px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
        }}>
          {/* Social login buttons */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            <SocialBtn icon="G" label="Google" color="#EA4335" onClick={() => onLogin('google@gmail.com', 'Google User')} />
            <SocialBtn icon="f" label="Facebook" color="#1877F2" onClick={() => onLogin('fb@facebook.com', 'Facebook User')} />
            <SocialBtn icon="🍎" label="Apple" color="#fff" onClick={() => onLogin('apple@icloud.com', 'Apple User')} />
          </div>

          <Divider />

          <form onSubmit={handleSubmit}>
            <Field label="Email address">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px var(--violet)')}
                onBlur={e => (e.currentTarget.style.boxShadow = '0 0 0 1px var(--border)')}
              />
            </Field>

            <Field label="Password" style={{ marginTop: '16px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{ ...inputStyle, paddingRight: '44px' }}
                  onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px var(--violet)')}
                  onBlur={e => (e.currentTarget.style.boxShadow = '0 0 0 1px var(--border)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '16px',
                  }}
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </Field>

            <div style={{ textAlign: 'right', marginTop: '8px' }}>
              <button type="button" style={{ background: 'none', border: 'none', color: 'var(--violet-light)', fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                Forgot password?
              </button>
            </div>

            {error && (
              <div style={{
                marginTop: '14px', padding: '10px 14px', borderRadius: '10px',
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#F87171', fontSize: '13px',
              }}>
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', marginTop: '20px', padding: '14px',
                borderRadius: '12px', border: 'none',
                background: loading ? 'var(--bg-elevated)' : 'linear-gradient(135deg, var(--violet), var(--violet-mid))',
                color: loading ? 'var(--text-muted)' : '#fff',
                fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)',
                boxShadow: loading ? 'none' : '0 4px 20px var(--violet-glow-strong)',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              {loading ? (
                <>
                  <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'var(--text-muted)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Signing in…
                </>
              ) : 'Sign In →'}
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <button
            onClick={onGoSignup}
            style={{ background: 'none', border: 'none', color: 'var(--violet-light)', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}
          >
            Create one free →
          </button>
        </p>

        <p style={{ textAlign: 'center', marginTop: '8px', fontSize: '11px', color: 'var(--text-dim)' }}>
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px', borderRadius: '10px',
  background: 'var(--bg-elevated)', border: 'none',
  boxShadow: '0 0 0 1px var(--border)',
  color: 'var(--text)', fontSize: '14px', outline: 'none',
  fontFamily: 'var(--font-body)', boxSizing: 'border-box',
  transition: 'box-shadow 0.15s',
}

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={style}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '7px' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function SocialBtn({ icon, label, color, onClick }: { icon: string; label: string; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      style={{
        flex: 1, padding: '10px', borderRadius: '10px',
        background: 'var(--bg-elevated)', border: '1px solid var(--border)',
        color: 'var(--text)', cursor: 'pointer', fontFamily: 'var(--font-body)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        fontSize: '13px', fontWeight: 600, transition: 'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color + '66'; e.currentTarget.style.background = 'var(--bg-hover)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-elevated)' }}
    >
      <span style={{ fontSize: '15px', fontWeight: 900, color }}>{icon}</span>
      {label}
    </button>
  )
}

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>or continue with email</span>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
    </div>
  )
}
