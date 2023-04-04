import styles from "../page.module.css";

export default function AnimationSection({ currentIndex, content }) {
  if (!content) {
    return null;
  }

  return (
    <div
      className={`${styles.animation} ${styles["carousel-content"]}`}
      style={{
        transform: `translateX(-${(currentIndex * 100) / content.length}%)`,
        width: `calc(100vw * ${content.length})`,
      }}
    >
      {content.map((item, index) => (
        <div key={index}>
          <h1>{item.animation}</h1>
        </div>
      ))}
    </div>
  );
}
