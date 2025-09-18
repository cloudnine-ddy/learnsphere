import { updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";
import { getCurrentUser, getUserInfo } from "./manageUsers";


export async function enrollCourseInDatabase(student, courseID){
    let user = await getCurrentUser();
    let userInfo = await getUserInfo(user);

    if (user != null && userInfo.role == "student")
    {
        try {
            const docRef = doc(db, "users", student.id);

            await updateDoc(docRef, {
                courseList: arrayUnion(courseID)
            });


            await updateDoc(docRef, updates);

            console.log("Course updated successfully:", courseDocId);
            return;
        } catch (error) {
            console.error("Error updating course:", error);
            throw "Error updating course";
        }
    }
}
