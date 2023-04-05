/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import styles from "./BackgroundImage.module.css";

const { Fragment } = require("react");

const BackgroundImage = ({ imgSrc, imgRef }) => {
  return (
    <Fragment>
      {" "}
      {imgSrc ? (
        <img
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
