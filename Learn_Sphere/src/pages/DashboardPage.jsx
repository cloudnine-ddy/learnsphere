import React, { use, useState, useEffect } from "react";
import DashbaordHeader from "../layout/DashboardHeader";
import LessonDashboard from "../dashboards/LessonDashboard";
import AddLesson from "../dashboards/AddLesson";
import LoginForm from "../forms/LoginForm";
import FilterDropdown from "../components/FilterDropdown";
import LessonCard from "../components/LessonCard";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getUserInfo} from "../components/manageUsers";

import styles from "./DashboardPage.module.css";

function DashboardPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
    //Runs only on the first render
        getCurrentUser().then(
            (user) => {
                user != null ? setUser(user) : navigate("/reg");
            }
        )
    }, []);

    return (
        <div className={styles.mainContent}>
            <DashbaordHeader username={user != null ? getUserInfo(user).data().firstName : "user"} />

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
                        <AddLesson 
                            instructorList={["currentUser", "Prof. John", "Dr. Smith"]} 
                            prerequisiteOptions={["Math 101", "CS 201", "Bio 303"]} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;