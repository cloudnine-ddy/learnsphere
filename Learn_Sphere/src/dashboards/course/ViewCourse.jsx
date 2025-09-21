import React, {useState, useEffect} from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getCourse } from "../../components/getCourses";
import { getLessonByIDAndName } from "../../components/getLessons";
import { getCurrentUser, getUserInfo } from "../../components/manageUsers";
// import { deleteLessonFromDatabase, deletePrereq } from "../../components/deleteLessons";
import { unEnrollCourseInDatabase } from "../../components/enrollCourses";

import styles from "./ViewCourse.module.css";

import InfoBlock from "../../components/display/InfoBlock";
import MessageBox from "../../components/display/MessageBox";
import LessonCard from "../../components/clickable/LessonCard";

function ViewCourse({userData}) {
    let navigate = useNavigate();

    const {id} = useParams();
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);

    const [showDelete, setShowDelete] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    
    useEffect(() => {
        //Runs on the first render only
        if (userData == null)
        {
            getCurrentUser().then(
                (user) => {
                    return getUserInfo(user);
                })
                .then((info) => {
                    userData = info;
                });
        }
    }, []);

    useEffect(() => {
        if (userData != null)
        {
            getCourse(id, userData).then(
            (course) => {
                setCourse(course);

                if (course == null)
                {
                    console.log("Course not found");
                    console.log(id);
                    navigate("/home");
                }
            }); 
        }
    }, [userData])

    useEffect(() => {
        if (userData != null && course != null) {
            Promise.all(
                course.courseLessons.map((lessonString) =>
                    getLessonByIDAndName(lessonString, userData)
                )
            ).then((results) => {
                setLessons(results.filter(Boolean)); // remove nulls
            });
        }
    }, [course, userData]);

    const handleDelete = () => {
        // deleteLessonFromDatabase(id)
        // .then(() => deletePrereq(lesson.lessonID))
        // .then(() => setShowDelete(false))
        // .then(() => navigate("/home"))
        // .catch((error) => console.error("Error deleting lesson:", error));
    }

    const handleEdit = () => {
        console.log("Editing lesson with id: " + id)
        navigate(`/home/courses/${id}/edit`, { state: {course}}) ;
    }

    const handleCancelEnrollment = async () => {
        try {
            await unEnrollCourseInDatabase(userData, course.courseID);
            setShowCancelConfirm(false);
            navigate("/home/courses");
        } catch (error) {
            console.error("Failed to cancel enrollment:", error);
        }
    }

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.infoHeader}>

                <div className={styles.smallRow}>
                    {course != null ? course.courseID : "null"}
                </div>
                <div className={styles.bigRow}>
                    <div className={styles.courseTitle}>
                        {course != null ? course.courseTitle : "null"}
                    </div>
                    <div className={styles.courseStatus}>
                        {course != null ? course.courseStatus : "null"}
                    </div>
                    {userData != null && userData.role != 'student' && <button className={styles.smallButton} style={{background: "#beb2a4", marginLeft: "auto"}} onClick = {handleEdit}>Edit</button>}
                    {userData != null && userData.role != 'student' && <button className={styles.smallButton} onClick={() => setShowDelete(true)}>Delete</button>}
                    {userData != null && userData.role == 'student' && (
                        <button
                            className={styles.cancelEnrollButton}
                            type="button"
                            onClick={() => setShowCancelConfirm(true)}
                        >
                            Cancel Enroll
                        </button>
                    )}
                </div>

            </div>
            

            <div className={styles.infoScroll}>
                <div className={styles.container}>
                    <InfoBlock title="Supervisor" content={course != null ? course.courseSupervisor : "null"}/>
                    <InfoBlock title="Total Credit Point" content={course != null ? course.courseTotalCreditpoint : "null"}/>
                    <InfoBlock title="Date Created" content={course != null ? `${new Date(course.courseCreateDate).toDateString()} ${new Date(course.courseCreateDate).toTimeString()}` : "null"}/>
                    <InfoBlock title="Last Updated" content={course != null ? `${new Date(course.courseUpdateDate).toDateString()} ${new Date(course.courseUpdateDate).toTimeString()}` : "null"}/>
                    <InfoBlock title="Course Description" content={course != null ? course.courseDescription : "null"}/>
                    {/* <InfoBlock title="Lessons" content={course != null ? course.courseLessons.length > 0 ? course.courseLessons : "No Lessons" : "No Lessons"}/> */}
                    
                    {/* I take this from the LessonDashboard, becauses I need the LessonCard to be here */}
                    {/* I mean now for visualization, I put them manually, but it should be changed to the commented one */}
                    {/* <InfoBlock title="course included" /> */}
                    <div className={styles.cardContainer}>
                        {lessons.map((lesson) => <LessonCard key={lesson.id} lessonID={lesson.data().lessonID} lessonTitle={lesson.data().title} creditPoint={lesson.data().creditPoint} instructorName={lesson.data().owner} href={`/home/lessons/${lesson.id}`}/>)}
                    </div>



                </div>
            </div>

            <div className={styles.pageFooter}>
                <button type="button" className={styles.backButton} onClick={handleBack}>
                    <img src="images/icons/goback.png" alt="Back" className={styles.backIcon} />
                    <span>Back</span>
                </button>
            </div>

            {showDelete && <MessageBox onCancel={() => setShowDelete(false)} onConfirm={handleDelete}/>}
            {showCancelConfirm && (
                <MessageBox
                    label="Cancel Enrollment"
                    message={`Are you sure you want to leave ${course?.courseTitle ?? "this course"}?`}
                    button_1="Keep Course"
                    button_2="Confirm"
                    onCancel={() => setShowCancelConfirm(false)}
                    onConfirm={handleCancelEnrollment}
                />
            )}
        </div>
    );
}

export default ViewCourse;
