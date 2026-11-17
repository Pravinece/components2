import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { useState, useCallback, Suspense } from 'react'
import TshirtModel from './TshirtModel'
import Controls from './Controls'
import Overlay, { OVERLAY_W, OVERLAY_H } from './Overlay'
import styles from './Experience.module.css'

let nextId = 1

export default function Experience() {
  const [color, setColor] = useState('#ffffff')
  const [side, setSide] = useState('front')
  const [items, setItems] = useState([])

  const onAddText = useCallback(({ text, font, fontSize, color }) => {
    setItems(p => [...p, {
      id: nextId++, type: 'text', side,
      x: OVERLAY_W / 2 - 40, y: OVERLAY_H / 2 - 10,
      text, font, fontSize, color,
    }])
  }, [side])

  const onAddImage = useCallback(({ src, size }) => {
    const imgEl = new Image()
    imgEl.src = src
    setItems(p => [...p, {
      id: nextId++, type: 'image', side,
      x: OVERLAY_W / 2 - size / 2, y: OVERLAY_H / 2 - size / 2,
      src, imgEl, size,
    }])
  }, [side])

  return (
    <div className={styles.wrapper}>
      <Controls
        color={color} setColor={setColor}
        side={side} setSide={setSide}
        onAddText={onAddText} onAddImage={onAddImage}
      />

      <div className={styles.canvasArea}>
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <Suspense fallback={null}>
            <Environment preset="city" />
            <TshirtModel color={color} items={items} />
          </Suspense>
          <OrbitControls enablePan={false} />
        </Canvas>

        {/* 2D overlay on top of canvas */}
        <div className={styles.overlayWrapper}>
          <Overlay items={items} setItems={setItems} side={side} />
        </div>
      </div>
    </div>
  )
}
