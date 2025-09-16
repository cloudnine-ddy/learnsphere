import React, { use, useState, useEffect } from "react";

import {BrowserRouter, Routes, Route, Navigate, Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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



function DashboardPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [instructors, setInstructors] = useState([]);
    const [currentUnits, setCurrentUnits] = useState([]);

    useEffect(() => {
      //Runs only on the first render or everytime the user is changed
      getCurrentUser()
        .then((user) => {
          user != null ? setUser(user) : navigate("/reg");
          return getUserInfo(user); 
        //   TODO: wanna ask cen yee no need check null or not meh
        })
        .then((userInfo) => {
          setUserData(userInfo);
        });
        
      getAllInstructorsInfo().then((instructors) => {
        setInstructors(instructors);
      });

      getLessons(true, userData).then((lessons) => {
        setCurrentUnits(lessons);
      });
    }, [user]);

    const logOutUser = () => {
        logOut();
        setUser(null);
        setUserData(null);
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

                        {userData != null && userData.role != "student" && 
                        <Link to="/home/courses">
                        <h3 className={styles.menuItem}>
                            <img src="../images/icons/lesson.png" className={styles.menuIcon} />
                            Course
                        </h3>
                        </Link>}

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
                        <Routes>
                            <Route path="/" element={<Navigate to="lessons" replace />} />
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
                            {userData != null && userData.role != "student" &&
                                <Route path="/courses/:id/edit" element={<EditCourse instructorList={instructors} prerequisiteOptions={currentUnits}/>}/>}

                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;