import styles from "./CaptureSession.module.css";
import React, { useState, useEffect } from "react";

const CaptureSession = () => {
  const [scrolled, setScrolled] = useState(false);

  //This logic makes the banner fixed only when scrolling begins.
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0 && !scrolled) {
        setScrolled(true);
      } else if (scrollTop === 0 && scrolled) {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div className={scrolled ? styles["capture-banner-fixed"] : styles["capture-session-banner"] }>
      <p>Capture Session: 45s Remaining</p>
    </div>
  );
};

export default CaptureSession;
