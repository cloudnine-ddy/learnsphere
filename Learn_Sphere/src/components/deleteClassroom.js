import { collection, query, where, getDocs, deleteDoc, doc, getDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig.js";
import {deleteStudentClassroomByClassroomID} from "./studentClassroom.js";
import {deleteLessonClassroomByClassroomID} from "./lessonClassroom.js";


export async function deleteClassroom(classroomID) {

    /* param
        classroomID - the classroom 'classroom_id:' field in the database
    */

    // Deleting the classroom 
    try {
        // Search for the classroom 

        const classroomQuery = query (
            collection(db, 'classrooms'), 
            where("classroomID", "==", classroomID)
        );

        const classroomSnapshot = await getDocs(classroomQuery);

        if (classroomSnapshot.empty){
            console.warn("No matching classroom found to delete.");
        return false;
        }

        const deletions = classroomSnapshot.docs.map((d) => 
        deleteDoc(doc(db, "classrooms", d.id))
        );

        await Promise.all(deletions);

        console.log("✅ Successfully deleted classroom");


    }
    catch (error) {
        console.error("Error deleting classroom:", error);
        throw error;
    }

    // Delete classroom from student_classroom

    try {
        deleteStudentClassroomByClassroomID(classroomID);

        console.log("✅ Successfully deleted classroom");
    } catch (error) {
        console.error("Error deleting classroom from student_classroom:", error);
        throw error;
    }

    // Delete classroom from lesson_classroom

    try {
        deleteLessonClassroomByClassroomID(classroomID);

        console.log("✅ Successfully deleted classroom");
    } catch (error) {
        console.error("Error deleting classroom from lesson_classroom:", error);
        throw error;
    }
}