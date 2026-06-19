import styles from './ClayCard.module.css';

export default function ClayCard({ icon = '🎯', title = 'Design System', desc = 'Build beautiful, consistent UI with our clay-inspired component library.', tag = 'New' }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>
      <span className={styles.tag}>{tag}</span>
    </div>
  );
}
