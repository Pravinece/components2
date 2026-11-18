import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createHardwareMaterial } from '../materials/index.js';
import { getRollState } from '../math/unrollMath.js';
import { CAP_BUILDERS } from './hardwareGeometry.js';

const smooth = THREE.MathUtils.smoothstep;
const AXIS_X = Math.PI / 2; // lathe caps are built along Y, rods lie along X

/** A horizontal rod / tube with a cap at each end. Local origin = rod centre. */
function Rod({ spec, paperWidth, theme }) {
  const rodMat = useMemo(() => createHardwareMaterial(spec.material, theme), [spec.material, theme]);
  const capMat = useMemo(
    () => createHardwareMaterial(spec.capMaterial || spec.material, theme),
    [spec.capMaterial, spec.material, theme],
  );
  const capGeo = useMemo(() => CAP_BUILDERS[spec.cap](spec.radius), [spec.cap, spec.radius]);
  const rodGeo = useMemo(
    () => new THREE.CylinderGeometry(spec.radius, spec.radius, paperWidth + 0.04, 48, 1, false),
    [spec.radius, paperWidth],
  );

  useEffect(
    () => () => {
      rodMat.dispose();
      capMat.dispose();
      capGeo.dispose();
      rodGeo.dispose();
    },
    [rodMat, capMat, capGeo, rodGeo],
  );

  const edge = paperWidth / 2 + 0.02;
  return (
    <group>
      <mesh geometry={rodGeo} material={rodMat} rotation={[0, 0, AXIS_X]} />
      <mesh geometry={capGeo} material={capMat} position={[edge, 0, 0]} rotation={[0, 0, -AXIS_X]} />
      <mesh geometry={capGeo} material={capMat} position={[-edge, 0, 0]} rotation={[0, 0, AXIS_X]} />
    </group>
  );
}

/**
 * Bottom rod rides the roll axis. Top rod hangs at y = 0 and slides into the roll
 * while the scroll is closed so the two don't read as separate objects.
 */
export default function Hardware({ variant, theme, progressRef }) {
  const { paper, top, bottom } = variant;
  const topRef = useRef();
  const bottomRef = useRef();

  useFrame(() => {
    const st = getRollState({
      progress: progressRef.current.value,
      height: paper.height,
      coreRadius: paper.coreRadius,
      thickness: paper.thickness,
    });

    if (bottomRef.current) bottomRef.current.position.set(0, st.centerY, st.centerZ);

    if (topRef.current && top) {
      const open = smooth(st.L, 0.0, 0.9); // 0 closed -> 1 open
      topRef.current.position.set(0, 0, THREE.MathUtils.lerp(st.rJ, -top.radius, open));
    }
  });

  return (
    <>
      {top && (
        <group ref={topRef}>
          <Rod spec={top} paperWidth={paper.width} theme={theme} />
        </group>
      )}
      {bottom && (
        <group ref={bottomRef}>
          <Rod spec={bottom} paperWidth={paper.width} theme={theme} />
        </group>
      )}
    </>
  );
}
