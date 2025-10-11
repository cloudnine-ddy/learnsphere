import React, { useEffect, useMemo, useState } from "react";

import { Routes, Route, Navigate, Link, useNavigate, useParams } from "react-router-dom";

import { getCurrentUser, getUserInfo, getAllInstructorsInfo, logOut, getAllStudentsInfo } from "../components/manageUsers";
import { getLessons } from "../components/getLessons";
import { getClassroom } from "../components/getClassroom";

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

import ClassroomDashboard from "../dashboards/classroom/ClassroomDashboard";
import { addClassroomsToDatabase } from "../components/addClassrooms";
import EditClassroom from "../dashboards/classroom/EditClassroom";
import ViewClassroom from "../dashboards/classroom/ViewClassroom";
import AddClassroom from "../dashboards/classroom/AddClassroom";
import JoinClassroom from "../dashboards/classroom/JoinClassroom";

import ReportDashboard from "../dashboards/ReportDashboard";
import ControlPanel from "../dashboards/admin/ControlPanel";
import JoinCourse from "../dashboards/course/JoinCourse";
import { getCourses } from "../components/getCourses";

function DashboardPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [instructors, setInstructors] = useState([]);
    const [students, setStudents] = useState([]);
    const [currentUnits, setCurrentUnits] = useState([]);
    const [courses, setCourses] = useState([]);
    const [classrooms, setClassrooms] = useState([]);

    // User
    useEffect(() => {
        let cancelled = false;

        async function resolveCurrentUser() {
            try {
                const currentUser = await getCurrentUser();

                if (cancelled) {
                    return;
                }

                if (currentUser?.uid !== user?.uid) {
                    if (!currentUser) 
                    {
                        navigate("/reg");
                    }
                    else
                    {
                        setUser(currentUser);
                    }
                }
                else if (currentUser == None && user == None)
                {
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
    }, []);


    // User Data
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


    // Get ALL Instructors
    useEffect(() => {
        console.log("Getting instructors");
        if (!userData) {
            setInstructors([]);
            return;
        }

        let cancelled = false;

        getAllStudentsInfo()
            .then((list) => {
                if (!cancelled) {
                    setStudents(list || []);
                }
            })
            .catch((error) => {
                console.error("Failed to load instructors:", error);
            });

        if (userData.role !== "student") {
            getAllInstructorsInfo()
                .then((list) => {
                    if (!cancelled) {
                        setInstructors(list || []);
                    }
                })
                .catch((error) => {
                    console.error("Failed to load instructors:", error);
                });
        }

        return () => {
            cancelled = true;
        };
    }, [userData]);


    // Get ALL Units
    useEffect(() => {
        console.log("Getting units");
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

        getCourses(true, userData)
            .then((courses) => {
                if (!cancelled) {
                    setCourses(courses);
                }
            })
            .catch((error) => {
                console.error("Failed to load courses:", error)
            })

        return () => {
            cancelled = true;
        };
    }, [userData]);



    const logOutUser = async () => {
        console.log("Logging out");
        setUser(null);            // reset user
        await logOut();           // clear session            
        navigate("/reg");         // THEN redirect
        console.log("Tried to go out");
    };
    
    // const handleViewClassroom = (room) => {
    //     const targetId = room?.id || room?.classroomId;
    //     if (targetId) {
    //         navigate(`/home/classrooms/${targetId}`);
    //     }
    // };

    // const handleEditClassroom = (room) => {
    //     const targetId = room?.id || room?.classroomId;
    //     if (targetId) {
    //         navigate(`/home/classrooms/${targetId}/edit`);
    //     }
    // };

    // const ViewClassroomRoute = () => {
    //     const { id } = useParams();
    //     const classroom = classrooms.find((room) => room.id === id || room.classroomId === id);
    //     return <ViewClassroom userData={userData} classroomData={classroom} classrooms={classrooms} />;
    // };

    // const EditClassroomRoute = () => {
    //     const { id } = useParams();
    //     const classroom = classrooms.find((room) => room.id === id || room.classroomId === id);
    //     return (
    //         <EditClassroom
    //             initialData={classroom}
    //             classrooms={classrooms}
    //             courseOptions={courseTitles}
    //             lessonOptions={lessonsForForms}
    //             instructorOptions={instructorNames}
    //             defaultSupervisor={userData ? `${userData.title ?? ""} ${userData.firstName ?? ""} ${userData.lastName ?? ""}`.replace(/\s+/g, " ").trim() : ""}
    //             onSubmit={(payload) => console.log("TODO update classroom", payload)}
    //         />
    //     );
    // };

    const mockStudentUser = {
        id: "mock-student-001",
        role: "student",
        firstName: "Tom",
        lastName: "Lee",
        //   title: "Mr.",
        classroomList: ["mock-classroom-001", "mock-classroom-002"]
    };

    const mockInstructorUser = {
        id: "mock-student-001",
        role: "instructor",
        firstName: "Tom",
        lastName: "Lee",
        title: "Mr.",
        classroomList: ["mock-classroom-001", "mock-classroom-002"]
    };

    const mockCurrentUnits = ["a", "b", "c"]


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

                        <Link to="/home/classrooms">
                            <h3 className={styles.menuItem}>
                                <img src="../images/icons/classroom.png" className={styles.menuIcon} />
                                Classroom
                            </h3>
                        </Link>

                        {userData != null && userData.role != "student" && 
                        <Link to="/home/report">
                            <h3 className={styles.menuItem}>
                                <img src="../images/icons/view_report.png" className={styles.menuIcon} />
                                Report
                            </h3>
                        </Link>}

                        {userData != null && userData.role === "admin" &&
                            <Link to="/home/control">
                                <h3 className={styles.menuItem}>
                                    <img src="../images/icons/control_panel.png" className={styles.menuIcon} />
                                    Control Panel
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

                                <Route path="/" element={<Navigate to="lessons" />} />



                                <Route path="/lessons/*" element={<LessonDashboard userData={userData} />} />
                                <Route path="/lessons/:id" element={<ViewLesson userData={userData} />} />
                                {userData.role !== "student" &&
                                    <Route path="/newlesson" element={<AddLesson instructorList={instructors} prerequisiteOptions={currentUnits} />} />}

                                {userData.role !== "student" &&
                                    <Route path="/lessons/:id/edit" element={<EditLesson instructorList={instructors} prerequisiteOptions={currentUnits} />} />}



                                <Route path="/courses/*" element={<CourseDashboard userData={userData} />} />
                                <Route path="/courses/:id" element={<ViewCourse userData={userData} />} />
                                {userData.role !== "student" &&
                                    <Route path="/courses/:id/edit" element={<EditCourse instructorList={instructors} prerequisiteOptions={currentUnits} />} />}
                                {userData.role !== "student" &&
                                    <Route path="/newcourse" element={<AddCourse instructorList={instructors} prerequisiteOptions={currentUnits} />} />}
                                {userData.role === "student" &&
                                    <Route path="/joincourse" element={<JoinCourse userData={userData} />} />}



                                <Route path="/classrooms" element={<ClassroomDashboard userData={userData} />} />
                                <Route path="/classrooms/:id" element={<ViewClassroom userData={userData} />} />
                                {userData.role !== "student" &&
                                    <Route path="/classrooms/:id/edit" element={<EditClassroom userData={userData} studentList = {students} instructorList={instructors} currentUnits={currentUnits}/>} />}
                                {userData.role !== "student" &&
                                    <Route path="/newclassroom" element={<AddClassroom  courseOptions={courses} lessonOptions={currentUnits} instructorList={instructors} studentOptions={students} />} />}
                                {userData.role === "student" &&
                                    <Route path="/joinclassroom" element={<JoinClassroom userData={userData}/>} />}


                                {userData.role !== "student" &&
                                    <Route path="/report" element={<ReportDashboard />} />}


                                {userData.role === "admin" &&
                                    <Route path="/control" element={<ControlPanel students={students} instructors={instructors}/>} />}
                            </Routes>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
