import React from "react";

import styles from "./LessonCard.module.css";
import { Link } from "react-router-dom";

function LessonCard({lessonID, lessonTitle, creditPoint, instructorName, href}) {
    return (
        <Link to={href}>
            <div className={styles.lessonCard}>
                <div className={styles.lessonIcon}>
                    <img src="images/icons/atom.png" alt="" />
                </div>
                <div className={styles.lessonInfo}>
                    <p className={styles.lessonId}>
                        {lessonID} 
                    </p>
                    <h3 className={styles.lessonTitle}>
                        {lessonTitle}
                    </h3>
                    <p className={styles.lessonCreditPoint}>
                        Credit Point: {creditPoint} 
                    </p>
                    <p className={styles.lessonInstructor}>
                        {instructorName}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default LessonCard;