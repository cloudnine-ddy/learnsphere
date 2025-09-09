import React from "react";
import FilterDropdown from "../components/FilterDropdown";
import LessonCard from "../components/LessonCard";
import styles from "./LessonDashboard.module.css";
import { getLessons } from "../components/getLessons";
import { useState, useEffect } from "react";

function LessonDashboard() {
    const [filter, setFilter] = useState(true);
    const [label, setLabel] = useState("All Lessons");
    const [lessons, setLessons] = useState([]);

    const options = [
        {label: "All Lessons", state: true},
        {label: "Draft", state: 'Draft'},
        {label: "Published", state: 'Published'},
        {label: "Archived", state: 'Archived'}
    ];

    const changeEvent = (e, state) => {
        setFilter(state);
        setLabel(e.target.text);
    }

    useEffect(() => {
        //Runs when filter is updated
        console.log(filter);
        getLessons(filter).then(
            (lessons) => {
                setLessons(lessons);
            });
    }, [filter]);

    return (
        <div>
            <div className={styles.infoHeader}>
                <div className={styles.infoTitle}>
                    My Lessons
                </div>
                <FilterDropdown label={label} options={options} changeEvent={changeEvent} />
            </div>
            <div className={styles.infoScroll}>
                <div className={styles.cardContainer}>
                    {lessons.map((lesson) => <LessonCard key={lesson.id} lessonID={lesson.data().lessonID} lessonTitle={lesson.data().lessonTitle} creditPoint={lesson.data().creditPoint} instructorName={lesson.data().owner}/>)}
                </div>
            </div>
        </div>
    );
}

export default LessonDashboard;