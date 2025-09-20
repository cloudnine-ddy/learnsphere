import React from "react";

import { Link } from "react-router-dom";

import styles from "./CourseCard.module.css";

function CourseCard({
  courseID,
  courseTitle,
  creditPoint,
  instructorName,
  href
}) {
  return (
    <Link to={href}>
      <div className={styles.lessonCard}>
        <div className={styles.lessonInfo}>
          <p className={styles.lessonId}>{courseID}</p>
          <p className={styles.lessonTitle}>{courseTitle}</p>
          <p className={styles.lessonCreditPoint}>Total Credit Point: {creditPoint}</p>
          <p className={styles.lessonInstructor}>{instructorName}</p>
        </div>

        <div className={styles.lessonExtraArea}>
          <div className={styles.progress}>Progress: 80%</div>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
