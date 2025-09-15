import React from "react";
import FilterDropdown from "../components/FilterDropdown";
import DashbaordHeader from "../layout/DashboardHeader";
import DashboardPage from "../pages/DashboardPage";
import CourseCard from "../components/CourseCard";
import styles from "./CourseDashboard.module.css";
import ViewLesson from "./ViewLesson";
import { getLessons } from "../components/getLessons";
import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Navigate, Link, useParams } from "react-router-dom";

function CourseDashboard({userData}) {
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
                    My Courses
                </div>
                {userData != null && ( userData.role == "student" ? <FilterDropdown label={"Your Lessons"} options={[{label: "Your Lessons", state: 'Published'}]} changeEvent={changeEvent} /> : <FilterDropdown label={label} options={options} changeEvent={changeEvent} />)}
            </div>
            <div className={styles.infoScroll}>
                <div className={styles.cardContainer}>
                    {lessons.map((lesson) => <CourseCard key={lesson.id} lessonID={lesson.data().lessonID} lessonTitle={lesson.data().title} creditPoint={lesson.data().creditPoint} instructorName={lesson.data().owner} href={`/home/courses/wooooo`}/>)}
                </div>
            </div>
        </>
    );
}

export default CourseDashboard;