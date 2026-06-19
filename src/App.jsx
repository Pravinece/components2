import styles from './App.module.css';

// Glassmorphism
import GlassCard from './components/Glassmorphism/GlassCard';
import GlassInput from './components/Glassmorphism/GlassInput';
import GlassButton from './components/Glassmorphism/GlassButton';

// Claymorphism
import ClayCard from './components/Claymorphism/ClayCard';
import ClayInput from './components/Claymorphism/ClayInput';
import ClayButton from './components/Claymorphism/ClayButton';

// Skeuomorphism
import SkeuCard from './components/Skeuomorphism/SkeuCard';
import SkeuInput from './components/Skeuomorphism/SkeuInput';
import SkeuButton from './components/Skeuomorphism/SkeuButton';

// Liquid UI
import LiquidCard from './components/LiquidUI/LiquidCard';
import LiquidInput from './components/LiquidUI/LiquidInput';
import LiquidButton from './components/LiquidUI/LiquidButton';

// Scroll effects
import TextRevealScroll from './components/TextRevealScroll/TextRevealScroll';

export default function App() {
  return (
    <div className={styles.app}>

      {/* GLASSMORPHISM */}
      <section className={styles.section}>
        <div className={styles.glassBg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.orb3} />
        </div>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>01</span>
            <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Glassmorphism</h2>
            <p className={styles.sectionDesc} style={{ color: 'rgba(255,255,255,0.6)' }}>
              Frosted glass using backdrop-filter blur, semi-transparent backgrounds, and subtle border highlights.
            </p>
          </div>
          <div className={styles.componentRow}>
            <GlassCard />
            <div className={styles.inputGroup}>
              <GlassInput label="Email" placeholder="you@example.com" icon="✉️" />
              <GlassInput label="Password" placeholder="••••••••" icon="🔒" type="password" />
            </div>
            <div className={styles.btnGroup}>
              <GlassButton>Get Started</GlassButton>
              <GlassButton>Learn More</GlassButton>
            </div>
          </div>
        </div>
      </section>

      {/* CLAYMORPHISM */}
      <section className={styles.section}>
        <div className={styles.clayBg} />
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill} style={{ background: '#ede7f6', color: '#7c4dff' }}>02</span>
            <h2 className={styles.sectionTitle} style={{ color: '#2d1b69' }}>Claymorphism</h2>
            <p className={styles.sectionDesc} style={{ color: '#7b68b5' }}>
              Inflated 3D look with thick bottom shadows, rounded corners, and spring-like press feedback.
            </p>
          </div>
          <div className={styles.componentRow}>
            <ClayCard />
            <ClayCard icon="🚀" title="Fast Launch" desc="Ship your product in record time with our clay design system." tag="Popular" />
            <div className={styles.inputGroup}>
              <ClayInput label="Your Name" placeholder="Enter name..." />
              <ClayInput label="Email" placeholder="hello@clay.io" />
            </div>
            <div className={styles.btnGroup}>
              <ClayButton>Go!</ClayButton>
              <ClayButton variant="secondary">Cancel</ClayButton>
            </div>
          </div>
        </div>
      </section>

      {/* SKEUOMORPHISM */}
      <section className={styles.section}>
        <div className={styles.skeuBg} />
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill} style={{ background: '#f5e6c0', color: '#5c3a00' }}>03</span>
            <h2 className={styles.sectionTitle} style={{ color: '#3a3028', fontFamily: 'Georgia, serif' }}>Skeuomorphism</h2>
            <p className={styles.sectionDesc} style={{ color: '#6b5f52' }}>
              Real-world textures and physical depth — inset shadows, leather grains, embossed buttons.
            </p>
          </div>
          <div className={styles.componentRow}>
            <SkeuCard />
            <div className={styles.inputGroup}>
              <SkeuInput label="Full Name" placeholder="John Doe..." />
              <SkeuInput label="Message" placeholder="Your message..." />
            </div>
            <div className={styles.btnGroup}>
              <SkeuButton>Confirm</SkeuButton>
              <SkeuButton variant="danger">Delete</SkeuButton>
            </div>
          </div>
        </div>
      </section>

      {/* LIQUID UI */}
      <section className={styles.section}>
        <div className={styles.liquidBg}>
          <div className={styles.liqOrb1} />
          <div className={styles.liqOrb2} />
        </div>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill} style={{ background: '#e0f0ff', color: '#0077ff' }}>04</span>
            <h2 className={styles.sectionTitle} style={{ color: '#003080' }}>Liquid UI</h2>
            <p className={styles.sectionDesc} style={{ color: '#4488cc' }}>
              Organic morphing shapes, fluid hover transitions, and animated blob backgrounds.
            </p>
          </div>
          <div className={styles.componentRow}>
            <LiquidCard />
            <div className={styles.inputGroup}>
              <LiquidInput label="Search" placeholder="Type to ripple..." />
              <LiquidInput label="Email" placeholder="you@liquid.io" />
            </div>
            <div className={styles.btnGroup}>
              <LiquidButton>Dive In</LiquidButton>
              <LiquidButton>Explore</LiquidButton>
            </div>
          </div>
        </div>
      </section>

      {/* TEXT REVEAL SCROLL */}
      <section style={{ background: '#fafafa' }}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill} style={{ background: '#f0f0f0', color: '#333' }}>05</span>
            <h2 className={styles.sectionTitle} style={{ color: '#111' }}>Text Reveal on Scroll</h2>
            <p className={styles.sectionDesc} style={{ color: '#888' }}>
              Lines clip-reveal upward as they enter the viewport using IntersectionObserver + CSS transitions.
            </p>
          </div>
        </div>
        <TextRevealScroll />
      </section>

      {/* GSAP MARQUEE */}
      <section>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill} style={{ background: '#111', color: '#fff' }}>06</span>
            <h2 className={styles.sectionTitle} style={{ color: '#111' }}>GSAP Marquee Scroll</h2>
            <p className={styles.sectionDesc} style={{ color: '#888' }}>
              Infinite horizontal marquee rows powered by GSAP tweens — alternating directions, variable speeds.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
