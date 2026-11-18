import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CameraRig from './CameraRig.jsx';
import Wall from './Wall.jsx';
import PaperSheet from './PaperSheet.jsx';
import Hardware from './Hardware.jsx';

/** Everything inside <Canvas>. The paper + rods share one group that sways with the pointer. */
export default function ScrollScene({ variant, theme, data, progressRef }) {
  const sway = useRef();

  useFrame((state, delta) => {
    if (!sway.current) return;
    const { x, y } = state.pointer;
    const g = sway.current;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, x * 0.16, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -y * 0.05, 3, delta);
  });

  return (
    <>
      <CameraRig paper={variant.paper} progressRef={progressRef} />
      <Wall theme={theme} paper={variant.paper} progressRef={progressRef} />
      {/* pivot near the middle of the sheet so the sway feels natural */}
      <group ref={sway} position={[0, -variant.paper.height * 0.35, 0]}>
        <group position={[0, variant.paper.height * 0.35, 0]}>
          <PaperSheet variant={variant} theme={theme} data={data} progressRef={progressRef} />
          <Hardware variant={variant} theme={theme} progressRef={progressRef} />
        </group>
      </group>
    </>
  );
}
