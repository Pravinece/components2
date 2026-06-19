import styles from './GlassCard.module.css';

export default function GlassCard({ name = 'Arya Stark', role = 'UI Designer', followers = '12.4k', projects = 38, rating = '4.9' }) {
  return (
    <div className={styles.card}>
      <div className={styles.shimmer} />
      <div className={styles.avatar}>🎨</div>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.subtitle}>{role}</p>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span>{followers}</span>
          <span>Followers</span>
        </div>
        <div className={styles.stat}>
          <span>{projects}</span>
          <span>Projects</span>
        </div>
        <div className={styles.stat}>
          <span>{rating}</span>
          <span>Rating</span>
        </div>
      </div>
    </div>
  );
}
