import React, {useState, useEffect} from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getClassroom } from "../../components/getClassroom";
import { getCurrentUser, getUserInfo } from "../../components/manageUsers";
import { getLessonByIDAndName } from "../../components/getLessons";


import styles from "./ViewClassroom.module.css";

import InfoBlock from "../../components/display/InfoBlock";
import LessonCard from "../../components/clickable/LessonCard";

function ViewClassroom({ userData }) {
  let navigate = useNavigate();

  const { id } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
      //Runs on the first render only
      if (userData == null)
      {
          getCurrentUser().then(
              (user) => {
                  return getUserInfo(user);
              })
              .then((info) => {
                  userData = info;
              });
      }
  }, []);



  useEffect(() => {
      if (userData != null)
      {
          getClassroom(id, userData).then(
          (classroom) => {
                setClassroom(classroom);
                if (classroom == null)
                {
                    navigate("/home");
                }
          }); 
      }
  }, [userData])

    useEffect(() => {
        if (userData != null && classroom != null) {
            Promise.all(
                classroom.classroom_lessons.map((lessonString) =>
                    getLessonByIDAndName(lessonString, userData)
                )
            ).then((results) => {
                setLessons(results.filter(Boolean)); // remove nulls
            });
        }
    }, [userData]);

  // const handleDelete = () => {
  // }

/*   // temporary wannnnnnnnnnnn
  useEffect(() => {
    const testData = 
        {
        id: "mock-id-001",
        description: "bibibiiiiiiiiiiiiiiiiiiiiiiii",
        classroomName: "Biology Year 10",
        courseTitle: "Biology",
        supervisor: "Dr. John Smith",
        status: "Published",
        lessons: ["Genetic"],
        // lessons: ["Genetics", "Cell Structure", "Photosynthesis"],
        students: ["Tommy", "Lucy", "Ali", "Min-Jae"],
        classroomStartingDate: 1111-12-12,
        classroomCreateDate: 1111-12-12,
        classroomUpdateDate: 1111-12-12
        }
    ;
    setClassroom(testData);
      }, []); */




  const handleEdit = () => {
        console.log("Editing classroom with id: " + id)
        navigate(`/home/classrooms/${id}/edit`, { state: {classroom}}) ;
  }

  // const handleCancelJoin = async () => {
  // }

  const handleBack = () => {
        navigate(-1);
    }

  const durationDisplay =
        classroom != null
            ? classroom.durationWeeks ??
              classroom.classroom_durationWeeks ??
              classroom.classroomDurationWeeks ??
              "No Duration"
            : "No Duration";

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoHeader}>

          <div className={styles.smallRow}>
              {classroom != null ? classroom.classroom_id : "null"}
          </div>
          <div className={styles.bigRow}>
              <div className={styles.courseTitle}>
                  {classroom != null ? classroom.classroom_name : "null"}
              </div>
              <div className={styles.courseStatus}>
                  {classroom != null ? classroom.classroom_status : "null"}
              </div>
              {userData != null && userData.role != 'student' && <button className={styles.smallButton} style={{background: "#beb2a4", marginLeft: "auto"}} onClick = {handleEdit}>Edit</button>}
              {userData != null && userData.role != 'student' && <button className={styles.smallButton} onClick={() => setShowDelete(true)}>Delete</button>}
              {userData != null && userData.role == 'student' && (
                  <button
                      className={styles.cancelEnrollButton}
                      type="button"
                      onClick={() => setShowCancelConfirm(true)}
                  >
                      Cancel Join
                  </button>
              )}
          </div>

      </div>
      

      <div className={styles.infoScroll}>
          <div className={styles.container}>
            <InfoBlock title="Course"           content={classroom != null ? classroom.classroom_course : "null"}/>
            <InfoBlock title="Supervisor"       content={classroom != null ? classroom.classroom_instructor : "null"}/>
            <InfoBlock title="Date Created"     content={classroom != null ? `${new Date(classroom.classroom_createdDate).toDateString()} ${new Date(classroom.classroom_createdDate).toTimeString()}` : "null"}/>
            <InfoBlock title="Last Updated"     content={classroom != null ? `${new Date(classroom.classroom_updatedDate).toDateString()} ${new Date(classroom.classroom_updatedDate).toTimeString()}` : "null"}/>
            <InfoBlock title="Starting Date"    content={classroom != null ? `${new Date(classroom.classroom_startDate).toDateString()} ${new Date(classroom.classroom_startDate).toTimeString()}` : "null"}/>
            <InfoBlock title="Duration (weeks)" content={durationDisplay}/>
            <InfoBlock title="Description"      content={classroom != null ? classroom.classroom_description : "null"}/>
            <InfoBlock title="Students"         content={classroom != null ? classroom.classroom_students?.length > 0 ? classroom.classroom_students : "No Student" : "No Student"}/>
            <InfoBlock title="Lesson included" />

            <div className={styles.cardContainer}>
                {lessons?.map((lesson) => <LessonCard key={lesson.id} lessonID={lesson.data().lessonID} lessonTitle={lesson.data().title} creditPoint={lesson.data().creditPoint} instructorName={lesson.data().owner} href={`/home/lessons/${lesson.id}`}/>)}
            </div>
              



          </div>
      </div>

      <div className={styles.pageFooter}>
          <button type="button" className={styles.backButton} onClick={handleBack}>
              <img src="images/icons/goback.png" alt="Back" className={styles.backIcon} />
              <span>Back</span>
          </button>
      </div>

      {/* {showDelete && <MessageBox onCancel={() => setShowDelete(false)} onConfirm={handleDelete}/>}
      {showCancelConfirm && (
          <MessageBox
              label="Cancel Enrollment"
              message={`Are you sure you want to leave ${course?.courseTitle ?? "this course"}?`}
              button_1="Keep Course"
              button_2="Confirm"
              onCancel={() => setShowCancelConfirm(false)}
              onConfirm={handleCancelEnrollment}
          />
      )} */}
  </div>
    // <div className={styles.wrapper}>
    //   <div className={styles.infoHeader}>
    //     <div className={styles.smallRow}>{classroom.id || "Classroom"}</div>
    //     <div className={styles.bigRow}>
    //       <div className={styles.classroomTitle}>{classroom.classroomName || "Untitled Classroom"}</div>
    //       <div className={styles.courseBadge}>{classroom.courseTitle || "—"}</div>
    //     </div>
    //   </div>

    //   <div className={styles.infoScroll}>
    //     <div className={styles.container}>
    //       <div className={styles.summaryGrid}>
    //         <InfoBlock title="Course" content={classroom.courseTitle || "—"} />
    //         <InfoBlock title="Supervisor" content={classroom.supervisor || "—"} />
    //         <InfoBlock title="Schedule" content={classroom.scheduleLabel} />
    //         <InfoBlock title="Students" content={classroom.students?.length?.toString()} />
    //       </div>

    //       <div className={styles.sectionRow}>
            // <section className={styles.section}>
            //   <h2 className={styles.sectionTitle}>Lessons in this classroom</h2>
            //   {classroom.lessons?.length === 0 ? (
            //     <p className={styles.emptyMessage}>No lessons have been added yet.</p>
            //   ) : (
            //     <ul className={styles.itemList}>
            //       {classroom.lessons?.map((lesson) => (
            //         <li key={lesson} className={styles.item}>
            //           {lesson}
            //         </li>
            //       ))}
            //     </ul>
            //   )}
            // </section>

    //         <section className={styles.section}>
    //           <h2 className={styles.sectionTitle}>Students in this classroom</h2>
    //           {classroom.students?.length === 0 ? (
    //             <p className={styles.emptyMessage}>No students have been assigned yet.</p>
    //           ) : (
    //             <ul className={styles.itemList}>
    //               {classroom.students?.map((student) => (
    //                 <li key={student} className={styles.item}>
    //                   {student}
    //                 </li>
    //               ))}
    //             </ul>
    //           )}
    //         </section>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default ViewClassroom;
