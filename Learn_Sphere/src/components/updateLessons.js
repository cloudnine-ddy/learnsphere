import { updateDoc, doc , getDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";
import { getCurrentUser, getUserInfo } from "./manageUsers";

export async function updateLessonInDatabase(lessonDocId, updates) {
    let user = await getCurrentUser();
    let userInfo = await getUserInfo(user);

    if (user != null && userInfo.role != "student") {
        try {
            const docRef = doc(db, "lessons", lessonDocId);

            // Ensure updatedAt is refreshed automatically
            updates.updatedAt = new Date().toISOString();

            await updateDoc(docRef, updates);

            console.log("Lesson updated successfully:", lessonDocId);
            return;
        } catch (error) {
            console.error("Error updating lesson:", error);
            throw "Error updating lesson";
        }
    } else {
        throw "Unauthorized access!";
    }
}