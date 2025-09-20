import { updateDoc, doc, arrayUnion, arrayRemove, getDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";
import { getCurrentUser, getUserInfo } from "./manageUsers";

async function getValidatedStudentContext(student) {
    const user = await getCurrentUser();
    const userInfo = await getUserInfo(user);

    if (!user || userInfo.role !== "student") {
        throw "Unauthorized access";
    }

    if (!student?.id) {
        throw "Invalid student reference";
    }

    return { docRef: doc(db, "users", student.id) };
}

async function getCourseLessons(courseID) {
    const courseRef = doc(db, "courses", courseID);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
        console.warn("Course not found while syncing lessons:", courseID);
        return [];
    }

    const data = courseSnap.data();
    const lessons = Array.isArray(data.courseLessons) ? data.courseLessons.filter(Boolean) : [];
    return lessons;
}

export async function unEnrollCourseInDatabase(student, courseID){
    const { docRef } = await getValidatedStudentContext(student);
    const courseLessons = await getCourseLessons(courseID);

    const updatePayload = {
        courseList: arrayRemove(courseID)
    };

    if (courseLessons.length > 0) {
        updatePayload.lessonList = arrayRemove(...courseLessons);
    }

    try {
        await updateDoc(docRef, updatePayload);
        console.log("Course removed successfully:", courseID);
    } catch (error) {
        console.error("Error removing course:", error);
        throw "Error removing course";
    }
}

export async function enrollCourseInDatabase(student, courseID){
    const { docRef } = await getValidatedStudentContext(student);
    const courseLessons = await getCourseLessons(courseID);

    const updatePayload = {
        courseList: arrayUnion(courseID)
    };

    if (courseLessons.length > 0) {
        updatePayload.lessonList = arrayUnion(...courseLessons);
    }

    try {
        await updateDoc(docRef, updatePayload);
        console.log("Course updated successfully:", courseID);
    } catch (error) {
        console.error("Error updating course:", error);
        throw "Error updating course";
    }
}
