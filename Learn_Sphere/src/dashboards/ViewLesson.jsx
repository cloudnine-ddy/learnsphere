import React, {useState, useEffect} from "react";

import Button from "../components/Button";

import styles from "./ViewLesson.module.css";
import InfoBlock from "../components/InfoBlock";
import { getLesson } from "../components/getLessons";
import { useParams } from "react-router-dom";
import { getCurrentUser, getUserInfo } from "../components/manageUsers";

function ViewLesson() {
    const {id} = useParams();
    const [lesson, setLesson] = useState(null);
    const [canEdit, setEdit] = useState(false);
    
    useEffect(() => {
        //Runs only on the first render
        getLesson(id).then(
            (lesson) => {
                setLesson(lesson);
            });
            
        getCurrentUser().then(
            (user) => {
                return getUserInfo(user);
            })
            .then((info) => {
                if (info.role != "student")
                {
                    setEdit(true);
                }
            });
    }, []);

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
                    {canEdit && <button className={styles.smallButton} style={{background: "#beb2a4", marginLeft: "auto"}}>Edit</button>}
                    {canEdit && <button className={styles.smallButton}>Delete</button>}

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
        </div>
    );
}

export default ViewLesson;