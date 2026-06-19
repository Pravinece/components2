import React, { useRef, useState } from 'react'
import styles from './ClipPath.module.css'

function ClipPath() {
  const spotlightRef = useRef(null)
  const sliderRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalPos, setModalPos] = useState({ x: '50%', y: '50%' })
  const [loaderDone, setLoaderDone] = useState(false)
  const [expanded, setExpanded] = useState(null)

  const handleMouseMove = (e) => {
    const rect = spotlightRef.current.getBoundingClientRect()
    spotlightRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`)
    spotlightRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  const handleSlider = (e) => {
    const rect = sliderRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    sliderRef.current.style.setProperty('--split', `${x}%`)
  }

  const openModal = (e) => {
    setModalPos({ x: `${e.clientX}px`, y: `${e.clientY}px` })
    setModalOpen(true)
  }

  return (
    <div className={styles.container}>

      {/* ===== POLYGON ANIMATIONS ===== */}
      <h2>polygon() clip-path animations</h2>

      <h3>Reveal Animations (hover the boxes)</h3>
      <div className={styles.row}>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.wipeLeft}`}></div>
          <p>Wipe from Left</p>
        </div>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.wipeRight}`}></div>
          <p>Wipe from Right</p>
        </div>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.wipeTop}`}></div>
          <p>Wipe from Top</p>
        </div>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.wipeBottom}`}></div>
          <p>Wipe from Bottom</p>
        </div>
      </div>

      <h3>Diagonal Reveals</h3>
      <div className={styles.row}>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.diagLeft}`}></div>
          <p>Diagonal Left</p>
        </div>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.diagRight}`}></div>
          <p>Diagonal Right</p>
        </div>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.diagSplit}`}></div>
          <p>Diagonal Split</p>
        </div>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.xReveal}`}></div>
          <p>X Reveal</p>
        </div>
      </div>

      <h3>Shape Morphs</h3>
      <div className={styles.row}>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.diamond}`}></div>
          <p>Diamond → Full</p>
        </div>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.triangle}`}></div>
          <p>Triangle → Full</p>
        </div>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.star}`}></div>
          <p>Star → Full</p>
        </div>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.arrow}`}></div>
          <p>Arrow → Full</p>
        </div>
      </div>

      <h3>Split/Door Animations</h3>
      <div className={styles.row}>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.curtainH}`}></div>
          <p>Curtain Horizontal</p>
        </div>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.curtainV}`}></div>
          <p>Curtain Vertical</p>
        </div>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.iris}`}></div>
          <p>Iris (diamond open)</p>
        </div>
        <div className={styles.box}>
          <div className={`${styles.img} ${styles.fan}`}></div>
          <p>Fan Open</p>
        </div>
      </div>

      {/* ===== CURSOR SPOTLIGHT ===== */}
      <h2>Cursor Spotlight</h2>
      <div
        ref={spotlightRef}
        className={styles.spotlight}
        onMouseMove={handleMouseMove}
        style={{ '--x': '50%', '--y': '50%' }}
      >
        <div className={styles.spotlightBg}>HIDDEN CONTENT — move cursor here</div>
        <div className={styles.spotlightReveal}>
          <h3>✨ You found me!</h3>
          <p>Move your cursor around</p>
        </div>
      </div>

      {/* ===== HERO IMAGE REVEAL ===== */}
      <h2>Hero Image Reveal (hover)</h2>
      <div className={styles.heroWrapper}>
        <div className={styles.hero}></div>
      </div>

      {/* ===== APPLE-STYLE MODAL ===== */}
      <h2>Apple-style Modal</h2>
      <button className={styles.btn} onClick={openModal}>Open Modal</button>
      {modalOpen && (
        <div
          className={styles.modal}
          style={{ '--mx': modalPos.x, '--my': modalPos.y }}
          onClick={() => setModalOpen(false)}
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Modal Content</h3>
            <p>Opened from your click position</p>
            <button className={styles.btn} onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* ===== PAGE TRANSITIONS ===== */}
      <h2>Page Transitions (hover)</h2>
      <div className={styles.row}>
        <div className={styles.pageBox}>
          <div className={`${styles.pageCover} ${styles.pageCircle}`}>New Page</div>
          <span>Circle</span>
        </div>
        <div className={styles.pageBox}>
          <div className={`${styles.pageCover} ${styles.pageWipe}`}>New Page</div>
          <span>Wipe</span>
        </div>
        <div className={styles.pageBox}>
          <div className={`${styles.pageCover} ${styles.pageDiamond}`}>New Page</div>
          <span>Diamond</span>
        </div>
      </div>

      {/* ===== IMAGE COMPARISON SLIDER ===== */}
      <h2>Image Comparison Slider</h2>
      <div
        ref={sliderRef}
        className={styles.slider}
        onMouseMove={handleSlider}
        style={{ '--split': '50%' }}
      >
        <div className={styles.sliderBefore}>BEFORE</div>
        <div className={styles.sliderAfter}>AFTER</div>
        <div className={styles.sliderLine}></div>
      </div>

      {/* ===== HOVER REVEALS ===== */}
      <h2>Hover Reveals</h2>
      <div className={styles.row}>
        <div className={styles.revealBox}>
          <div className={`${styles.revealImg} ${styles.revealCircle}`}></div>
          <div className={styles.revealText}>Circle</div>
        </div>
        <div className={styles.revealBox}>
          <div className={`${styles.revealImg} ${styles.revealInset}`}></div>
          <div className={styles.revealText}>Inset</div>
        </div>
        <div className={styles.revealBox}>
          <div className={`${styles.revealImg} ${styles.revealPoly}`}></div>
          <div className={styles.revealText}>Polygon</div>
        </div>
      </div>

      {/* ===== CARD EXPANSION ===== */}
      <h2>Card Expansion (click)</h2>
      <div className={styles.row}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${styles.expandCard} ${expanded === i ? styles.expandCardActive : ''}`}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <h4>Card {i + 1}</h4>
            {expanded === i && <p>Expanded content!</p>}
          </div>
        ))}
      </div>

      {/* ===== LOADER TRANSITION ===== */}
      <h2>Loader Transition</h2>
      <button className={styles.btn} onClick={() => { setLoaderDone(false); setTimeout(() => setLoaderDone(true), 100) }}>Trigger Load</button>
      <div className={styles.loaderBox}>
        <div className={styles.loaderContent}>Content Loaded ✅</div>
        <div className={`${styles.loaderOverlay} ${loaderDone ? styles.loaderDone : ''}`}>Loading...</div>
      </div>

      {/* ===== FULL-SCREEN MENU ===== */}
      <h2>Full-screen Menu</h2>
      <button className={styles.btn} onClick={() => setMenuOpen(true)}>Open Menu</button>

      <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
        <button className={styles.menuClose} onClick={() => setMenuOpen(false)}>✕</button>
        <nav className={styles.menuNav}>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Work</a>
          <a href="#">Contact</a>
        </nav>
      </div>

    </div>
  )
}

export default ClipPath
