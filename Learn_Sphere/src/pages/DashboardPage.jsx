import React, { useState, useEffect } from "react";

import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";

import { getCurrentUser, getUserInfo, getAllInstructorsInfo, logOut } from "../components/manageUsers";
import { getLessons } from "../components/getLessons";

import styles from "./DashboardPage.module.css";

import DashbaordHeader from "../layout/DashboardHeader";

import LessonDashboard from "../dashboards/lesson/LessonDashboard";
import AddLesson from "../dashboards/lesson/AddLesson";
import EditLesson from "../dashboards/lesson/EditLesson";
import ViewLesson from "../dashboards/lesson/ViewLesson";

import CourseDashboard from "../dashboards/course/CourseDashboard";
import AddCourse from "../dashboards/course/AddCourse";
import EditCourse from "../dashboards/course/EditCourse";
import ViewCourse from "../dashboards/course/ViewCourse";

import AdminPortal from "../dashboards/admin/AdminPortal";
import JoinCourse from "../dashboards/course/JoinCourse";

function DashboardPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [instructors, setInstructors] = useState([]);
    const [currentUnits, setCurrentUnits] = useState([]);

    useEffect(() => {
        let cancelled = false;

        async function resolveCurrentUser() {
            try {
                const currentUser = await getCurrentUser();

                if (cancelled) {
                    return;
                }

                if (currentUser) {
                    setUser(currentUser);
                } else {
                    navigate("/reg");
                }
            } catch (error) {
                console.error("Failed to get current user:", error);
                if (!cancelled) {
                    navigate("/reg");
                }
            }
        }

        resolveCurrentUser();

        return () => {
            cancelled = true;
        };
    }, [navigate]);

    useEffect(() => {
        if (!user) {
            setUserData(null);
            return;
        }

        let cancelled = false;

        async function fetchUserData() {
            try {
                const info = await getUserInfo(user);

                if (!cancelled) {
                    setUserData(info || null);
                }
            } catch (error) {
                console.error("Failed to get user info:", error);
            }
        }

        fetchUserData();

        return () => {
            cancelled = true;
        };
    }, [user]);

    useEffect(() => {
        if (!userData || userData.role === "student") {
            setInstructors([]);
            return;
        }

        let cancelled = false;

        getAllInstructorsInfo()
            .then((list) => {
                if (!cancelled) {
                    setInstructors(list || []);
                }
            })
            .catch((error) => {
                console.error("Failed to load instructors:", error);
            });

        return () => {
            cancelled = true;
        };
    }, [userData]);

    useEffect(() => {
        if (!userData || userData.role === "student") {
            setCurrentUnits([]);
            return;
        }

        let cancelled = false;

        getLessons(true, userData)
            .then((lessons) => {
                if (!cancelled) {
                    setCurrentUnits(lessons || []);
                }
            })
            .catch((error) => {
                console.error("Failed to load lessons:", error);
            });

        return () => {
            cancelled = true;
        };
    }, [userData]);

    const logOutUser = () => {
        logOut();
    };

    return (
        <div className={styles.mainContent}>
            <DashbaordHeader username={userData != null ? `${userData.title} ${userData.firstName} ${userData.lastName}` : "user"} />

            <div className={styles.pageContent}>

                <div className={styles.sidebar}>

                    <div className={styles.sidebarMenu}>
                        
                        <Link to="/home/lessons">
                            <h3 className={styles.menuItem}>
                                <img src="../images/icons/course.png" className={styles.menuIcon} />
                                Lesson
                            </h3>
                        </Link>

                        <Link to="/home/courses">
                        <h3 className={styles.menuItem}>
                            <img src="../images/icons/lesson.png" className={styles.menuIcon} />
                            Course
                        </h3>
                        </Link>

                        {/* <h3 className={styles.menuItem}>
                            <img src="../images/icons/classroom.png" className={styles.menuIcon} />
                            Classroom
                        </h3> */}

                        {userData != null && userData.role != "student" && 
                        <Link to="/home/report">
                        <h3 className={styles.menuItem}>
                            <img src="../images/icons/view_report.png" className={styles.menuIcon} />
                            Admin Portal
                        </h3>
                        </Link>}

                    </div>

                    <div className={styles.sidebarBottom}>
                        <Link onClick={logOutUser}>
                            <h3 className={styles.menuItem}>
                                <img src="../images/icons/logout.png" className={styles.menuIcon} />
                                Log Out
                            </h3>
                        </Link>
                    </div>
                </div>

                <div className={styles.contentArea}>
                    <div className={styles.infoSection}>
                        {userData != null &&
                            <Routes>
                                <Route path="/" element={<Navigate to="lessons"/>} />
                                <Route path="/lessons/*" element={<LessonDashboard userData={userData} />} />
                                <Route path="/lessons/:id" element={<ViewLesson userData={userData} />} />
                                {userData != null && userData.role != "student" &&
                                    <Route path="/newlesson" element={<AddLesson instructorList={instructors} prerequisiteOptions={currentUnits} />} />}
                                {userData != null && userData.role != "student" && 
                                    <Route path="/report" element={<AdminPortal />} />}
                                {userData != null && userData.role != "student" &&
                                    <Route path="/lessons/:id/edit" element={<EditLesson instructorList={instructors} prerequisiteOptions={currentUnits}/>}/>}
                                
                                <Route path="/courses/*" element={<CourseDashboard userData={userData} />} />
                                <Route path="/courses/:id" element={<ViewCourse userData={userData} />} />
                                {userData != null && userData.role != "student" &&
                                    <Route path="/newcourse" element={<AddCourse instructorList={instructors} prerequisiteOptions={currentUnits} />} />}
                                {userData != null && userData.role == "student" &&
                                    <Route path="/joincourse" element={<JoinCourse userData={userData}/>} />}
                                {userData != null && userData.role != "student" &&
                                    <Route path="/courses/:id/edit" element={<EditCourse instructorList={instructors} prerequisiteOptions={currentUnits}/>}/>}

                            </Routes>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
