import { getCoursesNonEnroll } from "../../components/getCourses"
import { Navigate, useNavigate } from "react-router-dom"
import React, {useEffect, useState} from "react";

import styles from "./JoinCourse.module.css"
import JoinCourseCard from "../../components/clickable/JoinCourseCard";
import { enrollCourseInDatabase } from "../../components/enrollCourses";

function JoinCourse({userData}) {
    let navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    console.log(userData.id);
    
    getCoursesNonEnroll(userData).then(
        (courses) => {
            setCourses(courses);
            console.log(courses);
        });

    const handleJoin = async (courseID) => {
        try {
            console.log("Enrolling in course:", courseID);
            console.log("User ID:", userData.id);
            await enrollCourseInDatabase(userData, courseID); 
            navigate("/home/courses");
        } catch (err) {
            console.error("Failed to enroll:", err);
        }
    }
    
    return (
        <>
            <div className={styles.infoHeader}>
                <div className={styles.infoTitle}>
                    Join Courses
                </div>
            </div>
            <div className={styles.infoScroll}>
                <div className={styles.cardContainer}>
                    {courses.map((course) => <JoinCourseCard key={course.id} courseID={course.data().courseID} courseTitle={course.data().courseTitle} creditPoint={course.data().courseTotalCreditpoint} courseSupervisor={course.data().courseSupervisor} href={`/home/courses/${course.id}`} onClick = {() => handleJoin(course.id)}/>)}
                </div>
            </div>
        </>
    )
}

export default JoinCourse