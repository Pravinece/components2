import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import image1 from '../../assets/image-1.png';
import image2 from '../../assets/image-2.png';

export default function PremiumHero() {
  const topImageRef = useRef(null);
  const containerRef = useRef(null);
  const bottomImageRef = useRef(null);
  const glowRef = useRef(null);
  
  // Mask state
  const maskObj = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500,
    alpha: 1,
    size: 200
  }).current;

  // GSAP quickTo for smooth interpolation
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(glowRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power3.out' })
      .fromTo(bottomImageRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.6')
      .fromTo(topImageRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=1');
  }, []);

  useEffect(() => {
    xTo.current = gsap.quickTo(maskObj, 'x', { duration: 0.6, ease: 'power3.out' });
    yTo.current = gsap.quickTo(maskObj, 'y', { duration: 0.6, ease: 'power3.out' });
    
    const updateMask = () => {
      if (topImageRef.current) {
        const { x, y, alpha, size } = maskObj;
        const midAlpha = alpha + (1 - alpha) * 0.4;
        const outerAlpha = alpha + (1 - alpha) * 0.8;
        
        topImageRef.current.style.webkitMaskImage = `radial-gradient(circle ${size}px at ${x}px ${y}px, rgba(0,0,0,${alpha}) 0%, rgba(0,0,0,${midAlpha}) 30%, rgba(0,0,0,${outerAlpha}) 60%, rgba(0,0,0,1) 100%)`;
        topImageRef.current.style.maskImage = `radial-gradient(circle ${size}px at ${x}px ${y}px, rgba(0,0,0,${alpha}) 0%, rgba(0,0,0,${midAlpha}) 30%, rgba(0,0,0,${outerAlpha}) 60%, rgba(0,0,0,1) 100%)`;
      }
    };

    gsap.ticker.add(updateMask);

    return () => {
      gsap.ticker.remove(updateMask);
    };
  }, []);

  const handleMouseMove = (e) => {
    xTo.current(e.clientX);
    yTo.current(e.clientY);
  };

  const handleMouseEnter = () => {
    gsap.to(maskObj, {
      alpha: 0,
      size: 450,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(maskObj, {
      alpha: 1,
      size: 200,
      duration: 1.5,
      ease: 'power3.inOut',
      overwrite: 'auto'
    });
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center cursor-default"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* Background Glows */}
      <div ref={glowRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0" style={{ opacity: 0 }}>
        <div className="w-[70vw] h-[70vh] rounded-full bg-cyan-200/30 mix-blend-multiply blur-[120px] animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute w-[40vw] h-[40vh] rounded-full bg-blue-400/20 mix-blend-multiply blur-[100px] animate-pulse" style={{ animationDuration: '6s' }}></div>
      </div>

      {/* BOTTOM LAYER: Image 2 (Unmasked) */}
      <img 
        ref={bottomImageRef}
        src={image2} 
        alt="Bottom Layer"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-contain pointer-events-none z-10"
        style={{ opacity: 0 }}
      />

      {/* TOP LAYER: Image 1 (Masked) */}
      <img
        ref={topImageRef}
        src={image1}
        alt="Top Layer"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-contain pointer-events-none z-20"
        style={{
          opacity: 0,
          // WebkitMaskImage: `radial-gradient(circle 200px at 50% 50%, black 0%, black 100%)`,
          // maskImage: `radial-gradient(circle 200px at 50% 50%, black 0%, black 100%)`,
          // WebkitMaskRepeat: 'no-repeat',
          // maskRepeat: 'no-repeat'
        }}
      />
    </section>
  );
}
