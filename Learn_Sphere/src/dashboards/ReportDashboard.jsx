import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { getLessons } from "../components/getLessons";

import styles from "./ReportDashboard.module.css";
import { getListOfLessonsFromStudent } from "../components/studentLesson";

import FilterDropdown from "../components/selectable_addable/FilterDropdown";
import LessonCard from "../components/clickable/LessonCard";
import ReportSquare from "../components/display/reportSquare";

const INSTRUCTOR_MY_LESSONS = "INSTRUCTOR_MY_LESSONS";



function ReportDashboard({ userData }) {
    // const [filter, setFilter] = useState(true);
    // const [label, setLabel] = useState("All Lessons");
    // const [lessons, setLessons] = useState([]);

    // const instructorDisplayName = useMemo(() => {
    //     if (!userData || userData.role === "student") {
    //         return "";
    //     }

    //     const parts = [userData.title, userData.firstName, userData.lastName].filter(Boolean);
    //     return parts.join(" ").replace(/\s+/g, " ").trim();
    // }, [userData]);

    // useEffect(() => {
    //     if (!userData) {
    //         setLessons([]);
    //         return;
    //     }

    //     let cancelled = false;

    //     async function loadLessons() {
    //         try {
    //             let fetchedLessons = [];

    //             if (userData.role === "student") {
    //                 fetchedLessons = await getListOfLessonsFromStudent(userData.id);
    //             } else if (filter === INSTRUCTOR_MY_LESSONS) {
    //                 if (!instructorDisplayName) {
    //                     setLessons([]);
    //                     return;
    //                 }
    //                 fetchedLessons = await getLessons(true, userData, { ownerName: instructorDisplayName });
    //             } else {
    //                 fetchedLessons = await getLessons(filter, userData);
    //             }

    //             if (!cancelled) {
    //                 setLessons(fetchedLessons);
    //             }
    //         } catch (error) {
    //             console.error("Failed to load lessons:", error);
    //             if (!cancelled) {
    //                 setLessons([]);
    //             }
    //         }
    //     }

    //     loadLessons();

    //     return () => {
    //         cancelled = true;
    //     };
    // }, [filter, userData, instructorDisplayName]);

    const changeEvent = (event, state) => {
        event.preventDefault();
        setFilter(state);
        setLabel(event.target.text);
    };

    // const instructorOptions = [
    //     { label: "All Lessons", state: true },
    //     { label: "My Lessons", state: INSTRUCTOR_MY_LESSONS },
    //     { label: "Draft", state: "Draft" },
    //     { label: "Published", state: "Published" },
    //     { label: "Archived", state: "Archived" }
    // ];

    // const studentOptions = [
    //     { label: "All Lessons", state: true }
    // ];

    // const filterOptions = userData?.role === "student" ? studentOptions : instructorOptions;

    return (
        <div className={styles.wrapper}>
            <div className={styles.infoHeader}>
                <div className={styles.infoTitleRow}>
                    <div className={styles.infoTitle}>Report</div>
                </div>
            </div>
            <div className={styles.infoScroll}>
                <div className={styles.rowContainer}>
                    <div className={styles.reportRow}>

                        <div className={styles.rowTitle}>
                            Lesson
                        </div>
                        
                        <div className={styles.rowContent}>
                            <ReportSquare title={"Total Lesson"} number={"100"} description={"All created lessons"} />
                            <ReportSquare title={"Active Lesson"} number={"100"} description={"Current running"} />
                            <ReportSquare title={"Archive Lesson"} number={"100"} description={"Inactive"} />
                            <ReportSquare title={"Adverage No. of Lesson"} number={"100"} description={"per lesson"} />
                        </div>
                        
                    </div>

                    <div className={styles.reportRow}>
                        <div className={styles.rowTitle}>
                            Course
                        </div>
                        <div className={styles.rowContent}>
                            <ReportSquare title={"Total Course"} number={"100"} description={"All created courses"} />
                            <ReportSquare title={"Active Course"} number={"100"} description={"Current running"} />
                            <ReportSquare title={"Archive Course"} number={"100"} description={"Inactive"} />
                            <ReportSquare title={"Adverage No. of Credit Point"} number={"100"} description={"per course"} />
                        </div>
                    </div>

                    <div className={styles.reportRow}>
                        <div className={styles.rowTitle}>
                            Classroom
                        </div>
                        <div className={styles.rowContent}>
                            <ReportSquare title={"Total Classroom"} number={"100"} description={"All created classroom"} />
                            <ReportSquare title={"Active Classroom"} number={"100"} description={"Current running"} />
                            <ReportSquare title={"Archive Classroom"} number={"100"} description={"Inactive"} />
                            <ReportSquare title={"Adverage No. of Students"} number={"100"} description={"per classroom"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportDashboard;
