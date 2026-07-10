import React, { useRef, useState } from 'react'
import styles from './DayLightEffect.module.css'
import { Canvas, useThree } from '@react-three/fiber'
import Room from './Room'
import { Environment, OrbitControls, useHelper } from '@react-three/drei'
import { DirectionalLightHelper } from 'three'

function ExposureControl({ exposure }) {
  const { gl } = useThree()
//   gl.toneMappingExposure = exposure
  return null
}

function DirLight({ intensity }) {
  const lightRef = useRef()
  useHelper(lightRef, DirectionalLightHelper, 1, 'red')
  return (
    <directionalLight
      ref={lightRef}
      position={[6, 1.5, 1]}
      target-position={[-2, 0.5, 0]}
      intensity={intensity}
    //   color="#ff7b00"
    //   color="#ff5500"
      color="#f57e07"
      castShadow
      shadow-mapSize={[1024, 1024]}
      shadow-camera-left={-5}
      shadow-camera-right={5}
      shadow-camera-top={5}
      shadow-camera-bottom={-5}
      shadow-camera-near={0.1}
      shadow-camera-far={20}
    />
  )
}

function DayLightEffect() {
  const [exposure, setExposure] = useState(1)

  return (
    <div className={styles.container}>
        <input
          type="range"
          min="0"
          max="3"
          step="0.01"
          value={exposure}
          onChange={(e) => setExposure(parseFloat(e.target.value))}
          className={styles.slider}
        />
        <Canvas className={styles.canvas} camera={{position:[0,0,5]}} shadows>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            <ambientLight intensity={1.5} />
            <Environment files='/sky.hdr' background />
            {/* <ExposureControl exposure={exposure} /> */}
            <DirLight intensity={exposure} />
            <Room />
        </Canvas>
    </div>
  )
}

export default DayLightEffect