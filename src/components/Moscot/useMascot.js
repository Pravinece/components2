import { useEffect, useRef, useState } from 'react'

const DIRECTIONS = ['up-left', 'up', 'up-right', 'left', 'center', 'right', 'down-left', 'down', 'down-right']
const REACTIONS  = ['blink', 'heart', 'sparkle', 'surprised', 'wink', 'bashful', 'sleepy', 'dizzy', 'delighted']

// 8 compass sectors clockwise from right, matching atan2 (y-down)
const CLOCKWISE = ['right', 'down-right', 'down', 'down-left', 'left', 'up-left', 'up', 'up-right']
const SECTOR    = (Math.PI * 2) / CLOCKWISE.length
const HYSTERESIS = 0.12
const DEAD_ZONE  = 70

const PAYOFFS    = ['heart', 'sparkle', 'delighted']
const BOOP_PAYOFF  = 120   // ms until payoff expression shows
const BOOP_END     = 560   // ms until expression clears
const DIZZY_AFTER  = 4     // clicks within window triggers dizzy
const DIZZY_WINDOW = 1600  // ms window for counting rapid clicks
const DIZZY_END    = 1100  // ms dizzy lasts

function wrap(angle) {
  return Math.atan2(Math.sin(angle), Math.cos(angle))
}

export function useMascot() {
  const buttonRef  = useRef(null)
  const squashRef  = useRef(null)
  const timersRef  = useRef([])
  const boopsRef   = useRef({ count: 0, at: 0 })

  const [direction, setDirection] = useState('center')
  const [reaction,  setReaction]  = useState(null)

  // Eye tracking — only on devices with a real pointer
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let sector  = -1
    let pointer = null

    const aim = () => {
      const button = buttonRef.current
      if (!button || !pointer) return

      const box = button.getBoundingClientRect()
      const dx  = pointer.x - (box.left + box.width  / 2)
      const dy  = pointer.y - (box.top  + box.height / 2)

      if (Math.hypot(dx, dy) < DEAD_ZONE) {
        sector = -1
        setDirection('center')
        return
      }

      const angle = Math.atan2(dy, dx)
      // Hysteresis: stay in current sector until pointer clearly crosses the edge
      if (sector !== -1 && Math.abs(wrap(angle - sector * SECTOR)) < SECTOR / 2 + HYSTERESIS) return

      sector = (Math.round(angle / SECTOR) + CLOCKWISE.length) % CLOCKWISE.length
      setDirection(CLOCKWISE[sector])
    }

    const onMove = (e) => { pointer = { x: e.clientX, y: e.clientY }; aim() }

    window.addEventListener('pointermove', onMove,  { passive: true })
    window.addEventListener('scroll',      aim,     { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll',      aim)
    }
  }, [])

  // Clear all timers on unmount
  useEffect(() => () => timersRef.current.forEach(clearTimeout), [])

  const boop = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    const later = (ms, next) =>
      timersRef.current.push(setTimeout(() => setReaction(next), ms))

    const now   = Date.now()
    const boops = boopsRef.current
    boops.count = now - boops.at < DIZZY_WINDOW ? boops.count + 1 : 1
    boops.at    = now

    if (boops.count >= DIZZY_AFTER) {
      boops.count = 0
      setReaction('dizzy')
      later(DIZZY_END, null)
    } else {
      setReaction('blink')
      later(BOOP_PAYOFF, PAYOFFS[(boops.count - 1) % PAYOFFS.length])
      later(BOOP_END,    null)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    squashRef.current?.animate(
      [
        { transform: 'scale(1, 1)',       easing: 'ease-in' },
        { transform: 'scale(1.10, 0.86)', offset: 0.18, easing: 'ease-out' },
        { transform: 'scale(0.95, 1.08)', offset: 0.45, easing: 'ease-in-out' },
        { transform: 'scale(1.03, 0.97)', offset: 0.72, easing: 'ease-in-out' },
        { transform: 'scale(1, 1)' },
      ],
      { duration: 420, easing: 'linear' }
    )
  }

  // Map a name to its sprite-sheet cell index
  const dirIndex = DIRECTIONS.indexOf(direction)
  const rxIndex  = REACTIONS.indexOf(reaction ?? 'blink')

  return { buttonRef, squashRef, boop, dirIndex, rxIndex, hasReaction: !!reaction }
}
