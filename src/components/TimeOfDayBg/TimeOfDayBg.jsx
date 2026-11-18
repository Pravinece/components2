/**
 * ============================================
 *  TimeOfDayBg — Reusable Time-of-Day Background Component
 * ============================================
 *
 * A self-contained React component that accepts any background image and applies
 * time-of-day lighting, reflection, shimmer, and atmospheric effects.
 *
 * Props:
 *   - backgroundImage  (string)  URL of the background image
 *   - time             (string)  'morning' | 'afternoon' | 'evening' | 'night'
 *   - onTimeChange     (func)    Called when time selector changes
 *   - title            (string)  Optional title overlay text
 *   - subtitle         (string)  Optional subtitle overlay text
 *
 * Usage in any project:
 *   import TimeOfDayBg from 'path/to/components/TimeOfDayBg/TimeOfDayBg.jsx'
 *
 *   <TimeOfDayBg
 *     backgroundImage="/your-image.jpg"
 *     time="morning"
 *     onTimeChange={(t) => setTime(t)}
 *     title="Hello World"
 *   />
 */

import { useState, useCallback } from 'react'
import styles from './TimeOfDayBg.module.css'

/* ============================================================
   TIME PRESETS — Each preset defines:
     - colors:      overlay gradient stop colors
     - filter:      CSS filter applied to the background image
     - shadowColor:  color of the glow / bloom behind glass cards
     - shimmerAngle: angle for the shimmer sweep direction
     - particleOpacity: intensity of floating light particles
   ============================================================ */

const TIME_PRESETS = {
  morning: {
    label: '🌅 Morning',
    gradientStops: [
      ['rgba(255, 193, 77, 0.45)', '0%'],
      ['rgba(255, 248, 225, 0.30)', '50%'],
      ['rgba(179, 229, 252, 0.25)', '100%'],
    ],
    filter: 'brightness(1.15) saturate(1.2) contrast(1.05)',
    shadowColor: 'rgba(255, 183, 77, 0.6)',
    shimmerAngle: '135deg',
    particleOpacity: 0.4,
    cardTint: 'rgba(255, 228, 196, 0.15)',
    accentColor: '#e65100',
  },

  afternoon: {
    label: '☀️ Afternoon',
    gradientStops: [
      ['rgba(255, 235, 59, 0.35)', '0%'],
      ['rgba(255, 255, 255, 0.15)', '50%'],
      ['rgba(144, 202, 249, 0.20)', '100%'],
    ],
    filter: 'brightness(1.2) saturate(1.3) contrast(1.08)',
    shadowColor: 'rgba(255, 235, 59, 0.7)',
    shimmerAngle: '45deg',
    particleOpacity: 0.6,
    cardTint: 'rgba(255, 253, 208, 0.12)',
    accentColor: '#f57f17',
  },

  evening: {
    label: '🌇 Evening',
    gradientStops: [
      ['rgba(230, 81, 0, 0.55)', '0%'],
      ['rgba(156, 39, 176, 0.40)', '50%'],
      ['rgba(63, 81, 181, 0.45)', '100%'],
    ],
    filter: 'brightness(0.85) saturate(1.4) contrast(1.1)',
    shadowColor: 'rgba(213, 180, 255, 0.6)',
    shimmerAngle: '200deg',
    particleOpacity: 0.3,
    cardTint: 'rgba(178, 102, 255, 0.12)',
    accentColor: '#ab47bc',
  },

  night: {
    label: '🌙 Night',
    gradientStops: [
      ['rgba(13, 12, 60, 0.70)', '0%'],
      ['rgba(25, 25, 80, 0.55)', '50%'],
      ['rgba(0, 0, 40, 0.65)', '100%'],
    ],
    filter: 'brightness(0.5) saturate(0.7) contrast(1.15)',
    shadowColor: 'rgba(100, 149, 237, 0.4)',
    shimmerAngle: '270deg',
    particleOpacity: 0.8,
    cardTint: 'rgba(30, 30, 80, 0.25)',
    accentColor: '#64b5f6',
  },
}


/* ============================================================
   LIGHT PARTICLES — floating orbs that simulate dust/pollen/starlight
   ============================================================ */

function LightParticles({ opacity }) {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 6,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 8 + Math.random() * 12,
    delay: -Math.random() * 15,
    opacity: 0.2 + Math.random() * 0.6,
  }))

  return (
    <div className={styles.particles} style={{ '--particle-opacity': opacity }}>
      {particles.map((p) => (
        <span
          key={p.id}
          className={styles.particle}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}


/* ============================================================
   SHIMMER LINE — a sweeping bright streak across the surface
   ============================================================ */

function ShimmerSweep({ angle }) {
  return (
    <div className={styles.shimmerContainer}>
      <div
        className={styles.shimmerSweep}
        style={{ background: `linear-gradient(${angle}, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)` }}
      />
    </div>
  )
}


/* ============================================================
   TIME SELECTOR — pill-style toggle buttons
   ============================================================ */

function TimeSelector({ currentTime, onTimeChange }) {
  const times = Object.keys(TIME_PRESETS)

  return (
    <div className={styles.timeSelector}>
      <span className={styles.timeSelectorLabel}>Time of Day</span>
      <div className={styles.pillGroup} role="radiogroup" aria-label="Time of day">
        {times.map((t) => (
          <button
            key={t}
            role="radio"
            aria-checked={currentTime === t}
            className={`${styles.pillBtn} ${currentTime === t ? styles.pillBtnActive : ''}`}
            onClick={() => onTimeChange(t)}
          >
            {TIME_PRESETS[t].label}
          </button>
        ))}
      </div>
    </div>
  )
}


/* ============================================================
   MAIN COMPONENT
   ============================================================ */

function TimeOfDayBg({
  backgroundImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80',
  time = 'morning',
  onTimeChange,
  title = 'Welcome',
  subtitle = 'Select a time of day to transform the atmosphere',
}) {
  const [current, setCurrent] = useState(time)
  const preset = TIME_PRESETS[current]

  const handleChange = useCallback(
    (t) => {
      setCurrent(t)
      if (onTimeChange) onTimeChange(t)
    },
    [onTimeChange],
  )

  /* Build the gradient background from preset stops */
  const bgGradient = `linear-gradient(160deg, ${preset.gradientStops.map((s) => s.join(',')).join(',')})`

  return (
    <div className={styles.container}>
      {/* ── Background image layer ── */}
      <div
        className={styles.bgImage}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: preset.filter,
        }}
      />

      {/* ── Gradient time overlay ── */}
      <div className={styles.gradientOverlay} style={{ background: bgGradient }} />

      {/* ── Shimmer sweep layer ── */}
      <ShimmerSweep angle={preset.shimmerAngle} />

      {/* ── Floating light particles ── */}
      <LightParticles opacity={preset.particleOpacity} />

      {/* ── Glass card container (demonstrates reflection/glassmorphism) ── */}
      <div className={styles.glassCard}>
        {/* Bloom glow behind card */}
        <div className={styles.cardGlow} style={{ boxShadow: `0 0 60px 20px ${preset.shadowColor}` }} />

        <div className={styles.cardContent}>
          <span className={styles.timeBadge}>{preset.label}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>

          {/* Decorative stat row */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{preset.accentColor}</span>
              <span className={styles.statLabel}>Accent</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{current.charAt(0).toUpperCase() + current.slice(1)}</span>
              <span className={styles.statLabel}>Period</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{preset.filter}</span>
              <span className={styles.statLabel} style={{ fontSize: 10 }}>Filter</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Time selector controls ── */}
      <TimeSelector currentTime={current} onTimeChange={handleChange} />
    </div>
  )
}

export default TimeOfDayBg


/* ============================================================
   EXPORT: Named presets for programmatic use in other projects
   ============================================================ */
export { TIME_PRESETS }
