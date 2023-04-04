import Image from "next/image";
import Webcam from "react-webcam";

import styles from "./WorkingElements.module.css";

const { Fragment } = require("react");

const WorkingElements = ({
  canvas,
  webcam,
  videoToReveal,

  currentScreen,
}) => {
  const videoToRevealSrc = [
    "/video/plain.mp4",
    "/video/plain.mp4",
    "/video/plain.mp4",
  ];

  return (
    <Fragment>
      <canvas
        width={640}
        height={480}
        className={styles.canvas}
        ref={canvas}
      ></canvas>

      <Webcam width={640} height={480} className={styles.webcam} ref={webcam} />
      <video
        width={640}
        height={480}
        className={styles.videoToReveal}
        ref={videoToReveal}
        controls
        src={videoToRevealSrc[currentScreen]}
        loop
      ></video>
    </Fragment>
  );
};

export default WorkingElements;
