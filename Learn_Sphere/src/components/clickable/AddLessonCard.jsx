import React from "react";

import { Link } from "react-router-dom";

import styles from "./AddLessonCard.module.css";

function AddLessonCard({ href }) {
  return (
    <Link to={href}>
      <div className={styles.lessonCard}>
        <div className={styles.lessonIcon}>
          <img src="images/icons/add.png" alt="" />
        </div>
        <div className={styles.lessonInfo}>
          <p className={styles.lessonTitle}>Add Lesson</p>
        </div>
      </div>
    </Link>
  );
}

export default AddLessonCard;
