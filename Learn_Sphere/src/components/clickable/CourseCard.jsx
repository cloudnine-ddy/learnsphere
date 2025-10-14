import React from "react";

import { Link } from "react-router-dom";

import styles from "./CourseCard.module.css";

function CourseCard({
  courseID,
  courseTitle,
  creditPoint,
  instructorName,
  href,
  progress = 75,
  showProgress = true,
}) {
  const parsedProgress = Number.isFinite(progress)
    ? progress
    : parseFloat(progress) || 0;
  const clampedProgress = Math.min(100, Math.max(0, parsedProgress));
  const progressPercent = Math.round(clampedProgress);
  const displayProgress = showProgress;

  return (
    <Link to={href}>
      <div className={styles.lessonCard}>
        <div className={styles.lessonInfo}>
          <p className={styles.lessonId}>{courseID}</p>
          <p className={styles.lessonTitle}>{courseTitle}</p>
          <p className={styles.lessonCreditPoint}>
            Total Credit Point: {creditPoint}
          </p>
          <p className={styles.lessonInstructor}>{instructorName}</p>
        </div>

        {displayProgress && (
          <div
            className={styles.lessonExtraArea}
            role="progressbar"
            aria-label="Course progress"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            title={`Course progress ${progressPercent}%`}
          >
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>
    </Link>
  );
}

export default CourseCard;
