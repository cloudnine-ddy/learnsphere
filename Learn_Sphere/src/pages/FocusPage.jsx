import React, { useState, useEffect } from "react";

import styles from "./FocusPage.module.css";

import Button from "../components/clickable/Button";
import GrowthSection from "../components/functional/GrowthSection";

function FocusPage({ totalTime = 25 * 60 }) {
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(true);

  const progress = ((totalTime - remainingTime) / totalTime) * 100;

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, remainingTime]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p>Focusing</p>
      </div>
      <div className={styles.middle}>
        <div className={styles.timeQuoteContainer}>
          <p className={styles.time}>{formatTime(remainingTime)}</p>
          <p className={styles.quote}>Live a life you will remember ⭐</p>
        </div>
        <div className={styles.growthSectionContainer}>
          <GrowthSection progress={progress} />
        </div>
      </div>
      <div className={styles.bottom}>
        <Button label="Give Up" type="button" />
      </div>
    </div>
  );
}

export default FocusPage;
