import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Html,
  OrbitControls,
  PerspectiveCamera,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MilestoneSVG.module.css";
import { Background } from "./Background";

gsap.registerPlugin(ScrollTrigger);
const LINE_NB_POINTS = 12000;

const MILESTONES = [
  {
    t: 0.15,
    year: "2020",
    title: "Started Coding",
    desc: "Wrote my first Hello World in Python.",
  },
  {
    t: 0.32,
    year: "2021",
    title: "First Project",
    desc: "Built a full-stack web app with React & Node.",
  },
  {
    t: 0.5,
    year: "2022",
    title: "Freelancing",
    desc: "Delivered 10+ client projects independently.",
  },
  {
    t: 0.67,
    year: "2023",
    title: "Open Source",
    desc: "Contributed to 3 open source repositories.",
  },
  {
    t: 0.85,
    year: "2024",
    title: "Current Role",
    desc: "Working as a frontend engineer on 3D web experiences.",
  },
];

// Build a vertical S-curve path in 3D
function buildCurve() {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(2, 10, 0),
    new THREE.Vector3(-2, 6, 2),
    new THREE.Vector3(2, 2, -2),
    new THREE.Vector3(-2, -2, 2),
    new THREE.Vector3(2, -6, -2),
    new THREE.Vector3(-2, -10, 0),
  ]);
}

const curve = buildCurve();
const tubeSegments = 200;


function Scene() {
  const cameraGroup = useRef();
  const airplane = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -10),
        new THREE.Vector3(-2, 0, -20),
        new THREE.Vector3(-3, 0, -30),
        new THREE.Vector3(0, 0, -40),
        new THREE.Vector3(5, 0, -50),
        new THREE.Vector3(7, 0, -60),
        new THREE.Vector3(5, 0, -70),
        new THREE.Vector3(0, 0, -80),
        new THREE.Vector3(0, 0, -90),
        new THREE.Vector3(0, 0, -100),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape;
  }, [curve]);

  return (
    <>
      <group ref={cameraGroup}>
        <Background />
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        <group ref={airplane}>
        </group>
      </group>

      <group position-y={-2}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial color={"white"} opacity={0.7} transparent />
        </mesh>
      </group>

      {MILESTONES.map((m, i) => {
        const pos = curve.getPoint(m.t)
        const isVisible = visibleRef.current[i]
        return (
          <group key={i} position={pos}>
            <MilestoneDot position={[0, 0, 0]} visible={isVisible} />
            {isVisible && (
              <Html
                center
                distanceFactor={6}
                position={[0.6, 0, 0]}
                style={{ pointerEvents: 'none' }}
              >
                <div className={styles.card}>
                  <span className={styles.year}>{m.year}</span>
                  <h3 className={styles.cardTitle}>{m.title}</h3>
                  <p className={styles.cardDesc}>{m.desc}</p>
                </div>
              </Html>
            )}
          </group>
        )
      })}
    </>
  );
}

export default function MilestoneSVG() {
  const wrapperRef = useRef();

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.sticky}>
        <Canvas
          camera={{ position: [2, 10, 0], fov: 60 }}
          gl={{ antialias: true }}
        >
          <OrbitControls enableZoom={true} enablePan={true} />
          <color attach="background" args={["#ececec"]} />
          <ScrollControls pages={5} damping={4}>
            <Scene />
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}
