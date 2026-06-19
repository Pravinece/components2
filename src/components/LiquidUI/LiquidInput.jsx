import styles from './LiquidInput.module.css';

export default function LiquidInput({ label = 'Search', placeholder = 'Type to ripple...', type = 'text' }) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrap}>
        <input className={styles.input} type={type} placeholder={placeholder} />
        <div className={styles.wave} />
      </div>
    </div>
  );
}
