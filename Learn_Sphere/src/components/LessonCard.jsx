import React from "react";

import styles from "./LessonCard.module.css";

function LessonCard({lessonID, lessonTitle, creditPoint, instructorName}) {
    return (
        <div className={styles.lessonCard}>
            {/* <div className={styles.lessonIcon}>
                <img src="images/icons/atom.png" alt="">
            </div> */}
            <div className={styles.lessonInfo}>
                <p className={styles.lessonId}>
                    {lessonID} 
                </p>
                <p className={styles.lessonCreditPoint}>
                    {creditPoint} 
                </p>
                <h3 className={styles.lessonTitle}>
                    {lessonTitle}
                </h3>
                <p className={styles.lessonInstructor}>
                    {instructorName}
                </p>
            </div>
        </div>
    );
}

export default LessonCard;