import styles from './GlassInput.module.css';

export default function GlassInput({ label = 'Email', placeholder = 'you@example.com', icon = '✉️', type = 'text' }) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrap}>
        <input className={styles.input} type={type} placeholder={placeholder} />
        <span className={styles.icon}>{icon}</span>
      </div>
    </div>
  );
}
