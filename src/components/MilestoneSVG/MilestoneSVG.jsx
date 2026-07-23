import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MilestoneSVG.module.css";
import { Background } from "./Background";

gsap.registerPlugin(ScrollTrigger);

const LINE_NB_POINTS = 12000;

const CURVE_POINTS = [
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
];

const MILESTONES = [
  { t: 0.15, year: "2020", title: "Started Coding",  desc: "Wrote my first Hello World in Python." },
  { t: 0.32, year: "2021", title: "First Project",   desc: "Built a full-stack web app with React & Node." },
  { t: 0.5,  year: "2022", title: "Freelancing",     desc: "Delivered 10+ client projects independently." },
  { t: 0.67, year: "2023", title: "Open Source",     desc: "Contributed to 3 open source repositories." },
  { t: 0.85, year: "2024", title: "Current Role",    desc: "Working as a frontend engineer on 3D web experiences." },
];

function Scene({ scrollProgress }) {
  const cameraGroup = useRef();
  const airplane = useRef();

  const curve = useMemo(() => new THREE.CatmullRomCurve3(CURVE_POINTS, false, "catmullrom", 0.5),[]);
  const linePoints = useMemo(() => curve.getPoints(LINE_NB_POINTS), [curve]);

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, -0.08);
    s.lineTo(0, 0.08);
    return s;
  }, []);

  useFrame((_state, delta) => {
    const idx = Math.min(
        Math.round(scrollProgress.current * linePoints.length),
        linePoints.length - 1
    );
    const curPoint   = linePoints[idx];
    const nextPoint  = linePoints[Math.min(idx + 1, linePoints.length - 1)];
    const xDisplace  = (nextPoint.x - curPoint.x) * 80;
    const angle      = (xDisplace < 0 ? 1 : -1) * Math.min(Math.abs(xDisplace), Math.PI / 3);

    airplane.current.quaternion.slerp(
      new THREE.Quaternion().setFromEuler(
        new THREE.Euler(airplane.current.rotation.x, airplane.current.rotation.y, angle)
      ), delta * 2
    );
    cameraGroup.current.quaternion.slerp(
      new THREE.Quaternion().setFromEuler(
        new THREE.Euler(cameraGroup.current.rotation.x, angle, cameraGroup.current.rotation.z)
      ), delta * 2
    );
    cameraGroup.current.position.lerp(curPoint, delta * 24);
  });

  return (
    <>
      <group ref={cameraGroup}>
        <Background />
        <PerspectiveCamera position={[0, 1, 2]} fov={30} makeDefault />
        <group ref={airplane}>
          <mesh>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </group>
      </group>

      {/* Path tube */}
      <mesh>
        <extrudeGeometry
          args={[shape, { steps: LINE_NB_POINTS, bevelEnabled: false, extrudePath: curve }]}
        />
        <meshStandardMaterial color="white" opacity={1} />
      </mesh>

      {/* Cards fixed in 3D world space — camera flies past them */}
      {MILESTONES.map((m, i) => {
        const pos = curve.getPoint(m.t);
        return (
          <Html
            key={i}
            position={[pos.x + 2, pos.y + 0.5, pos.z]}
            center
            distanceFactor={8}
            style={{ pointerEvents: "none" }}
          >
            <div className={styles.card}>
              <span className={styles.year}>{m.year}</span>
              <h3 className={styles.cardTitle}>{m.title}</h3>
              <p className={styles.cardDesc}>{m.desc}</p>
            </div>
          </Html>
        );
      })}
    </>
  );
}

export default function MilestoneSVG() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    // Tall spacer div drives the scroll — canvas is fixed
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => { scrollProgress.current = self.progress; },
    });
    return () => trigger.kill();
  }, []);

  return (
    <>
      {/* Tall page so the browser has something to scroll */}
      <div className={styles.scrollSpace} />

      {/* Canvas fixed to viewport — never moves with scroll */}
      <div className={styles.canvasFixed}>
        <Canvas gl={{ antialias: true }}>
          <color attach="background" args={["#05050f"]} />
          <Scene scrollProgress={scrollProgress} />
          {/* <OrbitControls enableZoom={true} enablePan={true} /> */}
        </Canvas>
      </div>
    </>
  );
}
