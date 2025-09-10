import React, {useState, useEffect} from "react";

import Button from "../components/Button";

import styles from "./ViewLesson.module.css";
import InfoBlock from "../components/InfoBlock";
import { getLesson } from "../components/getLessons";
import { useParams } from "react-router-dom";
import { getCurrentUser, getUserInfo } from "../components/manageUsers";
import { useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { deleteLessonFromDatabase } from "../components/deleteLessons";

function ViewLesson({userData}) {
    let navigate = useNavigate();

    const {id} = useParams();
    const [lesson, setLesson] = useState(null);

    const [showDelete, setShowDelete] = useState(false);
    
    useEffect(() => {
        //Runs on the first render only
        getLesson(id, userData).then(
            (lesson) => {
                setLesson(lesson);
            });
        
    }, []);

    const handleDelete = () => {
        deleteLessonFromDatabase(id)
        .then(() => setShowDelete(false))
        .then(() => navigate("/home"))
        .catch((error) => console.error("Error deleting lesson:", error));
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
                    {userData != null && userData.role != 'student' && <button className={styles.smallButton} style={{background: "#beb2a4", marginLeft: "auto"}}>Edit</button>}
                    {userData != null && userData.role != 'student' && <button className={styles.smallButton} onClick={() => setShowDelete(true)}>Delete</button>}

                </div>

            </div>
            

            <div className={styles.infoScroll}>
                <div className={styles.container}>
                    <InfoBlock title="Owner" content={lesson != null ? lesson.owner : "null"}/>
                    <InfoBlock title="Credit Point" content={lesson != null ? lesson.creditPoint : "null"}/>
                    <InfoBlock title="Date Created" content={lesson != null ? `${new Date(lesson.createdAt).toDateString()} ${new Date(lesson.createdAt).toTimeString()}` : "null"}/>
                    <InfoBlock title="Last Updated" content={lesson != null ? `${new Date(lesson.updatedAt).toDateString()} ${new Date(lesson.updatedAt).toTimeString()}` : "null"}/>
                    <InfoBlock title="Lesson Description" content={lesson != null ? lesson.description : "null"}/>
                    <InfoBlock title="Reading List" content={lesson != null ? lesson.readingList.length > 0 ? lesson.readingList : "No Reading List" : "No Reading List"}/>
                    <InfoBlock title="Assignments" content={lesson != null ? lesson.assignments.length > 0 ? lesson.assignments : "No Assignments" : "No Assignments"}/>
                    <InfoBlock title="Prerequisites" content={lesson != null ? lesson.prerequisites.length > 0 ? lesson.prerequisites : "No Prerequisites" : "No Prerequisites"}/>
                </div>
            </div>

            {showDelete && <MessageBox onCancel={() => setShowDelete(false)} onConfirm={handleDelete}/>}
        </div>
    );
}

export default ViewLesson;