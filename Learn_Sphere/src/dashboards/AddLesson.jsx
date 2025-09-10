
import React, { useState, useEffect } from "react";

import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import AddToList from "../components/AddToList";
import AddFromList from "../components/AddFromList";
import TitleDropdown from "../components/TitleDropdown";
import SelectOneFromList from "../components/SelectOneFromList";
import SelectStatus from "../components/SelectStatus";
import { addLessonToDatabase } from "../components/addLessons";
import { getCurrentUser, getUserInfo } from "../components/manageUsers";
import { useNavigate } from "react-router-dom";

import styles from "./AddLesson.module.css";

function AddLesson( { instructorList, prerequisiteOptions }) {
    const [lesson, setLesson] = useState({
        lessonId: "",
        title: "",
        description: "",
        creditPoints: 0,
        instructor: "",
        status: ""
    });

    let navigate = useNavigate();
    const [readingList, setReadingList] = useState([]);
    const [currentBook, setCurrentBook] = useState("");

    const [assignmentList, setAssignmentList] = useState([]);
    const [currentAssignment, setCurrentAssignment] = useState("");

    const [prerequisites, setPrerequisites] = useState([]);
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
        if (isValid())
        {
            console.log(lesson.lessonId, lesson.title, lesson.description, readingList, prerequisites, assignmentList, lesson.creditPoints, lesson.instructor, lesson.status);
            addLessonToDatabase(lesson.lessonId, lesson.title, lesson.description, readingList, prerequisites, assignmentList, lesson.creditPoints, lesson.instructor, lesson.status)
            .then(() => setErrorMessages(["Successfully created a lesson!"]))
            .catch((error) => setErrorMessages([error]));
        }
        else
        {
            setErrorMessages(["Missing and invalid values! Check the form again."]);
        }
    };

    function isValid()
    {
        for (const [key, value] of Object.entries(lesson)) {
            if (value == "")
            {
                return false;
            }
        }

        return true;
    }

    const handleLessonChange = (e) => {
        const { name, value } = e.target;
        setLesson(prev => ({ ...prev, [name]: value }));

        if (errorMessages.length > 0) {setErrorMessages([]);}
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.infoHeader}>
                <div className={styles.infoTitle}>
                    Add Lesson
                </div>
            </div>

            


            <div className={styles.infoScroll}>
                <div className={styles.container}>
                    <InputField
                        label="Lesson ID"
                        type="text"
                        id="lessonId"
                        name="lessonId"
                        value={lesson.lessonId}
                        onChange={handleLessonChange}
                        required
                    />

                    <InputField
                        label="Title"
                        type="text"
                        id="title"
                        name="title"
                        value={lesson.title}
                        onChange={handleLessonChange}
                        required
                    />

                    <TextArea
                        label="Description"
                        type="textarea"
                        id="description"
                        name="description"
                        value={lesson.description}
                        onChange={handleLessonChange}
                    />

                    <AddToList
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
                    />

                    <AddFromList 
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                        prerequisiteOptions={prerequisiteOptions.map(option => `${option.data().lessonID}: ${option.data().title}`)}
                    />

                    <InputField
                        label="Credit Points"
                        type="number"
                        id="creditPoints"
                        name="creditPoints"
                        value={lesson.creditPoints}
                        onChange={handleLessonChange}
                        min="0"
                        required
                    />

                    <SelectOneFromList name="instructor" label="Instructor" object={lesson} list = {[""].concat(instructorList.map(instructor => `${instructor.title} ${instructor.firstName} ${instructor.lastName}`))} onChange={handleLessonChange}/>
                    <SelectStatus name="status" label="Status" object={lesson} onChange={handleLessonChange}/>

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

export default AddLesson;