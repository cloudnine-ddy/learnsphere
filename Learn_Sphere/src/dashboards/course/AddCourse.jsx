import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { addCoursesToDatabase } from "../../components/addCourses";
import { getCurrentUser, getUserInfo } from "../../components/manageUsers";

import styles from "./AddCourse.module.css";

import InputField from "../../components/typable/InputField";
import TextArea from "../../components/typable/TextArea";
import Button from "../../components/clickable/Button";
import AddToList from "../../components/selectable_addable/AddToList";
import AddFromList from "../../components/selectable_addable/AddFromList";
import SelectOneFromList from "../../components/selectable_addable/SelectOneFromList";
import SelectStatus from "../../components/selectable_addable/SelectStatus";



function AddCourse( { instructorList,  prerequisiteOptions}) {
    const [course, setCourse] = useState({
        courseId: "",
        title: "",
        description: "",
        totalCreditPoints: 0,
        supervisor: "",
        status: ""
    });

    let navigate = useNavigate();

    const [courseLessons, setCourseLessons] = useState([]);
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

    useEffect(() => {
        const totalCreditPoints = courseLessons.reduce((sum, lessonString) => {
            const lessonid = lessonString.split(":")[0].trim();
            const lesson = prerequisiteOptions.find(lesson => lesson.data().lessonID == lessonid);
            return sum + lesson.data().creditPoint;
        }, 0);

        console.log(totalCreditPoints);

        setCourse({
            ...course,
            totalCreditPoints: totalCreditPoints
        });

    }, [courseLessons])

    function submitForm(e)
    {
        if (isValid())
        {
            console.log(course.courseId, course.title, course.description, courseLessons, course.totalCreditPoints, course.supervisor, course.status);
            addCoursesToDatabase(course.courseId, course.title, course.description, courseLessons, course.totalCreditPoints, course.supervisor, course.status)
            .then(() => setErrorMessages(["Successfully created a course!"]))
            .catch((error) => setErrorMessages([error]));
            navigate("/home/courses");
        }
        else
        {
            setErrorMessages(["Missing and invalid values! Check the form again."]);
        }
    };

    function isValid()
    {
        console.log(course.courseId, course.title, course.description, courseLessons, course.totalCreditPoints, course.supervisor, course.status);
        for (const [key, value] of Object.entries(course)) {
            if (value == "")
            {
                return false;
            }
        }

        return true;
    }

    const handleCourseChange = (e) => {
        const { name, value } = e.target;
        setCourse(prev => ({ ...prev, [name]: value }));

        if (errorMessages.length > 0) {setErrorMessages([]);}
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.infoHeader}>
                <div className={styles.infoTitle}>
                    Add Course
                </div>
            </div>

            


            <div className={styles.infoScroll}>
                <div className={styles.container}>
                    <InputField
                        label="Course ID"
                        type="text"
                        id="courseId"
                        name="courseId"
                        value={course.courseId}
                        onChange={handleCourseChange}
                        required
                    />

                    <InputField
                        label="Title"
                        type="text"
                        id="title"
                        name="title"
                        value={course.title}
                        onChange={handleCourseChange}
                        required
                    />

                    <TextArea
                        label="Description"
                        type="textarea"
                        id="description"
                        name="description"
                        value={course.description}
                        onChange={handleCourseChange}
                    />

                    {/* <AddToList
                    label="Reading List"
                    placeholder = "Enter book name"
                    currentItem={currentBook}
                    setCurrentItem={setCurrentBook}
                    itemList={readingList}
                    setItemList={setReadingList}
                    />

                    <AddToList
                    label="Assignment"
                    placeholder = "Enter assignment"
                    currentItem={currentAssignment}
                    setCurrentItem={setCurrentAssignment}
                    itemList={assignmentList}
                    setItemList={setAssignmentList}
                    /> */}

                    <AddFromList 
                        label={"Lessons Included"}
                        placeholder={"Please select lessons needed to be included"}
                        prerequisites={courseLessons}
                        setPrerequisites={setCourseLessons}
                        prerequisiteOptions={prerequisiteOptions.map(option => `${option.data().lessonID}: ${option.data().title}`)}
                    />

                    <a>{`Total credit points: ${course.totalCreditPoints}`}</a>

                    {/* <InputField
                        label="Credit Points"
                        type="number"
                        id="creditPoints"
                        name="creditPoints"
                        value={lesson.creditPoints}
                        onChange={handleLessonChange}
                        min="0"
                        required
                    /> */}

                    <SelectOneFromList name="supervisor" label="Supervisor" object={course} list = {[""].concat(instructorList.map(instructor => `${instructor.title} ${instructor.firstName} ${instructor.lastName}`))} onChange={handleCourseChange}/>
                    <SelectStatus name="status" label="Status" object={course} onChange={handleCourseChange}/>

                </div>
            </div>
            
            <div className={styles.infoFooter}>
                <Button onClick={submitForm} label="Add" />

                {errorMessages.length>0 && (
                <div>
                  {errorMessages.map((msg,idx) => (
                      <p key = {idx} style={{ color: "red"}}>
                        {msg}
                      </p>
                  ))}
                </div>
                )}
            </div>
        </div>
    );
}

export default AddCourse;