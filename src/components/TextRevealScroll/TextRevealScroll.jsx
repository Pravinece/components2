import { useEffect, useRef } from 'react';
import styles from './TextRevealScroll.module.css';

function RevealLine({ children, className = '', delay = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
        }
      },
      { threshold: 0.2, rootMargin: '-100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.revealBlock}>
      <span ref={ref} className={`${styles.line} ${className} ${delay}`}>
        {children}
      </span>
    </div>
  );
}

export default function TextRevealScroll() {
  return (
    <div className={styles.section}>
      <div>
        <RevealLine className={styles.heading} delay={styles.delay1}>
          Design that
        </RevealLine>
        <RevealLine className={styles.heading} delay={styles.delay2}>
          <span className={styles.highlight}>speaks</span> for itself.
        </RevealLine>
      </div>

      <RevealLine className={styles.subHeading} delay={styles.delay1}>
        Scroll-triggered text animations.
      </RevealLine>

      <RevealLine className={styles.body} delay={styles.delay2}>
        Each line slides up from beneath its container as you scroll — a classic editorial technique that creates
        momentum and rhythm across your page.
      </RevealLine>

      <RevealLine className={styles.body} delay={styles.delay3}>
        Built using the <strong>IntersectionObserver API</strong> — no GSAP required for this one.
        Pure CSS transitions with staggered delays.
      </RevealLine>
    </div>
  );
}
