import React from "react";
import styles from "./CardList.module.css";

function CardList() {
  return (
    <div className={styles.container}>
      <div className={styles.cardList}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className={styles.card} style={{ zIndex: i, '--x': `-${i * 100}px` }}>
            <img src="./iron1.png" alt="" className={styles.img1} />
            <img src="./iron2.png" alt="" className={styles.img2} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardList;