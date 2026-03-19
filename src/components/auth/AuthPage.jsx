import { useState } from 'react'
import { registerUser, loginUser } from '../../firebase/auth'
import { useAuth } from '../../hooks/useAuth.jsx'

export default function AuthPage() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'register') {
        if (!form.username.trim()) { setError('Username is required'); setLoading(false); return }
        await registerUser(form.email, form.password, form.username)
      } else {
        await loginUser(form.email, form.password)
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth.*\)/, ''))
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1200 0%, #2d1f00 40%, #1a1200 100%)',
      fontFamily: 'system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* City silhouette background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <CityBackground />
      </div>

      {/* Yellow glow orb */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 520,
        height: 520,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,208,0,0.13) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 420, margin: '0 16px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          {/* Official PostFinance logo */}
          <div style={{
            margin: '0 auto 20px',
            borderRadius: 16,
            overflow: 'hidden',
            width: 240,
            boxShadow: '0 0 48px rgba(255,208,0,0.35), 0 4px 24px rgba(0,0,0,0.5)',
          }}>
            <img
              src="/postfinance-logo.png"
              alt="PostFinance"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <h1 style={{
            fontSize: 42,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-0.02em',
            margin: 0,
            lineHeight: 1,
          }}>
            Invest<span style={{ color: '#FFD000' }}>opia</span>
          </h1>
          <p style={{ color: '#a89060', marginTop: 10, fontSize: 14, letterSpacing: '0.04em' }}>
            Learn to invest. Build your city.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(20,14,0,0.88)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,208,0,0.20)',
          borderRadius: 20,
          padding: 32,
          boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,208,0,0.08)',
        }}>
          {/* Tab switcher */}
          <div style={{
            display: 'flex', gap: 4, marginBottom: 24,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 12, padding: 4,
          }}>
            {['login', 'register'].map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError('') }}
                style={{
                  flex: 1, padding: '9px 0',
                  borderRadius: 9, border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 700,
                  transition: 'all 0.18s',
                  background: mode === m ? '#FFD000' : 'transparent',
                  color: mode === m ? '#1a1200' : '#a89060',
                }}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mode === 'register' && (
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#a89060', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Username
                </label>
                <input
                  type="text"
                  placeholder="InvestorPro99"
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  style={inputStyle}
                  required
                />
              </div>
            )}
            <div>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#a89060', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#a89060', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                style={inputStyle}
                required
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(180,30,30,0.25)',
                border: '1px solid rgba(220,38,38,0.5)',
                borderRadius: 10,
                padding: '10px 14px',
                color: '#fca5a5',
                fontSize: 13,
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#a89030' : '#FFD000',
                color: '#1a1200',
                fontWeight: 800,
                fontSize: 15,
                padding: '13px 0',
                borderRadius: 12,
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: 4,
                letterSpacing: '0.02em',
                boxShadow: loading ? 'none' : '0 0 24px rgba(255,208,0,0.35)',
                transition: 'all 0.18s',
              }}
            >
              {loading ? '…' : mode === 'login' ? 'Enter Investopia' : 'Start Investing'}
            </button>
          </form>

          {mode === 'register' && (
            <p style={{ color: '#6b5530', fontSize: 12, textAlign: 'center', marginTop: 14 }}>
              You start with <span style={{ color: '#FFD000', fontWeight: 700 }}>CHF 10,000</span> · earn more by completing quizzes
            </p>
          )}
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', color: '#4a3a1a', fontSize: 11, marginTop: 20, letterSpacing: '0.04em' }}>
          © PostFinance AG · Educational simulation only
        </p>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,208,0,0.18)',
  borderRadius: 10,
  padding: '11px 14px',
  color: 'white',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'system-ui, sans-serif',
}

// Animated city silhouette — now in dark amber/gold tones
function CityBackground() {
  const buildings = [
    { x: 5,    h: 120, w: 40 },
    { x: 50,   h: 200, w: 30 },
    { x: 90,   h: 150, w: 50 },
    { x: 150,  h: 80,  w: 35 },
    { x: 195,  h: 250, w: 25 },
    { x: 240,  h: 180, w: 45 },
    { x: 300,  h: 100, w: 60 },
    { x: 370,  h: 220, w: 30 },
    { x: 420,  h: 160, w: 55 },
    { x: 490,  h: 90,  w: 40 },
    { x: 545,  h: 280, w: 20 },
    { x: 590,  h: 140, w: 50 },
    { x: 660,  h: 110, w: 35 },
    { x: 710,  h: 190, w: 45 },
    { x: 770,  h: 130, w: 40 },
    { x: 820,  h: 240, w: 30 },
    { x: 870,  h: 95,  w: 55 },
    { x: 940,  h: 175, w: 35 },
    { x: 990,  h: 120, w: 45 },
    { x: 1050, h: 200, w: 30 },
    { x: 1100, h: 155, w: 50 },
    { x: 1165, h: 85,  w: 40 },
    { x: 1220, h: 230, w: 25 },
    { x: 1270, h: 140, w: 55 },
  ]

  return (
    <svg style={{ position: 'absolute', bottom: 0, width: '100%' }} height="320" xmlns="http://www.w3.org/2000/svg">
      {/* Far layer — darkest */}
      {buildings.map((b, i) => (
        <rect key={`far-${i}`} x={b.x} y={320 - b.h * 0.6} width={b.w * 1.4} height={b.h * 0.6}
          fill="#2a1c00" opacity={0.5} />
      ))}
      {/* Main silhouette */}
      {buildings.map((b, i) => (
        <rect key={i} x={b.x} y={320 - b.h} width={b.w} height={b.h}
          fill="#3d2a00" opacity={0.75} />
      ))}
      {/* Window lights — yellow/amber */}
      {buildings.map((b, i) =>
        Array.from({ length: Math.floor(b.h / 22) }).map((_, j) => {
          const lit = (i * 7 + j * 13) % 10 > 3
          return lit ? (
            <rect key={`w-${i}-${j}`}
              x={b.x + 7} y={320 - b.h + j * 22 + 7}
              width={7} height={7}
              fill="#FFD000" opacity={0.18 + ((i + j) % 3) * 0.08}
              rx={1}
            />
          ) : null
        })
      )}
      {/* Ground line */}
      <rect x={0} y={318} width="100%" height={2} fill="#FFD000" opacity={0.08} />
    </svg>
  )
}
