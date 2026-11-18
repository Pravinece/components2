import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getRollState } from '../math/unrollMath.js';

const MARGIN = 0.45; // empty space above / below the visible content
const MIN_SPAN = 2.6; // never zoom in tighter than this (closed scroll)
const SIDE_ALLOWANCE = 1.3; // paper width + room for the rod finials

/**
 * Frames whatever is currently visible: a close view of the closed scroll that
 * pulls back and travels down as the sheet unrolls.
 */
export default function CameraRig({ paper, progressRef }) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const ready = useRef(false);

  useFrame((_, delta) => {
    const st = getRollState({
      progress: progressRef.current.value,
      height: paper.height,
      coreRadius: paper.coreRadius,
      thickness: paper.thickness,
    });

    const top = MARGIN;
    const bottom = st.bottomY - MARGIN;
    const spanH = Math.max(top - bottom, MIN_SPAN);
    const midY = (top + bottom) / 2;

    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const aspect = size.width / size.height;
    const distV = spanH / 2 / tanHalf;
    const distH = (paper.width + SIDE_ALLOWANCE) / 2 / (tanHalf * aspect);
    const dist = Math.max(distV, distH);

    if (!ready.current) {
      camera.position.set(0, midY, dist);
      ready.current = true;
    } else {
      const k = 5;
      camera.position.y = THREE.MathUtils.damp(camera.position.y, midY, k, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, dist, k, delta);
    }
    camera.lookAt(0, camera.position.y, 0);
  });

  return null;
}
