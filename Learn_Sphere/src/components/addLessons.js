import {initializeApp} from "firebase/app"
import {setDoc, doc, getFirestore} from "firebase/firestore";

function db()
{
    const firebaseConfig = {
        apiKey: "AIzaSyBkQNEyRcMLYQ6tgUni9hh9JN1evZpo0iM",
        authDomain: "weshowagile.firebaseapp.com",
        projectId: "weshowagile",
        storageBucket: "weshowagile.firebasestorage.app",
        messagingSenderId: "324942220550",
        appId: "1:324942220550:web:779f62ae8323962e4fe287",
        measurementId: "G-9B5LVZ9MST"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db;
}

export async function addLessonToDatabase(lessonID, title, description, readingList, prerequisites, assignments, owner, status)
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Save lesson data to Firestore
    const docRef = doc(db(), "lessons", new Date().getTime().toString());  // Unique document ID based on timestamp
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