import styles from "./SplitImage.module.css";

const IMAGE = "/bg.jpg";

function SplitImage() {
  const pieces = 12;

  return (
    <div className={styles.container}>
        {[...Array(pieces)].map((_, i) => (
        <div className={styles.slice} key={i}>
          <div
            className={styles.inner}
            style={{
              "--i": i,
              backgroundImage: `url(${IMAGE})`,
              backgroundPosition: `${(i / (pieces - 1)) * 100}% 0`,
            }}
          >
            {/* FRONT */}
            <div className={styles.front} />

            {/* BACK */}
            <div className={styles.back}>
              <span>Text {i + 1}</span>
            </div>
          </div>
        </div>))}
    </div>
  );
}

export default SplitImage;


