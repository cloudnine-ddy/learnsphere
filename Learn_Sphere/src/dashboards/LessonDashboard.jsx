import React from "react";
import FilterDropdown from "../components/FilterDropdown";
import DashbaordHeader from "../layout/DashboardHeader";
import DashboardPage from "../pages/DashboardPage";
import LessonCard from "../components/LessonCard";
import styles from "./LessonDashboard.module.css";
import ViewLesson from "./ViewLesson";
import { getLessons } from "../components/getLessons";
import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Navigate, Link, useParams } from "react-router-dom";

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
        getLessons(filter).then(
            (lessons) => {
                setLessons(lessons);
            });
    }, [filter]);

    return (
        <>
            <div className={styles.infoHeader}>
                <div className={styles.infoTitle}>
                    My Lessons
                </div>
                <FilterDropdown label={label} options={options} changeEvent={changeEvent} />
            </div>
            <div className={styles.infoScroll}>
                <div className={styles.cardContainer}>
                    {lessons.map((lesson) => <LessonCard key={lesson.id} lessonID={lesson.data().lessonID} lessonTitle={lesson.data().title} creditPoint={lesson.data().creditPoint} instructorName={lesson.data().owner} href={`/home/courses/${lesson.id}`}/>)}
                </div>
            </div>
        </>
    );
}

export default LessonDashboard;