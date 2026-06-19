import React, { useEffect } from 'react'
import styles from './GlbAnimate.module.css'
import { OrbitControls, useAnimations } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Man from './Man'

function GlbAnimate() {
  // load texture and apply to all meshes in the model
  // useEffect(() => { 
  //   const loader = new THREE.TextureLoader()
  //   const texture = loader.load('/myTexture.jpg')
  //   texture.flipY = false // GLB models usually need this

  //   ref.current.traverse((child) => {
  //     if (child.isMesh) {
  //       child.material.map = texture
  //       child.material.needsUpdate = true
  //     }
  //   })
  // }, [])

  // Replace with a completely new material
  // ref.current.traverse((child) => {
  //   if (child.isMesh) {
  //     child.material = new THREE.MeshStandardMaterial({
  //       map: texture,          // color texture
  //       normalMap: normalTex,  // bumps/detail
  //       roughness: 0.5,
  //       metalness: 0.2,
  //     })
  //   }
  // })

  // Change color only (no texture file needed)
  // ref.current.traverse((child) => {
  //   if (child.isMesh) {
  //     child.material.color = new THREE.Color('#ff0000')
  //   }
  // })
  
  return (
    <div className={styles.container}>
        <div className={styles.canva}>
            <Canvas>
                <Man />
                <OrbitControls enablePan={false} enableZoom={false} enableRotate={true}/>
                <ambientLight intensity={1} />
            </Canvas>
        </div>
    </div>
  )
}

export default GlbAnimate