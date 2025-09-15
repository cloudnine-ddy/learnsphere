
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
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateLessonInDatabase } from "../components/updateLessons";

import styles from "./EditLesson.module.css";

function EditLesson( { instructorList, prerequisiteOptions }) {

    const { id } = useParams();
    prerequisiteOptions = prerequisiteOptions.filter(unit => unit.id != id);
    const location = useLocation();
    const lessonData = location.state.lesson;

    const [lesson, setLesson] = useState({
        lessonId: lessonData?.lessonID || "",
        title: lessonData?.title || "",
        description: lessonData?.description || "",
        creditPoints: lessonData?.creditPoint || 0,
        instructor: lessonData?.owner || "",
        status: lessonData?.status || ""
    });

    const [readingList, setReadingList] = useState(lessonData?.readingList || []);
    const [assignmentList, setAssignmentList] = useState(lessonData?.assignments || []);
    const [prerequisites, setPrerequisites] = useState(lessonData?.prerequisites || []);

    let navigate = useNavigate();
    const [currentBook, setCurrentBook] = useState("");
    const [currentAssignment, setCurrentAssignment] = useState("");

    const [errorMessages, setErrorMessages] = useState([]);

    const handleCancel = () => {
        navigate(`/home/lessons/${id}`);
    }

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
                title: lesson.title,
                description: lesson.description,
                readingList: readingList,
                prerequisites: prerequisites,
                assignments: assignmentList,
                creditPoint: lesson.creditPoints,
                owner: lesson.instructor,
                status: lesson.status
            };

            console.log(updates);
            updateLessonInDatabase(id, updates)
            .then(() => {
                setErrorMessages(["Successfully updated a lesson!"]);
                navigate(`/home/lessons/${id}`);
            })
            .catch((error) => setErrorMessages([error]));
            } else {
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
                    Edit Lesson
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

                {/* <label>Owner/Creator</label>
                <select name="owner" value={lesson.owner} onChange={handleLessonChange}>
                    {ownerList.map((user, idx) => (
                        <option key={idx} value={user}>{user}</option>
                    ))}
                </select> */}

                <SelectOneFromList name="instructor" label="Instructor" object={lesson} list = {[""].concat(instructorList.map(instructor => `${instructor.title} ${instructor.firstName} ${instructor.lastName}`))} onChange={handleLessonChange}/>
                <SelectStatus name="status" label="Status" object={lesson} onChange={handleLessonChange}/>

                </div>
            </div>
            
            <div className={styles.infoFooter}>
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
            </div>
        </div>
    );
}

export default EditLesson;