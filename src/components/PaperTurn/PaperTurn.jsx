
import React, { useEffect, useRef, useState } from 'react'
import styles from './PaperTurn.module.css'

const SEGMENTS = 40
const WIDTH = 300
const HEIGHT = 180
const DURATION = 900

function easeInOut(t) {
  return t * t * (3 - 2 * t)
}

function PaperTurn() {
  const [progress, setProgress] = useState(0)
  const [angleDeg, setAngleDeg] = useState(60)
  const [direction, setDirection] = useState(1)

  const progressRef = useRef(0)
  const targetRef = useRef(0)

  const totalAngle = (angleDeg * Math.PI) / 180
  const radius = WIDTH / totalAngle
  const angleStep = totalAngle / SEGMENTS
  const flatWidth = WIDTH / SEGMENTS

  const chordWidth =
    2 * radius * Math.sin(angleStep / 2)

  useEffect(() => {
    let frameId
    let startTime
    const startProgress = progressRef.current
    const target = targetRef.current

    function animate(timestamp) {
      if (startTime === undefined) {
        startTime = timestamp
      }

      const t = Math.min(
        (timestamp - startTime) / DURATION,
        1
      )

      const eased = easeInOut(t)

      const next =
        startProgress + (target - startProgress) * eased

      progressRef.current = next
      setProgress(next)

      if (t < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameId)
  }, [angleDeg, direction, targetRef.current])

  function turn() {
    targetRef.current = 1
    setProgress((current) => current)
    setAnimationKey((key) => key + 1)
  }

  function reset() {
    targetRef.current = 0
    setAnimationKey((key) => key + 1)
  }

  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    let frameId
    let startTime

    const from = progressRef.current
    const to = targetRef.current

    function animate(timestamp) {
      if (startTime === undefined) startTime = timestamp

      const t = Math.min((timestamp - startTime) / DURATION, 1)
      const next = from + (to - from) * easeInOut(t)

      progressRef.current = next
      setProgress(next)

      if (t < 1) frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameId)
  }, [animationKey])

  function changeDirection(nextDirection) {
    targetRef.current = 0
    progressRef.current = 0
    setProgress(0)
    setDirection(nextDirection)
  }

  function changeAngle(value) {
    targetRef.current = 0
    progressRef.current = 0
    setProgress(0)
    setAngleDeg(Number(value))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.scene}>
        <div
          className={styles.card}
          style={{ '--bend-progress': progress }}
        >
          {Array.from({ length: SEGMENTS }, (_, i) => {
            const theta = (i + 0.5) * angleStep

            const flatX = (i + 0.5) * flatWidth

            const curvedX =
              radius *
              Math.sin(theta) *
              Math.cos(angleStep / 2)

            const curvedZ =
              radius *
              (
                Math.cos(theta) *
                  Math.cos(angleStep / 2) -
                1
              )

            const bendX =
              direction === 1
                ? curvedX
                : WIDTH - curvedX

            const flatCenter =
              direction === 1
                ? flatX
                : WIDTH - flatX

            const x =
              flatCenter + (bendX - flatCenter) * progress

            const z = curvedZ * progress

            const rotation =
              direction *
              theta *
              (180 / Math.PI) *
              progress

            const stripWidth =
              flatWidth + (chordWidth - flatWidth) * progress

            const brightness =
              1 - Math.abs(Math.sin(theta)) * progress * 0.18

            return (
              <div
                key={i}
                className={styles.strip}
                style={{
                  left: `${x}px`,
                  width: `${stripWidth + 0.1}px`,
                  filter: `brightness(${brightness})`,
                  transform: `
                    translateX(-50%)
                    translateZ(${z}px)
                    rotateY(${rotation}deg)
                  `,
                }}
              />
            )
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={turn}>Turn</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className={styles.controls}>
        <button onClick={() => changeDirection(1)}>
          Bend Right
        </button>
        <button onClick={() => changeDirection(-1)}>
          Bend Left
        </button>
      </div>

      <div className={styles.slider}>
        <label htmlFor="bend-angle">
          Bend angle: {angleDeg}°
        </label>

        <input
          id="bend-angle"
          type="range"
          min="15"
          max="100"
          value={angleDeg}
          onChange={(event) => changeAngle(event.target.value)}
        />

        <p>Animation progress: {Math.round(progress * 100)}%</p>
      </div>
    </div>
  )
}

export default PaperTurn
