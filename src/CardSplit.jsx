import React from "react";
import styles from "./CardSplit.module.css";

function CardSplit() {
    let positions = [
        { x: 0, y: 0 },       // item0: top-left
        { x: 0, y: 250 },     // item1: bottom-left
        { x: 250, y: 0 },     // item2: top-right
        { x: 250, y: 125 },   // item3: mid-right to bottom
      ];
      

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {positions.map((_, ind) => (
          <div
            className={`${styles.split}  ${styles[`item${ind}`]}`}
            style={{
                backgroundImage: `url(/panda.webp)`,
                backgroundSize: '500px 500px',
                backgroundPosition: `-${positions[ind].x}px -${positions[ind].y}px`
              }}              
            key={ind}
          >
            <div className={styles.left}></div>
            <div className={styles.right}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardSplit;