import React from "react";
import FilterDropdown from "../components/FilterDropdown";
import LessonCard from "../components/LessonCard";
import styles from "./LessonDashboard.module.css";

function LessonDashboard() {
    return (
        <div>
            <div className={styles.infoHeader}>
                <div className={styles.infoTitle}>
                    My Lessons
                </div>
                <FilterDropdown label = "All Lessons ▼" />
            </div>
            <div className={styles.infoScroll}>
                <div className={styles.cardContainer}>
                    <LessonCard lessonID="SE001" lessonTitle="Software Engineering" creditPoint="6" instructorName="Jorden"/>
                    <LessonCard lessonID="SE001" lessonTitle="Software Engineering" creditPoint="6" instructorName="Jorden"/>
                    <LessonCard lessonID="SE001" lessonTitle="Software Engineering" creditPoint="6" instructorName="Jorden"/>
                    <LessonCard lessonID="SE001" lessonTitle="Software Engineering" creditPoint="6" instructorName="Jorden"/>
                </div>
            </div>
        </div>
    );
}

export default LessonDashboard;