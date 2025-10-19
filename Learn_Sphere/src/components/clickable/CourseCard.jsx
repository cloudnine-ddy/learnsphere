import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import styles from "./CourseCard.module.css";
import { calculateStudentProgress } from "../studentLesson";
import { getLessonsbyCourseID } from "../getLessons";

function CourseCard({
  courseID,
  courseTitle,
  creditPoint,
  instructorName,
  href,
  userData,
}) {
  const [progress, setProgress] = useState(0);
  //const clampedProgress = Math.min(100, Math.max(0, parsedProgress));
  //const progressPercent = Math.round(clampedProgress);
  const displayProgress = userData?.role === "student";

  
  useEffect(() => {
    if (userData != null && userData?.role === "student") {
      getLessonsbyCourseID(courseID, userData)
      .then((lessons) => {
        let lessonCodes = lessons.map((lesson) => {return lesson.data().lessonID});
        
        calculateStudentProgress(userData.id, lessonCodes)
        .then((progress) => {
          setProgress(Number.isFinite(progress) ? progress : parseFloat(progress) || 0);
        })
        .catch((error) =>{
          console.error(error);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
}, []);

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
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            title={`Course progress ${progress}%`}
          >
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </Link>
  );
}

export default CourseCard;
