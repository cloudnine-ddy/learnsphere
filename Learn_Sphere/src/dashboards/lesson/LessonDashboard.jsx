import React from "react";
import { useState, useEffect } from "react";

import { getLessons } from "../../components/getLessons";

import styles from "./LessonDashboard.module.css";

import FilterDropdown from "../../components/selectable_addable/FilterDropdown";
import LessonCard from "../../components/clickable/LessonCard";
import AddLessonCard from "../../components/clickable/AddLessonCard";



function LessonDashboard({userData}) {
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
        getLessons(filter, userData).then(
            (lessons) => {
                setLessons(lessons);
            });
    }, [filter, userData]);

    return (
        <>
            <div className={styles.infoHeader}>
                <div className={styles.infoTitle}>
                    My Lessons
                </div>
                {userData != null && ( userData.role == "student" ? <FilterDropdown label={"Your Lessons"} options={[{label: "Your Lessons", state: 'Published'}]} changeEvent={changeEvent} /> : <FilterDropdown label={label} options={options} changeEvent={changeEvent} />)}
            </div>
            <div className={styles.infoScroll}>
                <div className={styles.cardContainer}>
                    {/* TODO: need to modify a bit */}
                    {userData != null && ( userData.role != "student" ? <AddLessonCard href={"/home/newlesson"}/> : null)}
                    {lessons.map((lesson) => <LessonCard key={lesson.id} lessonID={lesson.data().lessonID} lessonTitle={lesson.data().title} creditPoint={lesson.data().creditPoint} instructorName={lesson.data().owner} href={`/home/lessons/${lesson.id}`}/>)}
                </div>
            </div>
        </>
    );
}

export default LessonDashboard;