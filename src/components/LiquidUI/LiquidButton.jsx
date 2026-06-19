import { useState } from 'react';
import styles from './LiquidButton.module.css';

export default function LiquidButton({ children = 'Dive In 🌊', onClick }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();
    setRipples(r => [...r, { id, x, y, size }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 700);
    onClick?.();
  };

  return (
    <button className={styles.btn} onClick={handleClick}>
      <div className={styles.rippleWrap}>
        {ripples.map(rp => (
          <span key={rp.id} className={styles.ripple}
            style={{ width: rp.size, height: rp.size, left: rp.x, top: rp.y }} />
        ))}
      </div>
      <span className={styles.label}>{children}</span>
    </button>
  );
}
