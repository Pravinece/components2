import React from 'react'
import BeeModel from './BeeModel'
import { Canvas } from '@react-three/fiber'
import BeeLight from './BeeLight'

function Bee() {
  return (
    <>
    <div style={{width: '100vw', height: '100vh', position: 'fixed', top: '30%', left: '40%'}}>
        <Canvas>
            <BeeModel />
            <BeeLight />
        </Canvas>
    </div>
    <section className="bee-section" style={{backgroundColor: 'red', width: '100vw', height: '100vh'}}></section>
    <section className="bee-section" style={{backgroundColor: 'blue', width: '100vw', height: '100vh'}}></section> 
    <section className="bee-section" style={{backgroundColor: 'white', width: '100vw', height: '100vh'}}></section>  
    <section className="bee-section" style={{backgroundColor: 'purple', width: '100vw', height: '100vh'}}></section>    
    </>
  )
}

export default Bee