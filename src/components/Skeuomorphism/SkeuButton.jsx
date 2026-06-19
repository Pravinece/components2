import styles from './SkeuButton.module.css';

export default function SkeuButton({ children = 'Confirm', variant = 'primary', onClick }) {
  return (
    <button
      className={`${styles.btn} ${variant === 'danger' ? styles.danger : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
