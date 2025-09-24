import React, { useState, useEffect } from "react";
import { useMemo } from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";


import { getListOfCoursesFromStudent } from "../../components/getStudentCourse";
import { getCurrentUser, getUserInfo } from "../../components/manageUsers";
import { updateClassroomInDatabase } from "../../components/updateClassrooms";
import { getCourses } from "../../components/getCourses";
import { getLessonsbyCourseID } from "../../components/getLessons";


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
    classroom_durationWeeks: classroomData?.classroom_durationWeeks || 6
  });




  useEffect(() => {
    console.log("useEffect triggered with:", classroomData?.classroom_course, userData);
  
    getLessonsbyCourseID(classroomData?.classroom_course, userData)
      .then((courseLessons) => {
        setLessons(courseLessons || []);
        console.log("Fetched lessons:", courseLessons);
      })
      .catch((err) => {
        console.error("Failed to load lessons for course:", err);
      });


  }, [classroom, userData]);

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

  const [lessons, setLessons] = useState([]);

  const [classroomLessons, setClassroomLessons] = useState(
    classroomData?.classroom_lessons || []
  );
  const [classroomStudents, setClassroomStudents] = useState(
    classroomData?.classroom_students || []
  );

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

  // Some Functions
  const handleSubmit = (formData) => {
    setEnabled(false);
    console.log("Submitting form with data:", formData);
  };

  const handleCancel = () => {
    navigate(`/home/classrooms/${id}`);
  };

  function isValid() {
    for (const [key, value] of Object.entries(classroom)) {
      if (value == "") {
        return false;
      }
    }

    return true;
  }

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
        classroom_lessons: classroomLessons,
        classroom_students: classroomStudents,
      };

      console.log(updates);
      updateClassroomInDatabase(id, updates)
        .then(() => {
          setErrorMessages(["Successfully updated a course!"]);
          navigate(`/home/classrooms/${id}`);
        })
        .catch((error) => setErrorMessages([error.message] || String(error)));
    } else {
      setErrorMessages(["Missing and invalid values! Check the form again."]);
      setEnabled(true);
    }
  }

  

  const handleClassroomChange = (e) => {
    const { name, value } = e.target;
    setClassroom((prev) => ({ ...prev, [name]: value }));

    if (errorMessages.length > 0) {
      setErrorMessages([]);
    }
  };


  const classroomStudentOptions = studentList
      .map((option) => {
          if (typeof option === "string") {
              return option;
          }

          if (typeof option === "object" && option !== null) {
              if (typeof option.data === "function") {
                  const data = option.data();
                  const id = data.studentID || option.id || "";
                  const name = [data.firstName, data.lastName].filter(Boolean).join(" ").trim();
                  return [id, name].filter(Boolean).join(": ").trim();
              }

              const id = option.studentID || option.id || "";
              const name = [option.firstName, option.lastName].filter(Boolean).join(" ").trim();
              return [id, name].filter(Boolean).join(": ").trim();
          }

          return "";
      })
      .filter(Boolean);
  

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

          <TextArea
              label="Classroom Description"
              type="textarea"
              id="classroom_description"
              name="classroom_description"
              value={classroom.classroom_description}
              onChange={handleClassroomChange}
          />
          {/* <SelectOneFromList
            label="Course"
            name="classroom_course"
            object={classroom}
            list={courseList.map(course => course.data().courseID)}
            onChange={handleClassroomChange}
          /> */}

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
            prerequisiteOptions={lessons.map(
              (lesson) => `${lesson.data().lessonID}: ${lesson.data().title}`
            )}
          />

          <AddFromList
            label="Add Student"
            placeholder="Assign students to lesson"
            prerequisites={classroomStudents}
            setPrerequisites={setClassroomStudents}
            prerequisiteOptions={classroomStudentOptions}
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
