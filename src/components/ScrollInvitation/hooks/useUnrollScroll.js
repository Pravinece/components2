import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * One pinned unroll.
 *
 * Pins `stageRef` for `scrollLength` viewport-heights of scrolling and scrubs a single
 * value 0 -> 1 while it is pinned. Scrolling down unrolls the sheet, scrolling up rolls
 * it back. The value lives in a ref (not state) so React never re-renders per frame;
 * the R3F scene reads `progress.current.value` inside useFrame.
 */
export function useUnrollScroll({ stageRef, scrollLength = 3, scrub = 1, onProgress }) {
  const progress = useRef({ value: 0 });

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progress.current,
        { value: 0 },
        {
          value: 1,
          ease: 'power1.inOut',
          onUpdate: () => onProgress?.(progress.current.value),
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${window.innerHeight * scrollLength}`,
            pin: true,
            scrub,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    }, stage);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageRef, scrollLength, scrub]);

  return progress;
}
