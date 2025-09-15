import React, {useState, useEffect} from "react";

import Button from "../components/Button";

import styles from "./ViewCourse.module.css";
import InfoBlock from "../components/InfoBlock";
import { getLesson } from "../components/getLessons";
import { useParams } from "react-router-dom";
import { getCurrentUser, getUserInfo } from "../components/manageUsers";
import { useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { deleteLessonFromDatabase, deletePrereq } from "../components/deleteLessons";
import LessonCard from "../components/LessonCard";

function ViewCourse({userData}) {
    let navigate = useNavigate();

    const {id} = useParams();
    const [lesson, setLesson] = useState(null);

    const [showDelete, setShowDelete] = useState(false);
    
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
            getLesson(id, userData).then(
            (lesson) => {
                setLesson(lesson);

                if (lesson == null)
                {
                    navigate("/home");
                }
            }); 
        }
    }, [userData])

    const handleDelete = () => {
        deleteLessonFromDatabase(id)
        .then(() => deletePrereq(lesson.lessonID))
        .then(() => setShowDelete(false))
        .then(() => navigate("/home"))
        .catch((error) => console.error("Error deleting lesson:", error));
    }

    const handleEdit = () => {
        console.log("Editing lesson with id: " + id)
        navigate(`/home/courses/${id}/edit`, { state: {lesson}}) ;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.infoHeader}>

                <div className={styles.smallRow}>
                    {lesson != null ? lesson.lessonID : "null"}
                </div>
                <div className={styles.bigRow}>
                    <div className={styles.lessonTitle}>
                        {lesson != null ? lesson.title : "null"}
                    </div>
                    <div className={styles.lessonStatus}>
                        {lesson != null ? lesson.status : "null"}
                    </div>
                    {userData != null && userData.role != 'student' && <button className={styles.smallButton} style={{background: "#beb2a4", marginLeft: "auto"}} onClick = {handleEdit}>Edit</button>}
                    {userData != null && userData.role != 'student' && <button className={styles.smallButton} onClick={() => setShowDelete(true)}>Delete</button>}

                </div>

            </div>
            

            <div className={styles.infoScroll}>
                <div className={styles.container}>
                    <InfoBlock title="Owner" content={lesson != null ? lesson.owner : "null"}/>
                    <InfoBlock title="Total Credit Point" content={lesson != null ? lesson.creditPoint : "null"}/>
                    <InfoBlock title="Date Created" content={lesson != null ? `${new Date(lesson.createdAt).toDateString()} ${new Date(lesson.createdAt).toTimeString()}` : "null"}/>
                    <InfoBlock title="Last Updated" content={lesson != null ? `${new Date(lesson.updatedAt).toDateString()} ${new Date(lesson.updatedAt).toTimeString()}` : "null"}/>
                    <InfoBlock title="Course Description" content={lesson != null ? lesson.description : "null"}/>
                    
                    
                    {/* I take this from the LessonDashboard, becauses I need the LessonCard to be here */}
                    {/* I mean now for visualization, I put them manually, but it should be changed to the commented one */}
                    <InfoBlock title="Lesson included" />
                    <div className={styles.cardContainer}>
                        <LessonCard />
                        <LessonCard />
                        <LessonCard />
                        <LessonCard />
                        {/* {lessons.map((lesson) => <LessonCard key={lesson.id} lessonID={lesson.data().lessonID} lessonTitle={lesson.data().title} creditPoint={lesson.data().creditPoint} instructorName={lesson.data().owner} href={`/home/courses/${lesson.id}`}/>)} */}
                    </div>



                </div>
            </div>

            {showDelete && <MessageBox onCancel={() => setShowDelete(false)} onConfirm={handleDelete}/>}
        </div>
    );
}

export default ViewCourse;