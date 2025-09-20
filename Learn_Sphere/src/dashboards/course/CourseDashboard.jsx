import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getCourses, getCoursesByStudent } from "../../components/getCourses";

import styles from "./CourseDashboard.module.css";

import FilterDropdown from "../../components/selectable_addable/FilterDropdown";
import CourseCard from "../../components/clickable/CourseCard";
import AddCourseCard from "../../components/clickable/AddCourseCard";

function CourseDashboard({ userData }) {
    const [filter, setFilter] = useState(true);
    const [label, setLabel] = useState("All Courses");
    const [courses, setCourses] = useState([]);

    const options = [
        { label: "All Courses", state: true },
        { label: "Draft", state: "Draft" },
        { label: "Published", state: "Published" },
        { label: "Archived", state: "Archived" }
    ];

    const changeEvent = (event, state) => {
        setFilter(state);
        setLabel(event.target.text);
    };

    useEffect(() => {
        if (!userData) {
            return;
        }

        if (userData.role === "student") {
            getCoursesByStudent(userData.id).then((studentCourses) => {
                setCourses(studentCourses);
            });
        } else {
            getCourses(filter, userData).then((allCourses) => {
                setCourses(allCourses);
            });
        }
    }, [filter, userData]);

    const renderHeaderAction = () => {
        if (!userData) {
            return null;
        }

        if (userData.role === "student") {
            return (
                <Link to="/home/joincourse" className={styles.joinButton}>
                    Join Course
                </Link>
            );
        }

        return (
            <FilterDropdown label={label} options={options} changeEvent={changeEvent} />
        );
    };

    return (
        <>
            <div className={styles.infoHeader}>
                <div className={styles.infoTitle}>
                    My Courses
                </div>
                {renderHeaderAction()}
            </div>
            <div className={styles.infoScroll}>
                <div className={styles.cardContainer}>
                    {userData && userData.role !== "student" && (
                        <AddCourseCard
                            courseID={"Add Course"}
                            courseTitle={"Your Courses"}
                            creditPoint={0}
                            instructorName={"Student"}
                            href="/home/newcourse"
                        />
                    )}
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            courseID={course.data().courseID}
                            courseTitle={course.data().courseTitle}
                            creditPoint={course.data().courseTotalCreditpoint}
                            instructorName={course.data().courseSupervisor}
                            href={`/home/courses/${course.id}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default CourseDashboard;
