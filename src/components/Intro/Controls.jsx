import { useState } from 'react'
import styles from './Controls.module.css'

const FONTS = ['Arial', 'Georgia', 'Courier New', 'Impact', 'Verdana', 'Times New Roman']

export default function Controls({ color, setColor, side, setSide, onAddText, onAddImage }) {
  const [text, setText] = useState('')
  const [font, setFont] = useState('Arial')
  const [fontSize, setFontSize] = useState(24)
  const [textColor, setTextColor] = useState('#000000')
  const [imgSize, setImgSize] = useState(80)

  const handleAddText = () => {
    if (!text.trim()) return
    onAddText({ text, font, fontSize, color: textColor })
    setText('')
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const src = URL.createObjectURL(file)
    onAddImage({ src, size: imgSize })
    e.target.value = ''
  }

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Customize</h2>

      <section className={styles.section}>
        <label>Shirt Color</label>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      </section>

      <section className={styles.section}>
        <label>Side</label>
        <div className={styles.zones}>
          {['front', 'back'].map(s => (
            <button key={s}
              className={`${styles.zoneBtn} ${side === s ? styles.active : ''}`}
              onClick={() => setSide(s)}>{s}</button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <label>Add Text</label>
        <input className={styles.input} value={text} placeholder="Your text..."
          onChange={e => setText(e.target.value)} />
        <label>Font</label>
        <select className={styles.select} value={font} onChange={e => setFont(e.target.value)}>
          {FONTS.map(f => <option key={f}>{f}</option>)}
        </select>
        <label>Size — {fontSize}px</label>
        <input type="range" min={12} max={80} value={fontSize}
          onChange={e => setFontSize(+e.target.value)} />
        <label>Color</label>
        <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} />
        <button className={styles.addBtn} onClick={handleAddText}>+ Add Text</button>
      </section>

      <section className={styles.section}>
        <label>Add Image</label>
        <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImage} />
        <label>Size — {imgSize}px</label>
        <input type="range" min={40} max={200} value={imgSize}
          onChange={e => setImgSize(+e.target.value)} />
      </section>
    </div>
  )
}
