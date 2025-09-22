import { updateDoc, doc , getDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";
import { getCurrentUser, getUserInfo } from "./manageUsers";

export async function updateCourseInDatabase(courseDocId, updates) {
    let user = await getCurrentUser();
    let userInfo = await getUserInfo(user);

    if (user != null && userInfo.role != "student") {
        try {
            const docRef = doc(db, "courses", courseDocId);

            // Ensure updatedAt is refreshed automatically
            updates.updatedAt = new Date().toISOString();

            await updateDoc(docRef, updates);

            console.log("Course updated successfully:", courseDocId);
            return;
        } catch (error) {
            console.error("Error updating course:", error);
            throw "Error updating course";
        }
    } else {
        throw "Unauthorized access!";
    }
}