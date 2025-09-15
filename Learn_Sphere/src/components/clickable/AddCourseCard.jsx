import React from "react";

import { Link } from "react-router-dom";

import styles from "./AddCourseCard.module.css";

function AddCourseCard({href}) {
  return (
    <Link to={href}>
      <div className={styles.lessonCard}>
        <div className={styles.lessonInfo}>
          
          <img src="images/icons/add.png" alt="" className={styles.icon} />
          <p className={styles.lessonTitle}>Add Course</p>
          
        </div>

        <div className={styles.lessonExtraArea}>
          
        </div>
      </div>
    </Link>
  );
}

export default AddCourseCard;
