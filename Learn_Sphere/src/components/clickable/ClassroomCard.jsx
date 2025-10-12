import React from "react";

import { Link } from "react-router-dom";

import styles from "./ClassroomCard.module.css";

function ClassroomCard({
  classroomId,
  classroomName,
  courseTitle,
  supervisor,
  href,
}) {
  return (
    <Link to={href}>
      <div className={styles.card}>
        <div className={styles.lessonInfo}>
          <p className={styles.lessonId}>{classroomId}</p>
          <p className={styles.lessonTitle}>{classroomName}</p>
          <p className={styles.lessonCreditPoint}>{courseTitle}</p>
          <p className={styles.lessonInstructor}>{supervisor}</p>
        </div>

        <div className={styles.lessonExtraArea}></div>
      </div>
    </Link>
  );
}

export default ClassroomCard;
