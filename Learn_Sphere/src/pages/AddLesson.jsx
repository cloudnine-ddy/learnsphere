import React from "react";
import AuthHeader from "../layout/AuthHeader";
import { AddLesson } from "../components/AddLesson";

import styles from "./RegisterPage.module.css";

function LessonCreatePage() {
    return (
        <div className={styles.mainContent}>
            <AuthHeader />
            <div className={styles.pageContent}>
                <AddLesson />
            </div>
        </div>
    );
}

export default LessonCreatePage;