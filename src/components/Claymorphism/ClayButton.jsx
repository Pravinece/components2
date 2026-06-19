import styles from './ClayButton.module.css';

export default function ClayButton({ children = 'Click Me', variant = 'primary', onClick }) {
  return (
    <button
      className={`${styles.btn} ${variant === 'secondary' ? styles.secondary : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}