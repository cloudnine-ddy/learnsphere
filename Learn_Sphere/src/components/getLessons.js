import {collection, doc, query, where, getDoc, getDocs} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";

export async function getLessons(status, userData)
{
    /*
    Get lessons based on the parameters:
    status = the status of the lessons to be selected. Irrelevant if user is a student.
    userData = check the identify of the user. Students only get published lessons, and non-users will not get any lesson.
    */

    const lessons = []

    if (userData != null)
    {
        if ((status !== true || status !== false) && (typeof(status) == String && !(['Draft', 'Published', 'Archived'].includes(status))))
        {
            status = true;
        }
    
        //if the user is a student, then only allow access to published lessons
        //else, return lessons by the filter selected (true indicates all lessons, false indicates no lessons)
        const q = userData.role == "student" ? query(collection(db, "lessons"), where("status", "==", "Published")) : 
            status === true ? query(collection(db, "lessons")) : query(collection(db, "lessons"), where("status", "==", status));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            lessons.push(doc);
        });
    }

    return lessons;
}

export async function getLesson(id)
{
    const docRef = doc(db, "lessons", id);
    //const q = query(collection(db(), "lessons"), where("title", "==", title));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists())
    {
        return docSnap.data();
    }
    else
    {
        return null;
    }
}