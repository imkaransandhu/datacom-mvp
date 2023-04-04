import { useEffect, useState } from "react";

import styles from "./ScreenShotElements.module.css";

import BackgroundImage from "../BackgroundImage/BackgroundImage";
import ValueElement from "../ValueElement/ValueElement";
import CanvasElement from "../CanvasElement/CanvasElement";
import FetchTvScreenGallery from "@/axiosRequest/FetchTvScreenGallery";

const ScreenShotElements = ({
  newCanvas1,
  newCanvas2,
  newCanvas3,
  newCanvas4,
  newCanvas5,
  currentScreen,
  displayValueText,
  imgRef,
  ScreenShotElementsRef,
}) => {
  const [backgroundImages, setBackgroundImages] = useState([]);

  useEffect(() => {
    FetchTvScreenGallery(setBackgroundImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ScreenShotElementsRef} className={styles["screen-to-capture"]}>
      <BackgroundImage
        imgSrc={backgroundImages[currentScreen]}
        imgRef={imgRef}
      />
      <CanvasElement canvavrefDetail={newCanvas1} />
      <CanvasElement canvavrefDetail={newCanvas2} />
      <CanvasElement canvavrefDetail={newCanvas3} />
      <CanvasElement canvavrefDetail={newCanvas4} />
      <CanvasElement canvavrefDetail={newCanvas5} />

      {backgroundImages.length !== 0 && (
        <ValueElement text={backgroundImages[currentScreen]} />
      )}
    </div>
  );
};

export default ScreenShotElements;
