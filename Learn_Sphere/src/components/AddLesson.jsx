import React, { useState, useCallback } from "react"
import { addLessonToDatabase } from "./addLessons"

export function AddLesson()
{
    const [lessonID, setLessonID] = useState("")
    const [lessonTitle, setLessonTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [readingList, setReadingList] = useState([])
    const [preReq, setPreReq] = useState([])
    const [assignments, setAssignments] = useState([])
    const [owner, setOwner] = useState("")
    const [status, setStatus] = useState("")

    function submitForm(e)
    {
        e.preventDefault();
        console.log(lessonID, lessonTitle, desc, readingList, preReq, assignments, owner, status);
        addLessonToDatabase(lessonID, lessonTitle, desc, readingList, preReq, assignments, owner, status);
    }

    function deleteItemFromList(i, func, setFunc)
    {
        let index = func.indexOf(i);
        let newFunc = func.splice(index, func.length - 1);
        setFunc(newFunc);
    }
    
    function addItemToList(func, setFunc)
    {
        let newFunc = [...func, "New"]
        setFunc(newFunc);
    }

    function changeItemInList(e, item, func, setFunc)
    {
        let index = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement);
        let newFunc = func.slice(0, index).concat([e.target.value], func.slice(index + 1, func.length))
        setFunc(newFunc);
    }

    return (
    <>
        <form id="lessonForm" onSubmit={submitForm}>

            <label>Lesson ID:</label>
            <input type="text" id="lessonID" value={lessonID} onChange={(e) => setLessonID(e.target.value)} required/><br></br>

            <label>Lesson Title:</label>
            <input type="text" id="lessonTitle" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} required/><br></br>

            <label>Lesson Description:</label>
            <textarea id="lessonDescription" value={desc} onChange={(e) => setDesc(e.target.value)} required/><br></br>

            <label>Reading List (comma-separated URLs):</label>
            <div id="readingList">
            {readingList.map((read) => 
                <div>
                    <textarea id="reading ${read}" value={read} onChange={(e) => changeItemInList(e, read, readingList, setReadingList)} required/>
                    <button type="button" onClick={e => deleteItemFromList(read, readingList, setReadingList)}>Delete</button>
                </div>)}
            <button type="button" onClick={e => addItemToList(readingList, setReadingList)}>Add</button>
            </div>
            {/* <input type="text" id="readingList" name="readingList"/> */}
            <br></br>

            <label>Prerequisite Lesson IDs (comma-separated):</label>
            <div id="lessonIDs">
            {preReq.map((unit) => 
                <div>
                    <textarea id="prerequisite ${unit}" value={unit} onChange={(e) => changeItemInList(e, unit, preReq, setPreReq)} required/>
                    <button type="button" onClick={e => deleteItemFromList(unit, preReq, setPreReq)}>Delete</button>
                </div>)}
            <button type="button" onClick={e => addItemToList(preReq, setPreReq)}>Add</button>
            </div>
            {/* <input type="text" id="prerequisites" name="prerequisites"/> */}
            <br></br>

            <label>Assignments (comma-separated IDs):</label>
            <div id="assignments">
            {assignments.map((asgn) => 
                <div>
                    <textarea id="assignment ${asgn}" value={asgn} onChange={(e) => changeItemInList(e, asgn, assignments, setAssignments)} required/>
                    <button type="button" onClick={e => deleteItemFromList(asgn, assignments, setAssignments)}>Delete</button>
                </div>)}
            <button type="button" onClick={e => addItemToList(assignments, setAssignments)}>Add</button>
            </div>
            {/* <input type="text" id="assignments" name="assignments"/> */}
            <br></br>

            <label>Owner:</label>
            <select id="status" name="status" value={owner} onChange={(e) => setOwner(e.target.value)} required>
            <option value="">None</option>
            <option value="Dr. Alan">Dr. Alan</option>
            <option value="Mr. Chong">Mr. Chong</option>            
            </select><br></br>

            <label>Status:</label>
            <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">None</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            </select><br></br>

            <button type="submit">Create Lesson</button>
        </form>
    </>
    );
}