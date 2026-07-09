import { useState, type FormEvent } from 'react'

interface SignupPageProps {
  onSignup: (email: string, name: string) => void
  onGoLogin: () => void
}

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    period: 'forever',
    features: ['5 books per month', '3 audiobooks', 'Ads supported', 'Standard quality'],
    accent: 'var(--teal)',
    glow: 'rgba(6,182,212,0.15)',
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '₹99',
    period: '/month',
    features: ['Unlimited ebooks', '20 audiobooks', '10 dramas', 'HD audio, no ads'],
    accent: 'var(--violet-light)',
    glow: 'var(--violet-glow)',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹199',
    period: '/month',
    features: ['Everything unlimited', 'Offline downloads', 'Early access', 'Priority support'],
    accent: 'var(--amber)',
    glow: 'var(--amber-glow)',
    popular: true,
  },
]

export default function SignupPage({ onSignup, onGoLogin }: SignupPageProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [plan, setPlan] = useState('free')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const handleStep1 = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email address.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm) { setError("Passwords don't match."); return }
    if (!agreed) { setError('Please agree to the Terms of Service.'); return }
    setStep(2)
  }

  const handleStep2 = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    onSignup(email, name)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div style={{ position: 'absolute', top: '5%', right: '10%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: step === 2 ? '800px' : '460px', position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: 52, height: 52, margin: '0 auto 12px',
            background: 'linear-gradient(135deg, var(--violet), var(--pink))',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', boxShadow: '0 8px 28px var(--violet-glow-strong)',
          }}>
            📚
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.5px' }}>
            Join <span style={{ color: 'var(--violet-light)' }}>ReadSphere</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>
            Free forever · Unlimited knowledge
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {[1, 2].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: step >= s ? 'linear-gradient(135deg, var(--violet), var(--pink))' : 'var(--bg-elevated)',
                border: step >= s ? 'none' : '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: 700, color: step >= s ? '#fff' : 'var(--text-muted)',
                boxShadow: step >= s ? '0 2px 12px var(--violet-glow-strong)' : 'none',
                transition: 'all 0.3s',
              }}>
                {step > s ? '✓' : s}
              </div>
              <span style={{ fontSize: '12px', color: step >= s ? 'var(--text)' : 'var(--text-dim)', fontWeight: step >= s ? 600 : 400 }}>
                {s === 1 ? 'Your Details' : 'Choose Plan'}
              </span>
              {s < 2 && <div style={{ width: 32, height: 1, background: step > s ? 'var(--violet)' : 'var(--border)' }} />}
            </div>
          ))}
        </div>

        {/* Step 1 — Details */}
        {step === 1 && (
          <div style={{
            background: 'var(--bg-card)', borderRadius: '20px',
            border: '1px solid var(--border-bright)', padding: '32px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
          }}>
            <form onSubmit={handleStep1}>
              <Field label="Full name">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Arjun Kumar" autoComplete="name" style={inputStyle}
                  onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px var(--violet)')}
                  onBlur={e => (e.currentTarget.style.boxShadow = '0 0 0 1px var(--border)')} />
              </Field>
              <Field label="Email address" style={{ marginTop: '14px' }}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" style={inputStyle}
                  onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px var(--violet)')}
                  onBlur={e => (e.currentTarget.style.boxShadow = '0 0 0 1px var(--border)')} />
              </Field>
              <Field label="Password" style={{ marginTop: '14px' }}>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" autoComplete="new-password" style={{ ...inputStyle, paddingRight: '44px' }}
                    onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px var(--violet)')}
                    onBlur={e => (e.currentTarget.style.boxShadow = '0 0 0 1px var(--border)')} />
                  <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '16px' }}>
                    {showPass ? '🙈' : '👁'}
                  </button>
                </div>
                {/* Strength bar */}
                {password && (
                  <div style={{ marginTop: '6px', display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4].map(i => {
                      const strength = Math.min(Math.floor(password.length / 3), 4)
                      const colors = ['#ef4444', '#f97316', '#f59e0b', '#10b981']
                      return <div key={i} style={{ flex: 1, height: '3px', borderRadius: '99px', background: i <= strength ? colors[strength - 1] : 'var(--bg-hover)', transition: 'background 0.2s' }} />
                    })}
                  </div>
                )}
              </Field>
              <Field label="Confirm password" style={{ marginTop: '14px' }}>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat your password" autoComplete="new-password" style={inputStyle}
                  onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px var(--violet)')}
                  onBlur={e => (e.currentTarget.style.boxShadow = '0 0 0 1px var(--border)')} />
              </Field>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '18px', cursor: 'pointer' }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                  style={{ accentColor: 'var(--violet)', width: 16, height: 16, marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  I agree to ReadSphere's{' '}
                  <span style={{ color: 'var(--violet-light)', cursor: 'pointer' }}>Terms of Service</span>{' '}
                  and{' '}
                  <span style={{ color: 'var(--violet-light)', cursor: 'pointer' }}>Privacy Policy</span>
                </span>
              </label>

              {error && (
                <div style={{ marginTop: '14px', padding: '10px 14px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171', fontSize: '13px' }}>
                  ⚠ {error}
                </div>
              )}

              <button type="submit" style={{
                width: '100%', marginTop: '20px', padding: '14px', borderRadius: '12px', border: 'none',
                background: 'linear-gradient(135deg, var(--violet), var(--pink))',
                color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 20px var(--violet-glow-strong)', transition: 'opacity 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Continue → Choose Plan
              </button>
            </form>
          </div>
        )}

        {/* Step 2 — Plan selection */}
        {step === 2 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
              {plans.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPlan(p.id)}
                  style={{
                    background: 'var(--bg-card)', borderRadius: '18px', padding: '24px 20px',
                    border: plan === p.id ? `2px solid ${p.accent}` : '1px solid var(--border)',
                    cursor: 'pointer', textAlign: 'left', color: 'var(--text)',
                    position: 'relative', transition: 'all 0.2s',
                    boxShadow: plan === p.id ? `0 8px 32px ${p.glow}` : 'none',
                  }}
                >
                  {p.popular && (
                    <div style={{
                      position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)',
                      padding: '3px 14px', borderRadius: '99px',
                      background: `linear-gradient(135deg, var(--amber), var(--orange))`,
                      color: '#000', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap',
                    }}>
                      ⭐ Most Popular
                    </div>
                  )}
                  <div style={{ fontSize: '13px', fontWeight: 600, color: p.accent, marginBottom: '8px' }}>
                    {p.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, letterSpacing: '-1px', color: 'var(--text)' }}>
                    {p.price}
                    <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)' }}>{p.period}</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {p.features.map(f => (
                      <li key={f} style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', gap: '7px', alignItems: 'flex-start' }}>
                        <span style={{ color: p.accent, flexShrink: 0 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {plan === p.id && (
                    <div style={{
                      position: 'absolute', top: '14px', right: '14px',
                      width: 20, height: 20, borderRadius: '50%',
                      background: p.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontWeight: 800, color: '#000',
                    }}>
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleStep2}
              disabled={loading}
              style={{
                width: '100%', padding: '15px', borderRadius: '12px', border: 'none',
                background: loading ? 'var(--bg-elevated)' : 'linear-gradient(135deg, var(--violet), var(--pink))',
                color: loading ? 'var(--text-muted)' : '#fff',
                fontSize: '16px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)',
                boxShadow: loading ? 'none' : '0 4px 24px var(--violet-glow-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              {loading ? (
                <>
                  <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'var(--text-muted)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Creating your account…
                </>
              ) : `Start Reading with ${plans.find(p2 => p2.id === plan)?.name} Plan →`}
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </button>

            <button onClick={() => setStep(1)} style={{ width: '100%', marginTop: '10px', padding: '11px', background: 'none', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
              ← Back
            </button>
          </div>
        )}

        <p style={{ textAlign: 'center', marginTop: '18px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <button onClick={onGoLogin} style={{ background: 'none', border: 'none', color: 'var(--violet-light)', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
            Sign in →
          </button>
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
