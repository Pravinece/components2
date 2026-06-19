import styles from './SkeuInput.module.css';

export default function SkeuInput({ label = 'Full Name', placeholder = 'John Doe...', type = 'text' }) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} type={type} placeholder={placeholder} />
    </div>
  );
}
