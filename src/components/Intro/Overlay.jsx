import { useRef, useState } from 'react'
import styles from './Overlay.module.css'

// OVERLAY_W x OVERLAY_H maps 1:1 to the canvas texture (1024x1024)
export const OVERLAY_W = 320
export const OVERLAY_H = 400

export default function Overlay({ items, setItems, side }) {
  const overlayRef = useRef()
  const dragging = useRef(null) // { id, offsetX, offsetY }

  const onMouseDown = (e, id) => {
    e.preventDefault()
    const rect = overlayRef.current.getBoundingClientRect()
    const item = items.find(i => i.id === id)
    dragging.current = {
      id,
      offsetX: e.clientX - rect.left - item.x,
      offsetY: e.clientY - rect.top - item.y,
    }
  }

  const onMouseMove = (e) => {
    if (!dragging.current) return
    const rect = overlayRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(OVERLAY_W, e.clientX - rect.left - dragging.current.offsetX))
    const y = Math.max(0, Math.min(OVERLAY_H, e.clientY - rect.top - dragging.current.offsetY))
    setItems(prev => prev.map(i => i.id === dragging.current.id ? { ...i, x, y } : i))
  }

  const onMouseUp = () => { dragging.current = null }

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div className={styles.label}>{side === 'front' ? 'FRONT' : 'BACK'}</div>

      {items.filter(i => i.side === side).map(item => (
        <div
          key={item.id}
          className={styles.item}
          style={{ left: item.x, top: item.y }}
          onMouseDown={e => onMouseDown(e, item.id)}
        >
          {item.type === 'text'
            ? <span style={{ fontFamily: item.font, fontSize: item.fontSize, color: item.color }}>{item.text}</span>
            : <img src={item.src} style={{ width: item.size, height: item.size, objectFit: 'contain' }} />
          }
          <button className={styles.remove} onClick={() => removeItem(item.id)}>×</button>
        </div>
      ))}
    </div>
  )
}
