import { Environment, Sphere } from "@react-three/drei";

import * as THREE from "three";

export const Background = () => {
  return (
    <>
      <Environment preset="sunset" />
      <mesh scale={[100, 100, 100]}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          side={THREE.BackSide}
          uniforms={{
            colorA: { value: new THREE.Color('#357ca1') },
            colorB: { value: new THREE.Color('#ffffff') },
          }}
          vertexShader={/* glsl */`
            varying vec3 vPos;
            void main() {
              vPos = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={/* glsl */`
            uniform vec3 colorA;
            uniform vec3 colorB;
            varying vec3 vPos;
            void main() {
              float t = clamp((vPos.y + 1.0) / 2.0, 0.0, 1.0);
              gl_FragColor = vec4(mix(colorB, colorA, t), 1.0);
            }
          `}
        />
      </mesh>
    </>
  );
};
