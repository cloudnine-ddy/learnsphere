import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { addClassroomsToDatabase } from "../../components/addClassrooms";
import { getCurrentUser, getUserInfo } from "../../components/manageUsers";
import { validateCourseLessons as validateClassroomLessons } from "../../components/addCourses";

import styles from "./AddClassroom.module.css";

import InputField from "../../components/typable/InputField";
import TextArea from "../../components/typable/TextArea";
import Button from "../../components/clickable/Button";
import AddFromList from "../../components/selectable_addable/AddFromList";
import SelectOneFromList from "../../components/selectable_addable/SelectOneFromList";
import SelectStatus from "../../components/selectable_addable/SelectStatus";

function AddClassroom({
    courseOptions = [],
    lessonOptions = [],
    instructorList = [],
    studentOptions = []
}) {
    const [classroom, setClassroom] = useState({
        classroomId: "",
        classroomName: "",
        course: "",
        description: "",
        startDate: "",
        durationWeeks: "",
        supervisor: "",
        status: "",
        totalStudents: 0
    });

    const navigate = useNavigate();
    const [isEnabled, setEnabled] = useState(true);
    const [validLessonOptions, setValidLessonOptions] = useState([]);
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

    useEffect(() => {changeLessonOptions(classroom.course)}, [classroom.course])

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

    const classroomStudentOptions = studentOptions
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

    const supervisorOptions = [
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
            const durationWeeksNumber = Number.parseInt(classroom.durationWeeks, 10);

            addClassroomsToDatabase(
                classroom.classroomId,
                extractIdentifier(classroom.course),
                classroom.supervisor,
                classroom.classroomName,
                classroom.description,
                classroomLessons,
                classroomStudents,
                classroom.startDate,
                durationWeeksNumber,
                classroom.status
            )
                .then(() => setErrorMessages(["Successfully created a classroom!"]))
                .catch((error) => setErrorMessages([error?.message || error]));
            navigate("/home/classrooms");
        }
    }

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

        const durationNumber = Number(classroom.durationWeeks);
        if (!Number.isInteger(durationNumber) || durationNumber <= 0) {
            validation = false;
            messages.push("Duration must be a positive whole number.");
        }

        const missingDependencies = await validateClassroomLessons(classroomLessons);
        if (Object.keys(missingDependencies).length > 0) {
            validation = false;
            messages.push(
                "Missing prerequisites for some lessons: " +
                    Object.entries(missingDependencies)
                        .map(([lesson, deps]) => `${lesson} : [${deps.join(", ")}]`)
                        .join("; ")
            );
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
                        id="classroomId"
                        value={classroom.classroomId}
                        onChange={handleClassroomChange}
                        required
                    />

                    <InputField
                        label="Classroom Name"
                        type="text"
                        id="classroomName"
                        value={classroom.classroomName}
                        onChange={handleClassroomChange}
                        required
                    />

                    <SelectOneFromList
                        name="course"
                        label="Course"
                        object={classroom}
                        list={classroomCourseOptions}
                        onChange={handleClassroomChange}
                        required
                    />

                    <TextArea
                        label="Description"
                        type="textarea"
                        id="description"
                        name="description"
                        value={classroom.description}
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
                        id="startDate"
                        value={classroom.startDate}
                        onChange={handleClassroomChange}
                        required
                    />

                    <InputField
                        label="Duration (weeks)"
                        type="number"
                        id="durationWeeks"
                        value={classroom.durationWeeks}
                        onChange={handleClassroomChange}
                        min={1}
                    />

                    <SelectOneFromList
                        name="supervisor"
                        label="Supervisor"
                        object={classroom}
                        list={supervisorOptions}
                        onChange={handleClassroomChange}
                        required
                    />

                    <SelectStatus
                        name="status"
                        label="Status"
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