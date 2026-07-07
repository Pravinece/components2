import { useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Branch() {
  const { scene, animations } = useGLTF('/branch.glb')
  const { actions, names } = useAnimations(animations, scene)
  const ref = useRef()

  useEffect(() => {
    if (!actions || names.length === 0) return

    const sections = document.querySelectorAll('.bee-section')
    const windAnim = actions[names[0]] // wind/sway animation

    // Don't autoplay — start paused
    windAnim.play()
    windAnim.paused = true

    // When bee reaches section 3 (index 2), play the wind animation
    ScrollTrigger.create({
      trigger: sections[2], // 3rd section (blue)
      start: 'top center',
      onEnter: () => {
        windAnim.paused = false
        windAnim.fadeIn(0.5)
      },
      onLeaveBack: () => {
        windAnim.fadeOut(0.5)
      },
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [actions, names])

  return (
    <primitive
      ref={ref}
      object={scene}
      // Position the branch where the bee lands in section 3
      // Match this with arr[2] in BeeModel.jsx: position: [1, 0, -5]
      position={[1, -0.5, -5]}
      scale={1}
    />
  )
}

export default Branch
