import styles from "./CanvasElement.module.css";

const CanvasElement = ({ canvavrefDetail }) => {
  return (
    <canvas className={styles["canvas-element"]} ref={canvavrefDetail}></canvas>
  );
};

export default CanvasElement;
