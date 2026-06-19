import styles from './LiquidCard.module.css';

export default function LiquidCard() {
  return (
    <div className={styles.card}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={styles.content}>
        <span className={styles.emoji}>🌊</span>
        <h3 className={styles.title}>Liquid Design</h3>
        <p className={styles.desc}>Organic shapes that breathe and morph — bringing fluidity to your interfaces.</p>
        <span className={styles.pill}>Explore →</span>
      </div>
    </div>
  );
}
