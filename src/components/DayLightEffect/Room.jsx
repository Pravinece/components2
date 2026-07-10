import { useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

function Room() {
    let { scene, animations } = useGLTF("/room.glb")
    let { actions, names } = useAnimations(animations, scene)

    useEffect(() => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }, [scene])

  return (
    <primitive object={scene} position={[0,-1,2]} />
  )
}

export default Room