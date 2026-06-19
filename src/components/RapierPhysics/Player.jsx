import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";

const SPEED = 4;

function useKeyboard() {
  const keys = useRef({});

  useEffect(() => {
    const down = (e) => (keys.current[e.code] = true);
    const up = (e) => (keys.current[e.code] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return keys;
}

export default function Player({ glbPath = "/man.glb" }) {
  const rigidRef = useRef();
  const modelRef = useRef();
  const keys = useKeyboard();
  const [moving, setMoving] = useState(false);

  const { scene, animations } = useGLTF(glbPath);
  const { actions, names } = useAnimations(animations, modelRef);

  // Play idle or walk animation based on movement
  useEffect(() => {
    if (!names.length) return;
    // Try to find walk/idle animations by name
    const walkName = names.find((n) => /walk|run/i.test(n));
    const idleName = names.find((n) => /idle|stand/i.test(n)) || names[0];
    const target = moving ? walkName || idleName : idleName;

    const action = actions[target];
    if (action) {
      action.reset().fadeIn(0.2).play();
      return () => action.fadeOut(0.2);
    }
  }, [moving, actions, names]);

  const direction = new THREE.Vector3();

  useFrame(() => {
    if (!rigidRef.current) return;

    const { KeyW, KeyA, KeyS, KeyD } = keys.current;
    direction.set(0, 0, 0);

    if (KeyW) direction.z -= 1;
    if (KeyS) direction.z += 1;
    if (KeyA) direction.x -= 1;
    if (KeyD) direction.x += 1;

    const isMoving = direction.length() > 0;
    setMoving(isMoving);

    if (isMoving) {
      direction.normalize();

      // Rotate model to face movement direction
      const angle = Math.atan2(direction.x, direction.z);
      if (modelRef.current) {
        modelRef.current.rotation.y = angle;
      }

      // Apply impulse so physics can push player up slopes
      rigidRef.current.applyImpulse(
        { x: direction.x * SPEED * 0.1, y: 0, z: direction.z * SPEED * 0.1 },
        true
      );

      // Clamp horizontal speed
      const vel = rigidRef.current.linvel();
      const hSpeed = Math.sqrt(vel.x ** 2 + vel.z ** 2);
      if (hSpeed > SPEED) {
        const scale = SPEED / hSpeed;
        rigidRef.current.setLinvel(
          { x: vel.x * scale, y: vel.y, z: vel.z * scale },
          true
        );
      }
    } else {
      // Stop horizontal movement
      const currentVel = rigidRef.current.linvel();
      rigidRef.current.setLinvel({ x: 0, y: currentVel.y, z: 0 }, true);
    }
  });

  return (
    <RigidBody
      ref={rigidRef}
      position={[0, 5, 0]}
      enabledRotations={[false, false, false]}
      colliders={false}
      mass={1}
      friction={1}
      linearDamping={5}
    >
      <CapsuleCollider args={[0.5, 0.3]} position={[0, 0.8, 0]} />
      <group ref={modelRef}>
        <primitive object={scene} scale={1} />
      </group>
    </RigidBody>
  );
}
