import styles from './ClayInput.module.css';

export default function ClayInput({ label = 'Your Name', placeholder = 'Enter name...', type = 'text' }) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} type={type} placeholder={placeholder} />
    </div>
  );
}
