import { updateDoc, doc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";
import { getCurrentUser, getUserInfo } from "./manageUsers";


export async function unEnrollCourseInDatabase(student, courseID){
    let user = await getCurrentUser();
    let userInfo = await getUserInfo(user);

    if (user != null && userInfo.role == "student")
    {
        try {
            const docRef = doc(db, "users", student.id);

            await updateDoc(docRef, {
                courseList: arrayRemove(courseID)
            });


            console.log("Course removed successfully:", courseID);
            return;
        } catch (error) {
            console.error("Error removing course:", error);
            throw "Error removing course";
        }
    }
}

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


            console.log("Course updated successfully:", courseID);
            return;
        } catch (error) {
            console.error("Error updating course:", error);
            throw "Error updating course";
        }
    }
}
