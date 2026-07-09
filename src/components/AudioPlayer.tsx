import { useState, useEffect, useRef } from 'react'
import { typeConfig, type Content } from '../data/mockData'

interface AudioPlayerProps {
  track: Content
  isPlaying: boolean
  onTogglePlay: () => void
  onClose: () => void
}

export default function AudioPlayer({ track, isPlaying, onTogglePlay, onClose }: AudioPlayerProps) {
  const [progress, setProgress] = useState(22)
  const [volume, setVolume] = useState(80)
  const [liked, setLiked] = useState(false)
  const [shuffled, setShuffled] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const cfg = typeConfig[track.type]

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress(p => Math.min(p + 0.05, 100))
      }, 200)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPlaying])

  const totalMins = 335
  const elapsed = Math.floor((progress / 100) * totalMins)
  const remaining = totalMins - elapsed
  const fmt = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(10,10,20,0.96)', backdropFilter: 'blur(24px)',
      borderTop: '1px solid var(--border)',
      boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
    }}>
      {/* Progress bar (full width, ultra-thin) */}
      <div
        style={{ position: 'relative', height: '3px', background: 'rgba(255,255,255,0.07)', cursor: 'pointer' }}
        onClick={e => {
          const rect = e.currentTarget.getBoundingClientRect()
          setProgress(((e.clientX - rect.left) / rect.width) * 100)
        }}
      >
        <div style={{
          height: '100%', width: `${progress}%`,
          background: `linear-gradient(to right, var(--violet), var(--pink))`,
          transition: 'width 0.2s linear',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: `${progress}%`,
          transform: 'translate(-50%, -50%)',
          width: '12px', height: '12px', borderRadius: '50%',
          background: 'white', boxShadow: '0 0 0 2px var(--violet)',
        }} />
      </div>

      <div style={{
        maxWidth: '1400px', margin: '0 auto', padding: '12px 24px',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '16px',
      }}>
        {/* Track info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          {/* Mini cover */}
          <div style={{
            width: 48, height: 48, borderRadius: '10px', flexShrink: 0, overflow: 'hidden',
            background: track.coverGradient
              ? `linear-gradient(135deg, ${track.coverGradient[0]}, ${track.coverGradient[1]})`
              : 'var(--bg-elevated)',
            boxShadow: `0 0 16px ${cfg.glow}`,
            border: `1px solid ${cfg.color}44`,
          }}>
            {track.imageId ? (
              <img
                src={`https://images.unsplash.com/photo-${track.imageId}?w=100&h=100&fit=crop&auto=format`}
                alt={track.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                {cfg.icon}
              </div>
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {track.title}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '1px' }}>
              {track.author} · <span style={{ color: cfg.color }}>{cfg.label}</span>
            </div>
          </div>
          <button
            onClick={() => setLiked(l => !l)}
            style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', opacity: liked ? 1 : 0.4, transition: 'opacity 0.15s', marginLeft: '4px' }}
          >
            {liked ? '❤️' : '🤍'}
          </button>
        </div>

        {/* Playback controls (center) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CtrlBtn onClick={() => setShuffled(s => !s)} active={shuffled} title="Shuffle">⇌</CtrlBtn>
          <CtrlBtn onClick={() => setProgress(p => Math.max(p - 3, 0))} title="Previous">⏮</CtrlBtn>

          <button
            onClick={onTogglePlay}
            style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--violet), var(--pink))',
              border: 'none', color: 'white', fontSize: '20px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px var(--violet-glow-strong)',
              transition: 'transform 0.1s, box-shadow 0.15s',
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.93)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          <CtrlBtn onClick={() => setProgress(p => Math.min(p + 3, 100))} title="Next">⏭</CtrlBtn>
          <CtrlBtn title="Speed">1×</CtrlBtn>
        </div>

        {/* Volume + time + close (right) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
            {fmt(elapsed)} / {fmt(totalMins)}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '14px', opacity: 0.6 }}>{volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}</span>
            <input
              type="range" min={0} max={100} value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              style={{ width: '80px', accentColor: 'var(--violet)', cursor: 'pointer' }}
            />
          </div>
          <button
            onClick={onClose}
            title="Close player"
            style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)', border: 'none',
              color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

function CtrlBtn({ onClick, children, active, title }: { onClick?: () => void; children: React.ReactNode; active?: boolean; title?: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 36, height: 36, borderRadius: '50%',
        background: active ? 'var(--violet-glow)' : 'transparent',
        border: 'none', color: active ? 'var(--violet-light)' : 'var(--text-muted)',
        cursor: 'pointer', fontSize: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.15s', fontFamily: 'var(--font-mono)',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'var(--text)' }}
      onMouseLeave={e => { e.currentTarget.style.background = active ? 'var(--violet-glow)' : 'transparent'; e.currentTarget.style.color = active ? 'var(--violet-light)' : 'var(--text-muted)' }}
    >
      {children}
    </button>
  )
}
