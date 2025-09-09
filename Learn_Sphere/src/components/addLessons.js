import {setDoc, doc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";

export async function addLessonToDatabase(lessonID, title, description, readingList, prerequisites, assignments, creditPoint, owner, status)
{
    const lessonData = {
        lessonID: lessonID,
        title: title,
        description: description,
        readingList: readingList.map(s => s.trim()).filter(Boolean),
        prerequisites: prerequisites.map(s => s.trim()).filter(Boolean),
        assignments: assignments.map(s => s.trim()).filter(Boolean),
        owner: owner,
        status: status,
        creditPoint: Number.parseInt(creditPoint),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Save lesson data to Firestore
    const docRef = doc(db, "lessons", new Date().getTime().toString());  // Unique document ID based on timestamp
    console.log(docRef)

    try {
        // Save lesson data to Firestore
        await setDoc(docRef, lessonData);

        console.log("Lesson created successfully:", lessonData);
    } 
    catch (error) {
        console.error("Error creating lesson:", error);
    }
}