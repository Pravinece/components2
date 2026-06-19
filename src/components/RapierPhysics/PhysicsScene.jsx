import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Floor from "./Floor";
import Walls from "./Walls";
import Player from "./Player";
import Lights from "./Lights";

export default function PhysicsScene({ glbPath = "/man.glb" }) {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 10, 15], fov: 50 }}>
        <color attach="background" args={["#87ceeb"]} />
        <Lights />
        <Physics gravity={[0, -9.81, 0]} debug>
          <Floor />
          <Walls />
          <Player glbPath={glbPath} />
        </Physics>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
