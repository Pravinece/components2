import React, { useRef, useState } from 'react'
import styles from './AnthropicCard.module.css'

function AnthropicCard() {
  const cards = [
    { title: 'Claude 3.5 Sonnet', desc: 'Our most intelligent model', icon: '✦' },
    { title: 'Claude 3.5 Haiku', desc: 'Fast and cost-effective', icon: '⚡' },
    { title: 'Claude 3 Opus', desc: 'Powerful for complex tasks', icon: '◈' },
  ]

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Models</h1>
      <p className={styles.subheading}>Choose the right model for your needs</p>
      <div className={styles.grid}>
        {cards.map((card, i) => (
          <Card key={i} {...card} index={i} />
        ))}
      </div>
    </div>
  )
}

function Card({ title, desc, icon, index }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // 3D tilt (max 15deg)
    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12

    cardRef.current.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `

    // Glow follows cursor
    glowRef.current.style.background = `
      radial-gradient(
        300px circle at ${x}px ${y}px,
        rgba(139, 92, 246, 0.15),
        transparent 60%
      )
    `
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    cardRef.current.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `
    glowRef.current.style.background = 'transparent'
  }

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${styles[`card${index}`]}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated border glow */}
      <div className={styles.borderGlow}></div>

      {/* Cursor glow */}
      <div ref={glowRef} className={styles.glow}></div>

      {/* Content */}
      <div className={styles.content}>
        <span className={styles.icon}>{icon}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{desc}</p>
        <div className={styles.cta}>
          <span>Learn more</span>
          <span className={styles.arrow}>→</span>
        </div>
      </div>

      {/* Shimmer line */}
      <div className={styles.shimmer}></div>
    </div>
  )
}

export default AnthropicCard
