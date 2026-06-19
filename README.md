# React UI Components Collection

A collection of creative React UI components built with Vite, featuring animations, 3D scenes, and various design system styles.

## Getting Started

```bash
npm install
npm run dev
```

## Components

### 3D & Physics

| Component | Path | Description |
|-----------|------|-------------|
| **RapierPhysics** | `src/components/RapierPhysics/` | 3D physics scene with player, floor, walls, and lighting using Rapier physics engine |
| **GlbAnimate** | `src/components/GlbAnimate/` | Animated 3D GLB model viewer |
| **ThreeJs Scene** | `src/components/ThreeJs/` | Three.js 3D scene |
| **Canvas** | `src/components/Canvas/` | Custom canvas-based rendering |
| **3JsHoverTransition** | `src/components/3JsHoverTransition/` | Three.js shader-based hover transition effect |
| **Bee** | `src/Bee/` | 3D Bee model with lighting |

### Animations & Effects

| Component | Path | Description |
|-----------|------|-------------|
| **TextAnim** | `src/components/TextAnim/` | Text animation effects |
| **TextRevealScroll** | `src/components/TextRevealScroll/` | Scroll-triggered text reveal animation |
| **SVGSplit** | `src/components/SVGSplit/` | SVG split/morph animation |
| **ClipPath** | `src/components/ClipPath/` | CSS clip-path based animations |
| **SplitImage** | `src/components/SplitImage.jsx` | Image split effect |
| **CssHoverTransition** | `src/components/CssHoverTransition/` | Premium hero section with CSS hover transitions |

### Design Systems (UI Kits)

Each design system includes **Button**, **Card**, and **Input** components:

| Style | Path | Description |
|-------|------|-------------|
| **Glassmorphism** | `src/components/Glassmorphism/` | Frosted glass effect UI elements |
| **Claymorphism** | `src/components/Claymorphism/` | Soft, clay-like 3D UI elements |
| **Skeuomorphism** | `src/components/Skeuomorphism/` | Realistic, tactile UI elements |
| **LiquidUI** | `src/components/LiquidUI/` | Fluid, liquid-motion UI elements |

### Cards & Layout

| Component | Path | Description |
|-----------|------|-------------|
| **CardList** | `src/components/CardList.jsx` | Card list layout |
| **CardSplit** | `src/CardSplit.jsx` | Split card design |

## Usage

Uncomment the desired component in `src/main.jsx` to render it:

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SVGSplit />
  </StrictMode>,
)
```

## Tech Stack

- React + Vite
- Three.js / React Three Fiber
- Rapier Physics
- CSS Modules
- GSAP (animations)
