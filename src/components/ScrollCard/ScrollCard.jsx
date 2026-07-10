import React, { useEffect, useState, useRef } from 'react'
import { Grid } from 'react-window'
import styles from './ScrollCard.module.css'

function CourseCard({ data }) {  
    return (
      <div className={`${styles.card}`}>
        <div
          className={`${styles.imgContainer}`}
        >
          {data.thumbnail_url &&<img src={data.thumbnail_url} alt=""  loading="lazy"/>}
    
          <div className={styles.details}>
              <div className={styles.title}>
                {<p>Title</p>}
                {<div title={data?.title?.replaceAll(/[_-]/g, " ")}>{data?.title}</div>}
              </div>
            </div>
        </div>
          <div className={styles.contentContainer}>
            <div className={styles.titles}>
              <p>Document Title</p>
              <div>{data.title}</div>
            </div>
          </div>
      </div>
    );
  }
  
const GAP = 10;

const Cell = ({ columnIndex, rowIndex, style, items, cols }) => {
    const index = rowIndex * cols + columnIndex;
    if (index >= items.length) return null;
    console.log("Render Cell", index);

    return (
        <div style={{ ...style, padding: `${GAP / 2}px` }}>
            <CourseCard data={items[index]} />
        </div>
    );
};

function ScrollCard() {
    const [data, setData] = useState([]);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const COL_MIN_WIDTH = 250;
    const ROW_HEIGHT = 220;

    const columnCount = Math.max(1, Math.floor(dimensions.width / COL_MIN_WIDTH));
    const columnWidth = dimensions.width / columnCount;
    const rowCount = Math.ceil(data.length / columnCount);

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            setDimensions({ width: entry.contentRect.width, height: entry.contentRect.height });
        });
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("migoto-cms-token");
                const res = await fetch('https://app.migotoai.com/llma/courses/assignable', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token ? token : '',
                    },
                });
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error('Fetch operation failed:', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.list} ref={containerRef}>
            {dimensions.width > 0 && data.length > 0 && (
                <Grid
                    cellComponent={Cell}
                    cellProps={{ items: data, cols: columnCount }}
                    columnCount={columnCount}
                    columnWidth={columnWidth}
                    rowCount={rowCount}
                    rowHeight={ROW_HEIGHT}
                    defaultWidth={dimensions.width}
                    defaultHeight={dimensions.height}
                    overscanCount={1}
                />
            )}
        </div>
    );
}

export default ScrollCard