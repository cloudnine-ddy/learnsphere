import React from "react";

import { Link } from "react-router-dom";

import styles from "./CourseCard.module.css";

function CourseCard({
  lessonID,
  lessonTitle,
  creditPoint,
  instructorName,
  href,
}) {
  return (
    <Link to={href}>
      <div className={styles.lessonCard}>
        <div className={styles.lessonInfo}>
          <p className={styles.lessonId}>{lessonID}</p>
          <p className={styles.lessonTitle}>{lessonTitle}</p>
          <p className={styles.lessonCreditPoint}>Total Credit Point: {creditPoint}</p>
          <p className={styles.lessonInstructor}>{instructorName}</p>
        </div>

        <div className={styles.lessonExtraArea}>
          <div className={styles.progress}>Progress: 80%</div>
          <button
            // onClick={handleCancel}
            className={styles.smallButton}
            style={{ background: "#ff9419ff", marginLeft: "auto" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
