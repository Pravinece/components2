import { useCallback, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import ScrollScene from './scene/ScrollScene.jsx';
import { useUnrollScroll } from './hooks/useUnrollScroll.js';
import { VARIANTS, DEFAULT_VARIANT } from './config/variants.js';
import { THEMES } from './config/themes.js';
import { sampleInvitation } from './data/sampleInvitation.js';
import styles from './ScrollInvitation.module.css';

/**
 * <ScrollInvitation />
 *
 * Props
 *  variant       'farman' | 'rolled' | 'tube'           (default 'farman')
 *  data          invitation content, see data/sampleInvitation.js
 *  scrollLength  how many viewport-heights the pinned unroll lasts   (default 3)
 *  scrub         seconds of smoothing between scroll and the roll    (default 1)
 *  showHint      show the "scroll to unroll" label                   (default true)
 */
export default function ScrollInvitation({
  variant = DEFAULT_VARIANT,
  data = sampleInvitation,
  scrollLength = 3,
  scrub = 1,
  showHint = true,
  className = '',
}) {
  const stageRef = useRef(null);
  const barRef = useRef(null);
  const hintRef = useRef(null);

  const config = VARIANTS[variant] ?? VARIANTS[DEFAULT_VARIANT];
  const theme = THEMES[config.theme];

  // DOM-only progress UI: no React re-render while scrolling
  const onProgress = useCallback((v) => {
    if (barRef.current) barRef.current.style.transform = `scaleY(${v})`;
    if (hintRef.current) hintRef.current.hidden = v > 0.02;
  }, []);

  const progressRef = useUnrollScroll({ stageRef, scrollLength, scrub, onProgress });

  const camera = useMemo(() => ({ fov: 32, near: 0.1, far: 100, position: [0, -0.5, 12] }), []);

  return (
    <section className={`${styles.root} ${className}`}>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.canvasWrap}>
          <Canvas flat dpr={[1, 2]} camera={camera} gl={{ antialias: true }}>
            <ScrollScene variant={config} theme={theme} data={data} progressRef={progressRef} />
          </Canvas>
        </div>

        {showHint && (
          <p ref={hintRef} className={styles.hint}>
            Scroll to unroll
          </p>
        )}
        <div className={styles.track} aria-hidden="true">
          <span ref={barRef} className={styles.bar} />
        </div>
      </div>
    </section>
  );
}
