import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function BeeModel() {
  let { scene, animations } = useGLTF("/bee.glb");
  let { actions, names } = useAnimations(animations, scene);
  const ref = useRef();
  const originalMaterials = useRef(new Map())

  let arr = [
    {position: [0,0,0], rotation: [0,1.5,0]},
    {position: [1.5,0,-5], rotation: [0.5,-0.5,0]},
    {position: [1,0,-5], rotation: [0,20,0]},
    {position: [1,0,0], rotation: [0.3,-0.5,0]},
  ]

  useEffect(() => {
    if (!actions || names.length === 0) return;
    const fly = actions[names[0]];
    fly.play();
    fly.weight = 1;
  }, [actions, names])

  useEffect(() => {
    if (!ref.current) return

    ref.current.position.set(...arr[0].position)
    ref.current.rotation.set(...arr[0].rotation)

    const sections = document.querySelectorAll('.bee-section')

    // Load texture
    const loader = new THREE.TextureLoader()
    const newTexture = loader.load('/texture1.jpg')
    newTexture.flipY = false

    // Store original materials
    ref.current.traverse((child) => {
      if (child.isMesh) {
        originalMaterials.current.set(child, child.material.clone())
      }
    })

    const applyTexture = () => {
      ref.current?.traverse((child) => {
        if (child.isMesh) {
          child.material.map = newTexture
          child.material.needsUpdate = true
        }
      })
    }

    const removeTexture = () => {
      ref.current?.traverse((child) => {
        if (child.isMesh) {
          const orig = originalMaterials.current.get(child)
          if (orig) {
            child.material.map = orig.map
            child.material.needsUpdate = true
          }
        }
      })
    }

    const ctx = gsap.context(() => {
      arr.forEach((target, i) => {
        if (i === 0) return

        gsap.to(ref.current.position, {
          x: target.position[0],
          y: target.position[1],
          z: target.position[2],
          scrollTrigger: {
            trigger: sections[i],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        })

        gsap.to(ref.current.rotation, {
          x: target.rotation[0],
          y: target.rotation[1],
          z: target.rotation[2],
          scrollTrigger: {
            trigger: sections[i],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        })
      })

      // Apply texture at section 3
      ScrollTrigger.create({
        trigger: sections[2],
        start: 'top center',
        onEnter: applyTexture,
        onLeaveBack: removeTexture,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <primitive ref={ref} object={scene}></primitive>
  )
}

export default BeeModel