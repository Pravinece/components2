import { RigidBody } from "@react-three/rapier";

function Wall({ position, rotation = [0, 0, 0], size = [50, 4, 0.5] }) {
  return (
    <RigidBody type="fixed" friction={1}>
      <mesh position={position} rotation={rotation} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#8b5e3c" />
      </mesh>
    </RigidBody>
  );
}

export default function Walls() {
  return (
    <>
      <Wall position={[0, 2, -25]} />
      <Wall position={[0, 2, 25]} />
      <Wall position={[-25, 2, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Wall position={[25, 2, 0]} rotation={[0, Math.PI / 2, 0]} />
    </>
  );
}
