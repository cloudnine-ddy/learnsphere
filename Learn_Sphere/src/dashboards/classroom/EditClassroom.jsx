import React, { useState, useEffect } from "react";
import { useMemo } from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";

import { getCurrentUser, getUserInfo } from "../../components/manageUsers";

import styles from "./EditClassroom.module.css";

import InputField from "../../components/typable/InputField";
import TextArea from "../../components/typable/TextArea";
import AddFromList from "../../components/selectable_addable/AddFromList";
import SelectOneFromList from "../../components/selectable_addable/SelectOneFromList";
import Button from "../../components/clickable/Button";

function EditClassroom( { studentList, instructorList, currentUnits }) {
  const { id } = useParams();
  const filteredUnits = useMemo(() => {
    return (currentUnits || []).filter(unit => unit.id !== id);
  }, [currentUnits, id]);

  const instructorNames = useMemo(() => {
    return instructorList?.map(i => `${i.firstName} ${i.lastName}`) || [];
  }, [instructorList]);

  // currentUnits = currentUnits.filter(unit => unit.id != id);
  const location = useLocation();
  const classroomData = location.state.classroom;

  const handleCancel = () => {
      navigate(`/home/classrooms/${id}`);
  }

  const courseList = ["Math 101", "Biology A", "Programming II"];
  const selectedLessons = ["Math 101", "Biology A", "Programming II"];

  const handleSubmit = (formData) => {
    console.log("Submitting form with data:", formData);
  };

  const [classroom, setClassroom] = useState({
    id: classroomData?.id || "",
    description: classroomData?.description || "",
    classroomName: classroomData?.classroomName || "",
    courseTitle: classroomData?.courseTitle || "",
    supervisor: classroomData?.supervisor || "",
    status: classroomData?.status || "",
    classroomStartingDate: classroomData?.classroomStartingDate || 11111212,
    classroomCreateDate: classroomData?.classroomCreateDate || 11111212,
    classroomUpdateDate: classroomData?.classroomUpdateDate || 11111212,
    durationWeeks: classroomData?.durationWeeks || 6
  });

  const [lessons, setLessons] = useState(classroomData?.lessons || []);

  const [students, setStudents] = useState(classroomData?.students || []);

  let navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
  //Runs only at first render to kick out students
      getCurrentUser().then(
          (user) => {
              return getUserInfo(user);
          })
          .then((info) => {
              if (info.role == "student")
              {
                  navigate("/home");
              }
          });
  }, [])



  function submitForm(e)
  {
      if (isValid()){
          const updates = {
              id: classroom.id,
              description: classroom.description,
              classroomName: classroom.classroomName,
              courseTitle: classroom.courseTitle,
              supervisor: classroom.supervisor,
              status: classroom.status,
              lessons: lessons,
              students: students,
              classroomStartingDate: classroom.classroomStartingDate,
              classroomCreateDate: classroom.classroomCreateDate,
              classroomUpdateDate: classroom.classroomUpdateDate,
              durationWeeks: classroom.durationWeeks
          };

          console.log(updates);
          updateCourseInDatabase(id, updates)
          .then(() => {
              setErrorMessages(["Successfully updated a course!"]);
              navigate(`/home/courses/${id}`);
          })
          .catch((error) => setErrorMessages([error]));
          } else {
              setErrorMessages(["Missing and invalid values! Check the form again."]);
          }
  };

  function isValid()
  {
      for (const [key, value] of Object.entries(classroom)) {
          if (value == "")
          {
              return false;
          }
      }

      return true;
  }

  const handleclassroomChange = (e) => {
      const { name, value } = e.target;
      setClassroom(prev => ({ ...prev, [name]: value }));

      if (errorMessages.length > 0) {setErrorMessages([]);}
  };






  // const resolvedData = useMemo(() => {
  //   if (initialData) {
  //     return initialData;
  //   }

  //   if (!id) {
  //     return null;
  //   }

  //   return classrooms.find((room) => room.id === id || room.classroomId === id) || null;
  // }, [classrooms, id, initialData]);



  // const [selectedLessons, setSelectedLessons] = useState(() => resolvedData?.lessons || []);
  // const [selectedStudents, setSelectedStudents] = useState(() => resolvedData?.students || []);
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

  // const handleclassroomChange = (event) => {
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
  //   return ["classroomId", "classroomName", "courseTitle", "supervisor"].every((key) => classroom[key]);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   if (!isValid()) {
  //     setErrorMessages(["Missing and invalid values! Check the form again."]);
  //     return;
  //   }

  //   const payload = {
  //     ...classroom,
  //     durationWeeks:
  //       classroom.durationWeeks === "" || classroom.durationWeeks === null
  //         ? ""
  //         : Number(classroom.durationWeeks),
  //     lessons: selectedLessons,
  //     students: selectedStudents
  //   };

  //   onSubmit?.(payload);
  //   navigate(`/home/classrooms/${resolvedData.id || resolvedData.classroomId}`);
  // };

  // const handleCancel = () => {
  //   navigate(`/home/classrooms/${resolvedData.id || resolvedData.classroomId}`);
  // };

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoHeader}>
        <div className={styles.infoTitle}>Edit Classroom</div>
      </div>

      <form className={styles.infoScroll}>
        <div className={styles.container}>
          
            <InputField
              label="Classroom ID"
              id="classroomId"
              value={classroom.classroomId}
              onChange={handleclassroomChange}
            />

            <InputField
              label="Classroom Name"
              id="classroomName"
              value={classroom.classroomName}
              onChange={handleclassroomChange}
            />

            <SelectOneFromList
              label="Course"
              name="courseTitle"
              object={{ courseTitle: classroom.courseTitle }}
              list={courseList}
              onChange={handleclassroomChange}
            />

            <SelectOneFromList
              label="Supervisor"
              name="supervisor"
              object={{ supervisor: classroom.supervisor }}
              list={instructorNames}
              // list={instructorList}
              onChange={handleclassroomChange}
            />

            <InputField
              label="Start Date"
              id="classroomStartingDate"
              type="date"
              value={classroom.classroomStartingDate}
              onChange={handleclassroomChange}
            />

            <InputField
              label="Duration (weeks)"
              id="durationWeeks"
              type="number"
              value={classroom.durationWeeks}
              onChange={handleclassroomChange}
              min={1}
            />
          



          <AddFromList
            label="Add Lesson"
            placeholder="Select lesson to include"
            prerequisites={selectedLessons}
            setPrerequisites={setLessons}
            prerequisiteOptions={lessons}
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
                <p className={styles.emptyMessage}>No students have been assigned yet.</p>
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

        
      </form>
      <div className={styles.infoFooter}>
          {/* <button type="button" className={styles.backButton} onClick={goback}>
            <img src="images/icons/goback.png" alt="Back" className={styles.backIcon} />
            <span>Back</span>
          </button> */}
          <button 
              onClick={handleCancel} 
              className={styles.smallButton}
              style={{background: "#beb2a4", marginLeft: "auto"}}
              >Cancel
          </button>
          <button 
              onClick={submitForm} 
              className={styles.smallButton}>
                  Save Change
          </button>
          {errorMessages.length>0 && (
          <div>
            {errorMessages.map((msg,idx) => (
                <p key = {idx} style={{ color: "red"}}>
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
