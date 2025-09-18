import React from "react";
import { useState, useEffect } from "react";

import { getCourses } from "../../components/getCourses";
import { getCoursesByStudent } from "../../components/getCourses";

import styles from "./CourseDashboard.module.css";

import FilterDropdown from "../../components/selectable_addable/FilterDropdown";
import CourseCard from "../../components/clickable/CourseCard";
import AddCourseCard from "../../components/clickable/AddCourseCard";



function CourseDashboard({userData}) {
    const [filter, setFilter] = useState(true);
    const [label, setLabel] = useState("All Courses");
    const [courses, setCourses] = useState([]);

    const options = [
        {label: "All Courses", state: true},
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
        if (userData.role == "student") {
            getCoursesByStudent(userData.id).then(
                (courses) => {
                    setCourses(courses);
                });
        } else {
        getCourses(filter, userData).then(
            (courses) => {
                setCourses(courses);
            });
        }
    }, [filter, userData]);

    return (
        <>
            <div className={styles.infoHeader}>
                <div className={styles.infoTitle}>
                    My Courses
                </div>
                {userData != null && ( userData.role == "student" ? <FilterDropdown label={"Your Courses"} options={[{label: "Your Courses", state: 'Published'}]} changeEvent={changeEvent} /> : <FilterDropdown label={label} options={options} changeEvent={changeEvent} />)}
            </div>
            <div className={styles.infoScroll}>
                <div className={styles.cardContainer}>
                    {userData != null && ( userData.role != "student" ? <AddCourseCard courseID={"Add Course"} courseTitle={"Your Courses"} creditPoint={0} instructorName={"Student"} href={"/home/newcourse"}/> : <AddCourseCard courseID={"Join Course"} userData={userData} href={"/home/joincourse"}/>)}
                    {courses.map((course) => <CourseCard key={course.id} lessonID={course.data().courseID} lessonTitle={course.data().courseTitle} creditPoint={course.data().courseTotalCreditpoint} instructorName={course.data().courseSupervisor} href={`/home/courses/${course.id}`}/>)}
                </div>
            </div>
        </>
    );
}

export default CourseDashboard;