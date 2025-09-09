
import React, { useState } from "react";

import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import AddToList from "../components/AddToList";
import AddFromList from "../components/AddFromList";
import TitleDropdown from "../components/TitleDropdown";
import SelectOneFromList from "../components/SelectOneFromList";
import SelectStatus from "../components/SelectStatus";

import styles from "./AddLesson.module.css";

function AddLesson( { instructorList, prerequisiteOptions }) {
    const [lesson, setLesson] = useState({
        lessonId: "",
        title: "",
        description: "",
        creditPoints: "",
        owner: "currentUser",
        status: "Draft"
    });

    const [readingList, setReadingList] = useState([]);
    const [currentBook, setCurrentBook] = useState("");

    const [assignmentList, setAssignmentList] = useState([]);
    const [currentAssignment, setCurrentAssignment] = useState("");

    const [prerequisites, setPrerequisites] = useState([]);

    const handleLessonChange = (e) => {
        const { name, value } = e.target;
        setLesson(prev => ({ ...prev, [name]: value }));
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
                        prerequisiteOptions={prerequisiteOptions}
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

                <SelectOneFromList label="Instructor" object={lesson} list = {instructorList} onChange={handleLessonChange}/>
                <SelectStatus label="Status" object={lesson} onChange={handleLessonChange}/>


                    {/* <label>Status</label>
                    <select name="status" value={lesson.status} onChange={handleLessonChange}>
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                        <option value="Archived">Archived</option>
                    </select> */}
                    
                </div>
            </div>
            
            <div className={styles.infoFooter}>
                <Button type="submit"  >Register</Button>
            </div>
        </div>
    );
}

export default AddLesson;