import React from "react";

import Button from "../components/Button";

import styles from "./ViewLesson.module.css";
import InfoBlock from "../components/InfoBlock";

function ViewLesson() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.infoHeader}>

                <div className={styles.smallRow}>
                    Lesson ID
                </div>
                <div className={styles.bigRow}>
                    <div className={styles.lessonTitle}>
                        Lesson Title
                    </div>
                    <div className={styles.lessonStatus}>
                        Status
                    </div>
                    <button className={styles.smallButton}>Edit</button>
                    <button className={styles.smallButton}>Delete</button>

                </div>

            </div>
            

            <div className={styles.infoScroll}>
                <div className={styles.container}>
                    <InfoBlock title="lesson owner" content="Dr. MCD"/>
                    <InfoBlock title="credit point" content="6"/>
                    <InfoBlock title="created date" content="day"/>
                    <InfoBlock title="edited date" content="day"/>
                    <InfoBlock title="Lesson Description" content="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"/>
                    <InfoBlock title="reading list" content={
                                                        <ul>
                                                        <li>Book A</li>
                                                        <li>Book B</li>
                                                        <li>Book C</li>
                                                        </ul>
                                                    }/>
                    <InfoBlock title="assignment list" content={
                                                        <ul>
                                                        <li>Book A</li>
                                                        <li>Book B</li>
                                                        <li>Book C</li>
                                                        </ul>
                                                    }/>
                    <InfoBlock title="prerequisite list" content={
                                                        <ul>
                                                        <li>Book A</li>
                                                        <li>Book B</li>
                                                        <li>Book C</li>
                                                        </ul>
                                                    }/>
                </div>
            </div>
        </div>
    );
}

export default ViewLesson;