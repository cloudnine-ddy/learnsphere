import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { addClassroomsToDatabase } from "../../components/addClassrooms";
import { getCurrentUser, getUserInfo } from "../../components/manageUsers";
import { addStudentClassroom } from "../../components/studentClassroom";
import { validateCourseLessons as validateClassroomLessons } from "../../components/addCourses";

import styles from "./AddClassroom.module.css";

import InputField from "../../components/typable/InputField";
import TextArea from "../../components/typable/TextArea";
import Button from "../../components/clickable/Button";
import AddFromList from "../../components/selectable_addable/AddFromList";
import SelectOneFromList from "../../components/selectable_addable/SelectOneFromList";
import SelectStatus from "../../components/selectable_addable/SelectStatus";
import { getListOfStudentsFromCourse } from "../../components/getStudentCourse";

function AddClassroom({
    courseOptions = [],
    lessonOptions = [],
    instructorList = [],
    studentOptions = []
}) {
    const [classroom, setClassroom] = useState({
        classroom_id: "",
        classroom_name: "",
        classroom_course: "",
        classroom_description: "",
        classroom_startDate: "",
        classroom_durationWeeks: "",
        classroom_instructor: "",
        classroom_status: "",
        totalStudents: 0
    });

    const navigate = useNavigate();
    const [isEnabled, setEnabled] = useState(true);
    const [validLessonOptions, setValidLessonOptions] = useState([]);
    const [validStudentOptions, setValidStudentOptions] = useState([]);
    const [userData, setUserData] = useState(null);

    const [classroomLessons, setClassroomLessons] = useState([]);
    const [classroomStudents, setClassroomStudents] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        getCurrentUser()
            .then((user) => getUserInfo(user))
            .then((info) => {
                if (info?.role === "student") {
                    navigate("/home");
                    return;
                }
                else
                {
                    setUserData(info);
                }
            });
    }, [navigate]);

    useEffect(() => {changeLessonOptions(classroom.classroom_course)}, [classroom.classroom_course])

    useEffect(() => {
        setClassroom((prev) => ({
            ...prev,
            totalStudents: classroomStudents.length
        }));
    }, [classroomStudents]);

    const changeLessonOptions = (course) => {
        if (extractIdentifier(course) != null)
        {
            let c = courseOptions.find(c=> c.data().courseID == extractIdentifier(course));
            
            if (c)
            {
                setValidLessonOptions(lessonOptions.filter((lesson) => {
                    return c.data().courseLessons.includes(`${lesson.data().lessonID}: ${lesson.data().title}`);
                }));

                getListOfStudentsFromCourse(c.id).then((students) => {
                    let studentDatas = students.map((student) => {
                        return student.data();
                    });

                    console.log(studentDatas);

                    setValidStudentOptions(studentDatas);
                });

                console.log(lessonOptions.filter((lesson) => {
                    return c.data().courseLessons.includes(`${lesson.data().lessonID}: ${lesson.data().title}`);
                }));
            }
        }
    }

    const handleClassroomChange = (event) => {
        const { name, value } = event.target;
        setClassroom((prev) => ({ ...prev, [name]: value }));

        if (errorMessages.length > 0) {
            setErrorMessages([]);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const classroomCourseOptions = [
        "",
        ...courseOptions
            .map((option) => {
                if (typeof option === "string") {
                    return option;
                }

                if (typeof option === "object" && option !== null) {
                    if (typeof option.data === "function") {
                        const data = option.data();
                        const identifier = data?.courseID || option.id || "";
                        const title = data?.courseTitle || data?.title || "";
                        return [identifier, title].filter(Boolean).join(": ").trim();
                    }

                    const identifier = option.courseID || option.id || "";
                    const title = option.courseTitle || option.title || "";
                    return [identifier, title].filter(Boolean).join(": ").trim();
                }

                return "";
            })
            .filter(Boolean)
    ];

    const classroomLessonOptions = useMemo(() => {return validLessonOptions
        ?.map((option) => {
            if (typeof option === "string") {
                return option;
            }

            if (typeof option === "object" && option !== null) {
                if (typeof option.data === "function") {
                    const data = option.data();
                    return `${data.lessonID}: ${data.title}`;
                }

                const id = option.lessonID || option.id || "";
                const title = option.title || "";
                return `${id}: ${title}`.trim();
            }

            return "";
        })
        .filter(Boolean);}, [validLessonOptions]);

    const classroomStudentOptions = useMemo(() => {return validStudentOptions
        .map((option) => {
            if (typeof option === "string") {
                return option;
            }

            if (typeof option === "object" && option !== null) {
                if (typeof option.data === "function") {
                    const data = option.data();
                    const id = data.id || option.id || "";
                    const name = [data.firstName, data.lastName].filter(Boolean).join(" ").trim();
                    return [id, name].filter(Boolean).join(": ").trim();
                }

                const id = option.id || "";
                const name = [option.firstName, option.lastName].filter(Boolean).join(" ").trim();
                return [id, name].filter(Boolean).join(": ").trim();
            }

            return "";
        })
        .filter(Boolean);}, [validStudentOptions]);

    const classroom_instructorOptions = [
        "",
        ...instructorList
            .map((instructor) => {
                if (typeof instructor === "string") {
                    return instructor;
                }

                if (typeof instructor === "object" && instructor !== null) {
                    const title = instructor.title || "";
                    const firstName = instructor.firstName || "";
                    const lastName = instructor.lastName || "";
                    return [title, firstName, lastName].filter(Boolean).join(" ").trim();
                }

                return "";
            })
            .filter(Boolean)
    ];

    function extractIdentifier(value) {
        if (!value) {
            return "";
        }

        if (!value.includes(":")) {
            return value.trim();
        }

        const [identifier] = value.split(":");
        return identifier.trim();
    }

    async function submitForm() {
        setEnabled(false);
        if (await isValid()) {
            const classroom_durationWeeksNumber = Number.parseInt(classroom.classroom_durationWeeks, 10);

            addClassroomsToDatabase(
                classroom.classroom_id,
                extractIdentifier(classroom.classroom_course),
                classroom.classroom_instructor,
                classroom.classroom_name,
                classroom.classroom_description,
                classroomLessons,
                classroomStudents,
                classroom.classroom_startDate,
                classroom_durationWeeksNumber,
                classroom.classroom_status
            )
                .then(() => setErrorMessages(["Successfully created a classroom!"]))
                
            .then(async () => {
                
                const classroomID = classroom.classroom_id;

                for (const student of classroomStudents) {
                    const studentID = extractIdentifier(student); 
                    await addStudentClassroom(classroomID, studentID);
                }
                    }).catch((error) => setErrorMessages([error?.message || error]))
            .then (navigate("/home/classrooms"))
                }}

    async function isValid() {
        let validation = true;
        const messages = [];

        const hasMissingFields = Object.entries(classroom).some(
            ([key, value]) => key !== "totalStudents" && value === ""
        );

        if (hasMissingFields) {
            validation = false;
            messages.push("Missing and invalid values! Check the form again.");
        }

        const durationNumber = Number(classroom.classroom_durationWeeks);
        if (!Number.isInteger(durationNumber) || durationNumber <= 0) {
            validation = false;
            messages.push("Duration must be a positive whole number.");
        }

        if (!validation && messages.length > 0) {
            setErrorMessages(messages);
        }

        return validation;
    }

    const containerClass = styles.container || styles.formContainer;
    const footerWrapperClass = styles.infoFooter || "";

    return (
        <div className={styles.wrapper} disabled={!isEnabled}>
            <div className={styles.infoHeader}>
                <div className={styles.infoTitle}>Add Classroom</div>
            </div>

            <div className={styles.infoScroll}>
                <div className={containerClass}>
                    <InputField
                        label="Classroom ID"
                        type="text"
                        id="classroom_id"
                        value={classroom.classroom_id}
                        onChange={handleClassroomChange}
                        required
                    />

                    <InputField
                        label="Classroom Name"
                        type="text"
                        id="classroom_name"
                        value={classroom.classroom_name}
                        onChange={handleClassroomChange}
                        required
                    />

                    <SelectOneFromList
                        name="classroom_course"
                        label="Course"
                        object={classroom}
                        list={classroomCourseOptions}
                        onChange={handleClassroomChange}
                        required
                    />

                    <TextArea
                        label="Classroom Description"
                        type="textarea"
                        id="classroom_description"
                        name="classroom_description"
                        value={classroom.classroom_description}
                        onChange={handleClassroomChange}
                    />

                    <AddFromList
                        label="Lessons Included"
                        placeholder="Select lessons to include"
                        prerequisites={classroomLessons}
                        setPrerequisites={setClassroomLessons}
                        prerequisiteOptions={classroomLessonOptions}
                    />

                    <AddFromList
                        label="Students Assigned"
                        placeholder="Select students to include"
                        prerequisites={classroomStudents}
                        setPrerequisites={setClassroomStudents}
                        prerequisiteOptions={classroomStudentOptions}
                    />

                    <InputField
                        label="Start Date"
                        type="date"
                        id="classroom_startDate"
                        value={classroom.classroom_startDate}
                        onChange={handleClassroomChange}
                        required
                    />

                    <InputField
                        label="Duration (weeks)"
                        type="number"
                        id="classroom_durationWeeks"
                        value={classroom.classroom_durationWeeks}
                        onChange={handleClassroomChange}
                        min={1}
                    />

                    <SelectOneFromList
                        label="Supervisor"
                        name="classroom_instructor"
                        object={classroom}
                        list={classroom_instructorOptions}
                        onChange={handleClassroomChange}
                        required
                    />

                    <SelectStatus
                        label="Status"
                        name="classroom_status"
                        object={classroom}
                        onChange={handleClassroomChange}
                    />
                </div>
            </div>

            <div className={footerWrapperClass || undefined}>
                <div className={styles.footerActions}>
                    <button type="button" className={styles.backButton} onClick={handleBack}>
                        <img src="images/icons/goback.png" alt="Back" className={styles.backIcon} />
                        <span>Back</span>
                    </button>
                    <Button onClick={submitForm} label="Add" />
                </div>

                {errorMessages.length > 0 && (
                    <div>
                        {errorMessages.map((msg, idx) => (
                            <p key={idx} style={{ color: "red" }}>
                                {msg}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddClassroom;