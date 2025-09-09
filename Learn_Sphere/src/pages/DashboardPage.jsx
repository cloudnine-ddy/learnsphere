import React, { use, useState, useEffect } from "react";
import DashbaordHeader from "../layout/DashboardHeader";
import LessonDashboard from "../dashboards/LessonDashboard";
import AddLesson from "../dashboards/AddLesson";
import AdminPortal from "../dashboards/AdminPortal";
import ViewLesson from "../dashboards/ViewLesson";
import LoginForm from "../forms/LoginForm";
import FilterDropdown from "../components/FilterDropdown";
import LessonCard from "../components/LessonCard";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getUserInfo, getAllInstructorsInfo } from "../components/manageUsers";
import { getLessons } from "../components/getLessons";
import {BrowserRouter, Routes, Route, Navigate, Link, useParams } from "react-router-dom";

import styles from "./DashboardPage.module.css";
import TokenGenerator from "../components/TokenGenerator";

function DashboardPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [instructors, setInstructors] = useState([]);
    const [currentUnits, setCurrentUnits] = useState([]);

    useEffect(() => {
    //Runs only on the first render
        getCurrentUser().then(
            (user) => {
                user != null ? setUser(user) : navigate("/reg");
                return getUserInfo(user);
            })
            .then((userInfo) => {
                setUserData(userInfo);
            });

        getAllInstructorsInfo().then(
            (instructors) => {setInstructors(instructors);}
        );

        getLessons(true).then(
            (lessons) => {setCurrentUnits(lessons);}
        );
    }, [])

    return (
        <div className={styles.mainContent}>
            <DashbaordHeader username={userData != null ? `${userData.title} ${userData.firstName} ${userData.lastName}` : "user"} />

            <div className={styles.pageContent}>

                <div className={styles.sidebar}>

                    <div className={styles.sidebarMenu}>
                        
                        <Link to="/home/courses">
                            <h3 className={styles.menuItem}>
                                <img src="../images/icons/course.png" className={styles.menuIcon} />
                                Courses
                            </h3>
                        </Link>

                        {userData != null && userData.role != "student" && 
                        <Link to="/home/newcourse">
                        <h3 className={styles.menuItem}>
                            <img src="../images/icons/lesson.png" className={styles.menuIcon} />
                            Lessons
                        </h3>
                        </Link>}

                        <h3 className={styles.menuItem}>
                            <img src="../images/icons/classroom.png" className={styles.menuIcon} />
                            Classroom
                        </h3>

                        {userData != null && userData.role != "student" && 
                        <Link to="/home/report">
                        <h3 className={styles.menuItem}>
                            <img src="../images/icons/view_report.png" className={styles.menuIcon} />
                            View Report
                        </h3>
                        </Link>}

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
                        <Routes>
                            <Route path="/" element={<Navigate to="courses" replace />} />
                            <Route path="/courses/*" element={<LessonDashboard />} />
                            <Route path="/courses/:id" element={<ViewLesson />} />
                            {userData != null && userData.role &&
                                <Route path="/newcourse" element={<AddLesson 
                                instructorList={instructors} 
                                prerequisiteOptions={currentUnits} 
                            />} />}
                            {userData != null && userData.role != "student" && 
                                <Route path="/report" element={<TokenGenerator />} 
                            />}
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;