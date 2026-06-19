import { useMemo } from "react";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

// Simple 2D noise using sine waves (no external lib needed)
function noise(x, z) {
  return (
    Math.sin(x * 0.3) * 0.8 +
    Math.cos(z * 0.3) * 0.8 +
    Math.sin(x * 0.7 + z * 0.5) * 0.4
  );
}

export default function Floor({ size = 50, segments = 64 }) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, noise(x, z));
    }

    geo.computeVertexNormals();
    return geo;
  }, [size, segments]);

  return (
    <RigidBody type="fixed" colliders="trimesh" friction={1}>
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial color="#3a7e4f" flatShading />
      </mesh>
    </RigidBody>
  );
}
