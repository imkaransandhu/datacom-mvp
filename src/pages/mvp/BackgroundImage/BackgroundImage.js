import Image from "next/image";

import styles from "./BackgroundImage.module.css";

const { Fragment } = require("react");

const BackgroundImage = ({ imgSrc, imgRef }) => {
  return (
    <Fragment>
      {" "}
      {imgSrc ? (
        <Image
          width={640}
          height={480}
          className={styles.imgRef}
          ref={imgRef}
          src={imgSrc.url}
          alt="value photo"
        />
      ) : (
        "loading"
      )}
    </Fragment>
  );
};

export default BackgroundImage;
