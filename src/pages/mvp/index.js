"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import html2canvas from "html2canvas";

import WorkingElements from "./WorkingElements/WorkingElements";
import RemoveBackground from "../../functions/RemoveBackground";
import handleScreenChange from "@/functions/HandleScreenChange";
import ScreenShotElements from "./ScreenShotElements/ScreenShotElements";
import PutScreenShotToBlob from "@/axiosRequest/PutScreenShotToBlob";
import styles from "./WorkingElements/WorkingElements.module.css";

// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.

export default function Home() {
  const canvas = useRef(); //First canvas on which the the Silhouette is drawn with black background
  const webcam = useRef(); // Camera
  const flashRef = useRef(); // Camera
  const videoToReveal = useRef(); // Video that will be played inside the Silhouette
  const imgRef = useRef(); // background Image
  const newCanvas1 = useRef(); // clone 1
  const newCanvas2 = useRef(); // clone 2
  const newCanvas3 = useRef(); // clone 3
  const newCanvas4 = useRef(); // clone 4
  const newCanvas5 = useRef(); // clone 5
  const ScreenShotElementsRef = useRef();

  const [currentScreen, setCurrentScreen] = useState(0); // Change to next screen based on number 0, 1, 2
  const [displayValueText, setDisplayValueText] = useState(false); // Variable to store if the person is detected
  const [mySocket, setMySocket] = useState([]);

  useEffect(() => {
    // Assigning the current states
    const canvasEl = canvas.current;
    const webcamEl = webcam.current;
    const videoToRevealEl = videoToReveal.current;
    const newCanvasEl1 = newCanvas1.current;
    const newCanvasEl2 = newCanvas2.current;
    const newCanvasEl3 = newCanvas3.current;
    const newCanvasEl4 = newCanvas4.current;
    const newCanvasEl5 = newCanvas5.current;

    // Addding some css to body elements
    document.body.style.overflow = "hidden";
    document.body.style.maxHeight = screen.height;

    // TensorFlow Modal to remove background and detect person to show text on screen
    RemoveBackground(
      canvasEl,
      webcamEl,
      videoToRevealEl,
      newCanvasEl1,
      newCanvasEl2,
      newCanvasEl3,
      newCanvasEl4,
      newCanvasEl5,
      setDisplayValueText
    );

    socketInitializer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/screenshot");
    const newSocket = io();

    newSocket.on("connect", () => {
      console.log("connected");
    });

    newSocket.on("receive-blob", () => {
      takeScreenshot(newSocket);
      handleScreenChange(setCurrentScreen);
    });
    setMySocket(newSocket);
  };

  function takeScreenshot(mySocket) {
    let dataUrl;
    const canvasElement = ScreenShotElementsRef.current; //getting the container in which the canvas element is
    flashRef.current.classList.add(styles["flash-active"]);
    setTimeout(() => {
      flashRef.current.classList.remove(styles["flash-active"]);
    }, 1000);
    html2canvas(canvasElement).then((canvas) => {
      dataUrl = canvas.toDataURL("image/png");
      PutScreenShotToBlob(dataUrl, mySocket);
    });
  }
  return (
    <Fragment>
      {/* Elements to capture from screen on socket call */}
      <ScreenShotElements
        ScreenShotElementsRef={ScreenShotElementsRef}
        newCanvas1={newCanvas1}
        newCanvas2={newCanvas2}
        newCanvas3={newCanvas3}
        newCanvas4={newCanvas4}
        newCanvas5={newCanvas5}
        imgRef={imgRef}
        currentScreen={currentScreen}
        displayValueText={displayValueText}
        mySocket={mySocket}
      />

      {/* Grabbing data elements the webcam and video that is revealed in Silhouette */}
      <WorkingElements
        canvas={canvas}
        webcam={webcam}
        flashRef={flashRef}
        videoToReveal={videoToReveal}
        currentScreen={currentScreen}
      />
    </Fragment>
  );
}
