/* eslint-disable @next/next/no-img-element */
import styles from "./GalleryGrid.module.css";
export default function GalleryGrid({ data, isListView, loadImageView }) {
  return (
    <div
      className={
        isListView
          ? styles["list-outer-container"]
          : styles["grid-outer-container"]
      }
    >
      {/* <div className={styles["grid-item"]}></div> <div className={styles["grid-item"]}></div> <div className={styles["grid-item"]}></div> <div className={styles["grid-item"]}></div> */}{" "}
      {data.map((item, index) => {
        return (
          <button
            onClick={loadImageView}
            className={styles["grid-item"]}
            key={index}
          >
            <img src={item.url} alt="Captured interactive image"></img>
          </button>
        );
      })}
    </div>
  );
}
