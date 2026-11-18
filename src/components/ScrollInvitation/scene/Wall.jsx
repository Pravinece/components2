import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { createWallMaterial } from '../materials/index.js';
import { getRollState } from '../math/unrollMath.js';

/** Backdrop with the paper's soft shadow. The shadow rect follows the roll. */
export default function Wall({ theme, paper, progressRef }) {
  const material = useMemo(() => createWallMaterial(theme), [theme]);
  useEffect(() => () => material.dispose(), [material]);

  useFrame(() => {
    const st = getRollState({
      progress: progressRef.current.value,
      height: paper.height,
      coreRadius: paper.coreRadius,
      thickness: paper.thickness,
    });
    material.uniforms.uRect.value.set(-paper.width / 2, paper.width / 2, st.bottomY, 0.05);
  });

  return (
    <mesh position={[0, 0, -1.2]} material={material} renderOrder={-1}>
      <planeGeometry args={[80, 80]} />
    </mesh>
  );
}
