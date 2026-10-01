import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import styles from "./PageTransition.module.css";

gsap.registerPlugin(DrawSVGPlugin);

function PageTransition() {
  const pathRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // leave: draw stroke in
    tl.fromTo(
      pathRef.current,
      { drawSVG: "0%", strokeWidth: 2 },
      { drawSVG: "100%", strokeWidth: 300, duration: 1 }
    )
    // enter: wipe stroke out
    .to(pathRef.current, { drawSVG: "100% 100%", strokeWidth: 2, duration: 1 })
    // reset
    .set(pathRef.current, { drawSVG: "0%", strokeWidth: 2 });
  }, []);

  return (
    <div>
      <div className={styles["div-svg"]}>
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d="M-100 450 C 300 100, 700 800, 1100 450 C 1300 250, 1500 600, 1600 450"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}

export default PageTransition;
