import {doc, deleteDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";
import { getCurrentUser, getUserInfo } from "./manageUsers";

export async function deleteLessonFromDatabase(lessonDocId)
{
    let user = await getCurrentUser();
    let userInfo = await getUserInfo(user);

    if (user != null && userInfo.role != "student")
    {
        const docRef = doc(db, "lessons", lessonDocId);
        try {
            // Delete lesson data from Firestore
            await deleteDoc(docRef);

            console.log("Lesson deleted successfully:", lessonDocId);
            return;
        } 
        catch (error) {
            console.error("Error deleting lesson:", error);
            throw "Error deleting lesson";
        }
    }
    else
    {
        throw "Unauthorized access!";
    }
}