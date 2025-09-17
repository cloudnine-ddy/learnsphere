import React from "react";

import { Link } from "react-router-dom";

import styles from "./JoinCourseCard.module.css";



function JoinCourseCard({courseID, courseTitle, creditPoint, supervisorName, href}) {
    return (
        <div className={styles.courseCard}>
            <div className={styles.courseIcon}>
                <img src="images/icons/atom.png" alt="" />
            </div>
            <div className={styles.courseInfo}>
                <p className={styles.courseId}>
                    {courseID} 
                </p>
                <p className={styles.courseTitle}>
                    {courseTitle}
                </p>
                <p className={styles.totalCreditPoint}>
                    Total Credit Point: {creditPoint} 
                </p>
                <p className={styles.courseSupervisor}>
                    {supervisorName}
                </p>
            </div>
            <div className={styles.courseJoin}>
                <button
                    // onClick={handleJoin}
                    className={styles.smallButton}
                    style={{ background: "#ff9419ff", marginLeft: "auto" }}
                >
                    Join
                </button>
            </div>
        </div>
    );
}

export default JoinCourseCard;