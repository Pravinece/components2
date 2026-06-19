import styles from './SkeuCard.module.css';

export default function SkeuCard() {
  return (
    <div className={`${styles.card} ${styles.leather}`}>
      <div className={styles.badge}>⭐ Premium</div>
      <h3 className={styles.title}>Leather Notebook</h3>
      <div className={styles.divider} />
      <p className={styles.desc}>
        A handcrafted experience with real-world textures and physical depth — skeuomorphism at its finest.
      </p>
      <div className={styles.meterLabel}>Progress — 72%</div>
      <div className={styles.meter}>
        <div className={styles.meterFill} />
      </div>
    </div>
  );
}
