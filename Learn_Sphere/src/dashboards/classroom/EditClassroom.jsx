import React, { useState, useEffect } from "react";
import { useMemo } from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";


import { getListOfCoursesFromStudent } from "../../components/getStudentCourse";
import { getCurrentUser, getUserInfo } from "../../components/manageUsers";
import { updateClassroomInDatabase } from "../../components/updateClassrooms";
import { getCourses } from "../../components/getCourses";

import styles from "./EditClassroom.module.css";

import InputField from "../../components/typable/InputField";
import TextArea from "../../components/typable/TextArea";
import AddFromList from "../../components/selectable_addable/AddFromList";
import SelectOneFromList from "../../components/selectable_addable/SelectOneFromList";
import SelectStatus from "../../components/selectable_addable/SelectStatus";
import Button from "../../components/clickable/Button";

function EditClassroom( { userData, studentList, instructorList, currentUnits }) {
  
  let navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const classroomData = location.state.classroom;
  const [isEnabled, setEnabled] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);
  const [classroom, setClassroom] = useState({
    classroom_id: classroomData?.classroom_id || "",
    classroom_name: classroomData?.classroom_name || "",
    classroom_description: classroomData?.classroom_description || "",
    classroom_course: classroomData?.classroom_course || "",
    classroom_instructor: classroomData?.classroom_instructor || "",
    classroom_status: classroomData?.classroom_status || "",
    classroom_startDate: classroomData?.classroom_startDate || "",
    classroom_durationWeeks: classroomData?.classroom_durationWeeks || 6,
    classroom_lessons: classroomData?.classroom_lessons || [],
    classroom_students: classroomData?.classroom_students || [],
  });







  // What ?????
  // What ?????
  // What ?????
  // What ?????
  // What ?????
  // What ?????
  // What ?????
  // What ?????

  const [filter, setFilter] = useState(true);
  const instructorDisplayName = useMemo(() => {
    if (!userData || userData.role === "student") {
      return "";
    }

    const parts = [
      userData.title,
      userData.firstName,
      userData.lastName,
    ].filter(Boolean);
    return parts.join(" ").replace(/\s+/g, " ").trim();
  }, [userData]);

  const INSTRUCTOR_MY_COURSES = "INSTRUCTOR_MY_COURSES";

  // const instructorNames = useMemo(() => {
  //   return instructorList?.map((i) => `${i.firstName} ${i.lastName}`) || [];
  // }, [instructorList]);

  

  const [classroomLessons, setClassroomLessons] = useState(
    classroomData?.classroom_lessons || []
  );

  // async function submitForm(e)
  // {
  //     if (isValid()){
  //       await updateClassroomInDatabase(id, classroom);
  //         // const updates = {
  //         //     id: classroom.id,
  //         //     classroom_description: classroom.classroom_description,
  //         //     classroom_name: classroom.classroom_name,
  //         //     classroom_course: classroom.classroom_course,
  //         //     classroom_instructor: classroom.classroom_instructor,
  //         //     classroom_status: classroom.classroom_status,
  //         //     classroom_lessons: classroom_lessons,
  //         //     classroom_students: classroom_students,
  //         //     classroom_startDate: classroom.classroom_startDate,
  //         //     classroomCreateDate: classroom.classroomCreateDate,
  //         //     classroomUpdateDate: classroom.classroomUpdateDate,
  //         //     classroom_durationWeeks: classroom.classroom_durationWeeks
  //         // };

  //         console.log(updates);
  //         updateClassroomInDatabase(id, updates)
  //         .then(() => {
  //             setErrorMessages(["Successfully updated a classroom!"]);
  //             navigate(`/home/classrooms/${id}`);
  //         })
  //         .catch((error) => setErrorMessages([error]));
  //         } else {
  //             setErrorMessages(["Missing and invalid values! Check the form again."]);
  //         }
  // };



  // const resolvedData = useMemo(() => {
  //   if (initialData) {
  //     return initialData;
  //   }

  //   if (!id) {
  //     return null;
  //   }

  //   return classrooms.find((room) => room.id === id || room.classroom_id === id) || null;
  // }, [classrooms, id, initialData]);

  // const [selectedLessons, setSelectedLessons] = useState(() => resolvedData?.classroom_lessons || []);
  // const [selectedStudents, setSelectedStudents] = useState(() => resolvedData?.classroom_students || []);
  // const [studentInput, setStudentInput] = useState("");

  // const lessonOptionStrings = useMemo(() => {
  //   if (!lessonOptions || lessonOptions.length === 0) {
  //     return [];
  //   }

  //   return lessonOptions.map((lesson) => {
  //     if (typeof lesson === "string") {
  //       return lesson;
  //     }

  //     const data = typeof lesson?.data === "function" ? lesson.data() : lesson || {};
  //     const lessonID = data.lessonID || lesson.lessonID || lesson.id;
  //     const lessonTitle = data.title || lesson.title || "Untitled Lesson";

  //     return lessonID && lessonTitle ? `${lessonID}: ${lessonTitle}` : lessonTitle || lessonID || "Lesson";
  //   });
  // }, [lessonOptions]);

  // const courseList = useMemo(
  //   () => ["", ...courseOptions.filter(Boolean)],
  //   [courseOptions]
  // );

  // const instructorList = useMemo(
  //   () => ["", ...instructorOptions.filter(Boolean)],
  //   [instructorOptions]
  // );

  // const sortedStudentOptions = useMemo(
  //   () => Array.from(new Set(studentOptions.filter(Boolean))).sort(),
  //   [studentOptions]
  // );

  // if (!resolvedData) {
  //   return (
  //     <div className={styles.wrapper}>
  //       <div className={styles.infoHeader}>
  //         <div className={styles.infoTitle}>Edit Classroom</div>
  //       </div>
  //       <p className={styles.placeholder}>Select a classroom to edit.</p>
  //     </div>
  //   );
  // }

  // const handleClassroomChange = (event) => {
  //   const { name, value } = event.target;
  //   setClassroom((prev) => ({
  //     ...prev,
  //     [name]: value
  //   }));

  //   if (errorMessages.length > 0) {
  //     setErrorMessages([]);
  //   }
  // };

  // const handleLessonsChange = (updatedLessons) => {
  //   setSelectedLessons(updatedLessons);
  // };

  // const handleAddStudent = () => {
  //   const trimmed = studentInput.trim();
  //   if (!trimmed) {
  //     return;
  //   }

  //   if (!selectedStudents.includes(trimmed)) {
  //     setSelectedStudents((prev) => [...prev, trimmed]);
  //   }

  //   setStudentInput("");
  // };

  // const handleSelectStudent = (event) => {
  //   const value = event.target.value;
  //   if (!value) {
  //     return;
  //   }

  //   if (!selectedStudents.includes(value)) {
  //     setSelectedStudents((prev) => [...prev, value]);
  //   }

  //   event.target.value = "";
  // };

  // const handleRemoveStudent = (student) => {
  //   setSelectedStudents((prev) => prev.filter((item) => item !== student));
  // };

  // const isValid = () => {
  //   return ["classroom_id", "classroom_name", "classroom_course", "classroom_instructor"].every((key) => classroom[key]);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   if (!isValid()) {
  //     setErrorMessages(["Missing and invalid values! Check the form again."]);
  //     return;
  //   }

  //   const payload = {
  //     ...classroom,
  //     classroom_durationWeeks:
  //       classroom.classroom_durationWeeks === "" || classroom.classroom_durationWeeks === null
  //         ? ""
  //         : Number(classroom.classroom_durationWeeks),
  //     classroom_lessons: selectedLessons,
  //     classroom_students: selectedStudents
  //   };

  //   onSubmit?.(payload);
  //   navigate(`/home/classrooms/${resolvedData.id || resolvedData.classroom_id}`);
  // };

  // const handleCancel = () => {
  //   navigate(`/home/classrooms/${resolvedData.id || resolvedData.classroom_id}`);
  // };





  
  
  
  

  

  // Check Student/Instructor -> Student? Go Home
  useEffect(() => {
    //Runs only at first render to kick out classroom_students
    getCurrentUser()
      .then((user) => {
        return getUserInfo(user);
      })
      .then((info) => {
        if (info.role == "student") {
          navigate("/home");
        }
      });
  }, []);



  // Get Courses
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    if (!userData) {
      return;
    }

    if (userData.role === "student") {
      getListOfCoursesFromStudent(userData.id).then((studentCourses) => {
        setCourseList(studentCourses);
      });
      return;
    }

    if (filter === INSTRUCTOR_MY_COURSES) {
      getCourses(true, userData).then((allCourses) => {
        const filtered = allCourses.filter((course) => {
          const supervisor = course.data().courseSupervisor || "";
          return instructorDisplayName
            ? supervisor.trim().toLowerCase() ===
                instructorDisplayName.trim().toLowerCase()
            : false;
        });
        setCourseList(filtered);
      });
    } else {
      getCourses(filter, userData).then((allCourses) => {
        setCourseList(allCourses.map(c => c.data().courseName)); ///？？？
      });
    }
  }, [filter, userData, instructorDisplayName]);



  // Some Functions
  const handleSubmit = (formData) => {
    setEnabled(false);
    console.log("Submitting form with data:", formData);
  };

  const handleCancel = () => {
    navigate(`/home/classrooms/${id}`);
  };

  function submitForm(e) {
    setEnabled(false);
    if (isValid()) {
      const updates = {
        classroom_id: classroom.classroom_id,
        classroom_name: classroom.classroom_name,
        classroom_description: classroom.classroom_description,
        classroom_course: classroom.classroom_course,
        classroom_instructor: classroom.classroom_instructor,
        classroom_status: classroom.classroom_status,
        classroom_startDate: classroom.classroom_startDate,
        classroom_durationWeeks: classroom.classroom_durationWeeks,
        classroom_lessons: classroom.classroom_lessons,
        classroom_students: classroom.classroom_students,
      };

      console.log(updates);
      updateClassroomInDatabase(id, updates)
        .then(() => {
          setErrorMessages(["Successfully updated a course!"]);
          navigate(`/home/courses/${id}`);
        })
        .catch((error) => setErrorMessages([error.message] || String(error)));
    } else {
      setErrorMessages(["Missing and invalid values! Check the form again."]);
      setEnabled(true);
    }
  }

  function isValid() {
    for (const [key, value] of Object.entries(classroom)) {
      if (value == "") {
        return false;
      }
    }

    return true;
  }

  const handleClassroomChange = (e) => {
    const { name, value } = e.target;
    setClassroom((prev) => ({ ...prev, [name]: value }));

    if (errorMessages.length > 0) {
      setErrorMessages([]);
    }
  };



  

  return (
    <div className={styles.wrapper} disabled={!isEnabled}>
      <div className={styles.infoHeader}>
        <div className={styles.infoTitle}>Edit Classroom</div>
      </div>

      <div className={styles.infoScroll}>
        <div className={styles.container}>
          <InputField
            label="Classroom ID"
            id="classroom_id"
            name="classroom_id"
            value={classroom.classroom_id}
            onChange={handleClassroomChange}
          />

          <InputField
            label="Classroom Name"
            id="classroom_name"
            name="classroom_name"
            value={classroom.classroom_name}
            onChange={handleClassroomChange}
          />

          <SelectOneFromList
            label="Course"
            name="classroom_course"
            object={classroom}
            list={courseList}
            onChange={handleClassroomChange}
          />

          <SelectOneFromList
            label="Supervisor"
            name="classroom_instructor"
            object={classroom}
            list={instructorList.map(instructor => `${instructor.title} ${instructor.firstName} ${instructor.lastName}`)}
            // list={instructorList}
            onChange={handleClassroomChange}
          />

          <InputField
            label="Start Date"
            id="classroom_startDate"
            name="classroom_startDate"
            type="date"
            value={classroom.classroom_startDate}
            onChange={handleClassroomChange}
          />

          <InputField
            label="Duration (weeks)"
            id="classroom_durationWeeks"
            name="classroom_durationWeeks"
            type="number"
            value={classroom.classroom_durationWeeks}
            onChange={handleClassroomChange}
            min={1}
          />

          <AddFromList
            label="Add Lesson"
            placeholder="Select lesson to include"
            prerequisites={classroomLessons}
            setPrerequisites={setClassroomLessons}
            prerequisiteOptions={currentUnits.map(
                        option => `${option.data().lessonID}: ${option.data().title}`)}
          />

          <SelectStatus
            name="classroom_status"
            label="Status"
            object={classroom}
            onChange={handleClassroomChange}
          />

          {/* <div className={styles.sectionRow}>
                      
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Students in this classroom</h2>

              <div className={styles.studentControlRow}>
                <div className={styles.studentInputWrapper}>
                  <label className={styles.label} htmlFor="student-input">
                    Add Student
                  </label>
                  <input
                    id="student-input"
                    className={styles.input}
                    type="text"
                    placeholder="Enter student email or ID"
                    value={studentInput}
                    onChange={(event) => setStudentInput(event.target.value)}
                  />
                </div>
                <button type="button" className={styles.addStudentButton} onClick={handleAddStudent}>
                  Add
                </button>
              </div>

              {sortedStudentOptions.length > 0 && (
                <div className={styles.suggestionRow}>
                  <label className={styles.label} htmlFor="student-suggestions">
                    Choose existing student
                  </label>
                  <select
                    id="student-suggestions"
                    className={styles.select}
                    defaultValue=""
                    onChange={handleSelectStudent}
                  >
                    <option value="" disabled>
                      Select student
                    </option>
                    {sortedStudentOptions.map((student) => (
                      <option key={student} value={student}>
                        {student}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedStudents.length === 0 ? (
                <p className={styles.emptyMessage}>No classroom_students have been assigned yet.</p>
              ) : (
                <ul className={styles.studentList}>
                  {selectedStudents.map((student) => (
                    <li key={student} className={styles.studentItem}>
                      <span>{student}</span>
                      <button
                        type="button"
                        className={styles.removeStudentButton}
                        onClick={() => handleRemoveStudent(student)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section> */}
          {/* </div> */}
        </div>
      </div>
      <div className={styles.infoFooter}>
        {/* <button type="button" className={styles.backButton} onClick={goback}>
            <img src="images/icons/goback.png" alt="Back" className={styles.backIcon} />
            <span>Back</span>
          </button> */}
        <button
          onClick={handleCancel}
          className={styles.smallButton}
          style={{ background: "#beb2a4", marginLeft: "auto" }}
        >
          Cancel
        </button>
        <button onClick={submitForm} className={styles.smallButton}>
          Save Change
        </button>
        {errorMessages.length > 0 && (
          <div>
            {errorMessages.map((msg, idx) => (
              <p key={idx} style={{ color: "red" }}>
                {msg}
              </p>
            ))}
          </div>
        )}

        <div className={styles.footerActions}>
          {/* <Button label="Save Changes" type="submit" /> */}
        </div>
      </div>
    </div>
  );
}

export default EditClassroom;
