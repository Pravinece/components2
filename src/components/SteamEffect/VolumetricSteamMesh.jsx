import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 80

// Soft white circle texture
function makeCircleTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0,   'rgba(255,255,255,1)')
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.6)')
  gradient.addColorStop(1,   'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

function randomParticle(i) {
  const angle = Math.random() * Math.PI * 2
  const r     = Math.random() * 0.35
  return {
    x:        Math.cos(angle) * r,
    z:        Math.sin(angle) * r,
    y:        0,
    life:     Math.random(),                  // current life 0–1
    speed:    0.12 + Math.random() * 0.10,    // rise speed
    driftX:   (Math.random() - 0.5) * 0.04,  // gentle horizontal drift
    driftZ:   (Math.random() - 0.5) * 0.04,
    size:     0.18 + Math.random() * 0.22,    // base size
    delay:    Math.random(),                  // stagger spawn
  }
}

export default function VolumetricSteamMesh() {
  const ref      = useRef()
  const texture  = useMemo(() => makeCircleTexture(), [])

  // Per-particle state stored in refs (not state, to avoid re-renders)
  const particles = useMemo(() => Array.from({ length: PARTICLE_COUNT }, (_, i) => randomParticle(i)), [])

  const positions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), [])
  const alphas    = useMemo(() => new Float32Array(PARTICLE_COUNT),     [])
  const sizes     = useMemo(() => new Float32Array(PARTICLE_COUNT),     [])

  useFrame((_, delta) => {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i]

      // Stagger: don't start until delay has passed
      if (p.delay > 0) { p.delay -= delta; continue }

      p.life += delta * p.speed

      if (p.life >= 1) {
        // Respawn
        Object.assign(p, randomParticle(i))
        p.life  = 0
        p.delay = 0
      }

      // Rise height: 0 → 2.2 units above cup rim
      const height = p.life * 2.2

      // Drift widens as it rises (expansion)
      p.x += p.driftX * delta
      p.z += p.driftZ * delta

      positions[i * 3]     = p.x
      positions[i * 3 + 1] = 0.6 + height   // 0.6 = cup rim height
      positions[i * 3 + 2] = p.z

      // Alpha: fade in quickly, hold, then fade out slowly
      const fadeIn  = smoothstep(0, 0.15, p.life)
      const fadeOut = 1 - smoothstep(0.5, 1.0, p.life)
      alphas[i] = fadeIn * fadeOut * 0.75

      // Size grows as it rises (fog expands)
      sizes[i] = (p.size + p.life * 0.6) * 120
    }

    if (ref.current) {
      ref.current.geometry.attributes.position.needsUpdate = true
      ref.current.geometry.attributes.alpha.needsUpdate    = true
      ref.current.geometry.attributes.size.needsUpdate     = true
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-alpha"    args={[alphas,    1]} />
        <bufferAttribute attach="attributes-size"     args={[sizes,     1]} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        uniforms={{ uTexture: { value: texture } }}
        vertexShader={/* glsl */`
          attribute float alpha;
          attribute float size;
          varying float vAlpha;
          void main() {
            vAlpha = alpha;
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (1.0 / -mvPos.z);
            gl_Position  = projectionMatrix * mvPos;
          }
        `}
        fragmentShader={/* glsl */`
          uniform sampler2D uTexture;
          varying float vAlpha;
          void main() {
            vec4 tex = texture2D(uTexture, gl_PointCoord);
            gl_FragColor = vec4(1.0, 1.0, 1.0, tex.a * vAlpha);
          }
        `}
      />
    </points>
  )
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}
