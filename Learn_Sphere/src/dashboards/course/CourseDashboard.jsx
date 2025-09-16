import React from "react";
import { useState, useEffect } from "react";

import { getCourses } from "../../components/getCourses";

import styles from "./CourseDashboard.module.css";

import FilterDropdown from "../../components/selectable_addable/FilterDropdown";
import CourseCard from "../../components/clickable/CourseCard";
import AddCourseCard from "../../components/clickable/AddCourseCard";



function CourseDashboard({userData}) {
    const [filter, setFilter] = useState(true);
    const [label, setLabel] = useState("All Lessons");
    const [courses, setCourses] = useState([]);

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

    //Runs when filter is updated
    getCourses(filter, userData).then(
        (courses) => {
            setCourses(courses);
        });

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
                    {userData != null && ( userData.role != "student" ? <AddCourseCard lessonID={"Add Course"} lessonTitle={"Your Lessons"} creditPoint={0} instructorName={"Student"} href={"/home/newcourse"}/> : null)}
                    {courses.map((course) => <CourseCard key={course.id} lessonID={course.data().courseID} lessonTitle={course.data().courseTitle} courseTotalCreditpoint={course.data().courseTotalCreditpoint} instructorName={course.data().courseSupervisor} href={`/home/courses/wooooo`}/>)}
                </div>
            </div>
        </>
    );
}

export default CourseDashboard;