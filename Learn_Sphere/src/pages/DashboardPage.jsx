import React from "react";
import DashbaordHeader from "../layout/DashboardHeader";
import LessonDashboard from "../dashboards/LessonDashboard";
import AddLesson from "../dashboards/AddLesson";
import AdminPortal from "../dashboards/AdminPortal";

import LoginForm from "../forms/LoginForm";
import FilterDropdown from "../components/FilterDropdown";
import LessonCard from "../components/LessonCard";

import styles from "./DashboardPage.module.css";

function DashboardPage() {
    return (
        <div className={styles.mainContent}>
            <DashbaordHeader username="Mr. Monash" />

            <div className={styles.pageContent}>

                <div className={styles.sidebar}>

                    <div className={styles.sidebarMenu}>
                        
                        <h3 className={styles.menuItem}>
                            <img src="../images/icons/course.png" className={styles.menuIcon} />
                            Courses
                        </h3>

                        <h3 className={styles.menuItem}>
                            <img src="../images/icons/lesson.png" className={styles.menuIcon} />
                            Lessons
                        </h3>

                        <h3 className={styles.menuItem}>
                            <img src="../images/icons/classroom.png" className={styles.menuIcon} />
                            Classroom
                        </h3>

                        <h3 className={styles.menuItem}>
                            <img src="../images/icons/view_report.png" className={styles.menuIcon} />
                            View Report
                        </h3>

                    </div>

                    <div className={styles.sidebarBottom}>
                        <h3 className={styles.menuItem}>
                            <img src="../images/icons/logout.png" className={styles.menuIcon} />
                            Log out
                        </h3>
                    </div>
                </div>

                <div className={styles.contentArea}>
                    <div className={styles.infoSection}>
                        {/* <LessonDashboard /> */}
                        {/* <AddLesson 
                            instructorList={["currentUser", "Prof. John", "Dr. Smith"]} 
                            prerequisiteOptions={["Math 101", "CS 201", "Bio 303"]} 
                        /> */}
                        <AdminPortal />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;