"use client";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./page.module.css";
import CaptureSession from "@/components/Shared/CaptureSession/CaptureSession";
import HeaderSection from "./OnboardingElements/HeaderSection";
import AnimationSection from "./OnboardingElements/AnimationSection";
import NavigationSection from "./OnboardingElements/NavigationSection";

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const content = [
    {
      subHeading: "Welcome to the",
      heading: "DataVision",
      description:
        "Dorem ipsum dolor sit amet, consectetur adipiscing elit. \nNunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      animation: "Animation Section 1",
    },
    {
      subHeading: "Step One",
      heading: "Capture",
      description:
        "Dorem ipsum dolor sit amet, consectetur adipiscing elit. \nNunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      animation: "Animation Section 2",
    },
    {
      subHeading: "Step Two",
      heading: "Explore",
      description:
        "Dorem ipsum dolor sit amet, consectetur adipiscing elit. \nNunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      animation: "Animation Section 3",
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === content.length - 1 ? content.length - 1 : prevIndex + 1
    );
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  return (
    <div className={styles["carousel-container"]} {...handlers}>
      <CaptureSession />
      <HeaderSection currentIndex={currentIndex} content={content} />
      <AnimationSection currentIndex={currentIndex} content={content} />
      <NavigationSection
        currentIndex={currentIndex}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        content={content}
      />
    </div>
  );
}
