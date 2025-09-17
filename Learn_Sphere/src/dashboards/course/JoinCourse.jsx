import { getCourses } from "../../components/getCourses"
import { Navigate, useNavigate } from "react-router-dom"
import React, {useEffect, useState} from "react";

import styles from "./JoinCourse.module.css"
import JoinCourseCard from "../../components/clickable/JoinCourseCard";

function JoinCourse({userData}) {
    let navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        //Runs when filter is updated
        getCourses(true, userData).then(
            (lessons) => {
                setCourses(lessons);
                console.log(lessons);
            });
    }, [])
    
    return (
        <>
            <div className={styles.infoHeader}>
                <div className={styles.infoTitle}>
                    Join Courses
                </div>
            </div>
            <div className={styles.infoScroll}>
                <div className={styles.cardContainer}>
                    {courses.map((course) => <JoinCourseCard key={course.id} courseID={course.data().courseID} courseTitle={course.data().courseTitle} creditPoint={course.data().courseTotalCreditpoint} courseSupervisor={course.data().courseSupervisor} href={`/home/courses/${course.id}`}/>)}
                </div>
            </div>
        </>
    )
}

export default JoinCourse