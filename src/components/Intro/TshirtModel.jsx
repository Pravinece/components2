import { useGLTF } from '@react-three/drei'
import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { OVERLAY_W, OVERLAY_H } from './Overlay'

const TEX = 1024

// map overlay px → texture px
const ox = x => (x / OVERLAY_W) * TEX
const oy = y => (y / OVERLAY_H) * TEX

function buildCanvas(color, items) {
  const canvas = document.createElement('canvas')
  canvas.width = TEX
  canvas.height = TEX
  const ctx = canvas.getContext('2d')

  // front = left half, back = right half
  ctx.fillStyle = color
  ctx.fillRect(0, 0, TEX, TEX)

  items.forEach(item => {
    const offX = item.side === 'back' ? TEX / 2 : 0
    if (item.type === 'text') {
      ctx.save()
      if (item.side === 'front') {
        ctx.translate(offX + ox(item.x) * 2 + item.fontSize * (TEX / OVERLAY_W) * item.text.length * 0.3, 0)
        ctx.scale(-1, 1)
      }
      ctx.font = `${item.fontSize * (TEX / OVERLAY_W)}px ${item.font}`
      ctx.fillStyle = item.color
      ctx.textBaseline = 'top'
      ctx.fillText(item.text, offX + ox(item.x), oy(item.y))
      ctx.restore()
    } else if (item.type === 'image' && item.imgEl) {
      const s = item.size * (TEX / OVERLAY_W)
      ctx.save()
      if (item.side === 'front') {
        ctx.translate(offX + ox(item.x) * 2 + s, 0)
        ctx.scale(-1, 1)
      }
      ctx.drawImage(item.imgEl, offX + ox(item.x), oy(item.y), s, s)
      ctx.restore()
    }
  })

  return canvas
}

export default function TshirtModel({ color, items }) {
  const { scene } = useGLTF('models/tshirt.glb')
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return
    const box = new THREE.Box3().setFromObject(ref.current)
    const center = new THREE.Vector3()
    const size = new THREE.Vector3()
    box.getCenter(center)
    box.getSize(size)
    const scale = 2 / Math.max(size.x, size.y, size.z)
    ref.current.scale.setScalar(scale)
    ref.current.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
  }, [scene])

  const texture = useMemo(() => {
    const canvas = buildCanvas(color, items)
    const tex = new THREE.CanvasTexture(canvas)
    tex.flipY = false
    return tex
  }, [color, items])

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const uv = child.geometry.attributes.uv
        if (uv) {
          let minX = 1, maxX = 0, minY = 1, maxY = 0
          for (let i = 0; i < uv.count; i++) {
            minX = Math.min(minX, uv.getX(i))
            maxX = Math.max(maxX, uv.getX(i))
            minY = Math.min(minY, uv.getY(i))
            maxY = Math.max(maxY, uv.getY(i))
          }
          console.log(`${child.name} UV → x:${minX.toFixed(2)}–${maxX.toFixed(2)} y:${minY.toFixed(2)}–${maxY.toFixed(2)}`)
        }
        child.material = new THREE.MeshStandardMaterial({ map: texture })
        child.material.needsUpdate = true
      }
    })
  }, [texture, scene])

  return <primitive ref={ref} object={scene} />
}

useGLTF.preload('models/tshirt.glb')
