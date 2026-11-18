import { Canvas } from '@react-three/fiber'
import React from 'react'
import { PrAvatar } from '../PrAvatar'
import { Environment, OrbitControls } from '@react-three/drei'

function AnimationModal() {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }} background='/public/models/classroom.jpg'>
            <Environment files="/models/classroom.jpg" background />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
            <PrAvatar />
        </Canvas>
    </div>
  )
}

export default AnimationModal