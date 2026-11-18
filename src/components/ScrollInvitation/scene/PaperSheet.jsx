import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { createPaperMaterial } from '../materials/index.js';
import { getRollState } from '../math/unrollMath.js';
import { useInvitationTextures } from '../hooks/useInvitationTextures.js';

const WIDTH_SEGMENTS = 24;
const LENGTH_SEGMENTS = 900; // enough vertices to bend smoothly around the roll

/** The printed sheet. All the bending happens in paper.vert.js, driven by uniforms. */
export default function PaperSheet({ variant, theme, data, progressRef }) {
  const { paper } = variant;
  const material = useMemo(() => createPaperMaterial({ theme, paper }), [theme, paper]);
  const textures = useInvitationTextures({ data, theme });

  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    material.uniforms.uMap.value = textures?.map ?? null;
    material.uniforms.uFoil.value = textures?.foil ?? null;
    material.uniforms.uHasMap.value = textures ? 1 : 0;
    material.needsUpdate = true;
  }, [material, textures]);

  useFrame(() => {
    const st = getRollState({
      progress: progressRef.current.value,
      height: paper.height,
      coreRadius: paper.coreRadius,
      thickness: paper.thickness,
    });
    const u = material.uniforms;
    u.uL.value = st.L;
    u.uRj.value = st.rJ;
    u.uK.value = st.k;
  });

  return (
    <mesh material={material} frustumCulled={false}>
      <planeGeometry args={[paper.width, paper.height, WIDTH_SEGMENTS, LENGTH_SEGMENTS]} />
    </mesh>
  );
}
