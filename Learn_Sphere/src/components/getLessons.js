import {collection, doc, query, where, getDoc, getDocs} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";

export async function getLessons(status=true)
{
    const lessons = []

    if (!['draft', 'published', 'archived'].includes(status) || status != true)
    {
        status = true;
    }
    
    const q = status == true ? query(collection(db, "lessons")) : query(collection(db, "lessons"), where("status", "==", status));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        lessons.push(doc);
    });

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