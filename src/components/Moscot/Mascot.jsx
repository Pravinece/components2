import { useMascot } from './useMascot'
import directionsImg from '../../assets/moscot/pravin-directions.png'
import reactionsImg  from '../../assets/moscot/koala-reactions.webp'

// Each sprite sheet is 3×3. background-size:300% makes each cell exactly 1/3.
// Positions: col 0→0%, col 1→50%, col 2→100%  (same for rows)
function cellStyle(index) {
  const col = (index % 3) * 50   // 0, 50, or 100
  const row = Math.floor(index / 3) * 50
  return { backgroundPosition: `${col}% ${row}%` }
}

const sheetLayer = {
  position: 'absolute',
  inset: 0,
  backgroundSize: '300% 300%',
  backgroundRepeat: 'no-repeat',
}

export default function Mascot({ size = 200 }) {
  const { buttonRef, squashRef, boop, dirIndex, rxIndex, hasReaction } = useMascot()

  return (
    <button
      ref={buttonRef}
      onClick={boop}
      aria-label="Boop the koala"
      style={{
        position: 'relative',
        display: 'block',
        width: size,
        height: size,
        padding: 0,
        border: 0,
        background: 'transparent',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <span
        ref={squashRef}
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '100%',
          transformOrigin: '50% 78%',   // pivot near the feet for squash bounce
        }}
      >
        {/* Direction layer — koala looks toward the cursor */}
        <span
          style={{
            ...sheetLayer,
            backgroundImage: `url(${directionsImg})`,
            ...cellStyle(dirIndex),
            opacity: hasReaction ? 0 : 1,
          }}
        />

        {/* Reaction layer — shown on click, hidden otherwise */}
        {/* Always mounted so the image is pre-fetched before first click */}
        <span
          style={{
            ...sheetLayer,
            backgroundImage: `url(${reactionsImg})`,
            ...cellStyle(rxIndex),
            opacity: hasReaction ? 1 : 0,
          }}
        />
      </span>
    </button>
  )
}
