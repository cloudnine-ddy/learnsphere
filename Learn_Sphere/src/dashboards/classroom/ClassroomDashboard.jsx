import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { getClassrooms, getClassroomByStudent } from "../../components/getClassroom";

import FilterDropdown from "../../components/selectable_addable/FilterDropdown";
import ClassroomCard from "../../components/clickable/ClassroomCard";

import styles from "./ClassroomDashboard.module.css";

const INSTRUCTOR_MY_CLASSROOMS = "INSTRUCTOR_MY_CLASSROOMS";
const STATUS_ACTIVE = "ACTIVE";
const STATUS_UPCOMING = "UPCOMING";
const STATUS_COMPLETED = "COMPLETED";

function ClassroomDashboard({ userData }) {
  const [filter, setFilter] = useState(true);
  const [label, setLabel] = useState("All Classrooms");
  const [classrooms, setClassrooms] = useState([]);

  const instructorDisplayName = useMemo(() => {
          if (!userData || userData.role === "student") {
              return "";
          }
  
          const parts = [userData.title, userData.firstName, userData.lastName].filter(Boolean);
          return parts.join(" ").replace(/\s+/g, " ").trim();
      }, [userData]);

  const changeEvent = (event, state) => {
    setFilter(state);
    setLabel(event.target.text);
  };




  // useEffect(() => {
  //     if (!userData) {
  //         return;
  //     }

  //     if (userData.role === "student") {
  //         getClassroomByStudent(userData.id).then((studentClassrooms) => {
  //             setClassrooms(studentClassrooms);
  //         });
  //         return;
  //     }

  //     if (filter === INSTRUCTOR_MY_COURSES) {
  //         getClassroom(true, userData).then((allClassrooms) => {
  //             const filtered = allClassrooms.filter((classroom) => {
  //                 const supervisor = classroom.data().classroomSupervisor || "";
  //                 return instructorDisplayName
  //                     ? supervisor.trim().toLowerCase() === instructorDisplayName.trim().toLowerCase()
  //                     : false;
  //             });
  //             setClassrooms(filtered);
  //         });
  //     } else {
  //         getClassroom(filter, userData).then((allClassrooms) => {
  //             setClassrooms(allClassrooms);
  //         });
  //     }
  // }, [filter, userData, instructorDisplayName]);

  const instructorOptions = [
        { label: "All Classrooms", state: true },
        { label: "My Classrooms", state: INSTRUCTOR_MY_CLASSROOMS },
        { label: "Draft", state: "Draft" },
        { label: "Published", state: "Published" },
        { label: "Archived", state: "Archived" }
    ];

  const studentOptions = [
      { label: "All Classrooms", state: true }
  ];

  const filterOptions = userData?.role === "student" ? studentOptions : instructorOptions;




  // temporary wannnnnnnnnnnn
  useEffect(() => {
    const testData = [
        {
        id: "mock-id-001",
        classroomName: "Biology Year 10",
        courseTitle: "Biology",
        supervisor: "Dr. John Smith",
        status: "Published"
        },
        {
        id: "mock-id-002",
        classroomName: "Physics Lab Group A",
        courseTitle: "Physics",
        supervisor: "Dr. Jane Doe",
        status: "Published"
        }
    ];
    setClassrooms(testData);
    }, []);

















  return (
    <>
      <div className={styles.infoHeader}>
        <div className={styles.infoTitleRow}>
          <div className={styles.infoTitle}>My Classrooms</div>
          {userData?.role !== "student" && (
            <Link to="/home/classrooms/new" className={styles.actionButton}>
              Create Classroom
            </Link>
          )}
        </div>
        {userData && <FilterDropdown label={label} options={filterOptions} changeEvent={changeEvent} />}
      </div>

      <div className={styles.infoScroll}>
        <div className={styles.cardContainer}>
          {classrooms.map((classroom) => (
            <ClassroomCard
              key={classroom.id}
              classroomId={classroom.id}
              classroomName={classroom.classroomName}
              courseTitle={classroom.courseTitle}
              supervisor={classroom.supervisor}
              href={`/home/classrooms/${classroom.id}` }
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ClassroomDashboard;
