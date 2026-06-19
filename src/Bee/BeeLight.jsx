import React from 'react'

function BeeLight() {
  return (
    <>
    <ambientLight color={0xffffff} intensity={1} />
    <directionalLight color={0xffffff} intensity={1} position={[50, 50, 50]} />
    </>
  )
}

export default BeeLight