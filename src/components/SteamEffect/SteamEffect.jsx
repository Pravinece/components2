import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import VolumetricSteamMesh from './VolumetricSteamMesh'

function Cup() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.45, 1.1, 32]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Rim */}
      <mesh position={[0, 0.58, 0]}>
        <torusGeometry args={[0.55, 0.04, 16, 64]} />
        <meshStandardMaterial color="#444" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.72, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.28, 0.055, 12, 32, Math.PI]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  )
}

export default function SteamEffect() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0d0d0d' }}>
      <Canvas camera={{ position: [0, 1.5, 4.5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 4, 2]} intensity={1.5} color="#aaccff" />
        <pointLight position={[-2, 2, -1]} intensity={0.6} color="#ffddaa" />

        <Cup />
        <VolumetricSteamMesh />

        <OrbitControls enablePan={false} minDistance={2} maxDistance={8} />
      </Canvas>
    </div>
  )
}
