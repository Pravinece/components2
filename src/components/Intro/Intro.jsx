import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Avatar } from './Avatar'

function Intro() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 5, 2]} intensity={1.5} />
        <Avatar />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default Intro