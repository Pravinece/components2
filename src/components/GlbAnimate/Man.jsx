import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Man() {
  let { scene, animations } = useGLTF("/char.glb");
  let { actions, names } = useAnimations(animations, scene);
  const ref = useRef();
  const progress = useRef({ value: 0 });

  useEffect(() => {
    if (!actions || names.length === 0) return;

    const tpose = actions[names[2]];
    const idle = actions[names[0]];

    tpose.play();
    tpose.weight = 1;
    idle.play();
    idle.weight = 0;

    // const ctx = gsap.context(() => {
    //   gsap.to(progress.current, {
    //     value: 1,
    //     scrollTrigger: {
    //       trigger: document.body,
    //       start: 'top top',
    //       end: '+=300',
    //       scrub: true,
    //       pin: true,
    //     },
    //     onUpdate: () => {
    //       const p = progress.current.value
    //       tpose.weight = 1 - p
    //       idle.weight = p
    //     }
    //   })
    // })

    // return () => ctx.revert()
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=400",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const p = self.progress; // 0 → 1
          tpose.weight = 1 - p;
          idle.weight = p;
        },
      },
    });

    tl.fromTo(
      ref.current.position,
      { x: 0, y: 0, z: 0 },
      { x: 0, y: -3, z: 0, duration: 1 }
    );

    tl.fromTo(ref.current.rotation, { y: 2.8 }, { y: 3.5, duration: 1 }, 0);
    tl.fromTo(ref.current.scale,
      { x: 1, y: 1, z: 1},
      { x: 1, y: 1, z: 1, duration: 1 },
      0
    );

    ref.current.traverse((child) => {
      if (child.isBone) console.log(child.name);
    });

    return () => tl.scrollTrigger?.kill();
  }, [actions, names]);

  return (
    <>
      <primitive
        ref={ref}
        object={scene}
        position={[-4, -7, 0]}
        scale={1}
        rotation={[0, 2.8, 0]}
      />
    </>
  );
}

export default Man;
