import { setDoc, doc, addDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";
import { getCurrentUser, getUserInfo } from "./manageUsers";



export async function addClassroomsToDatabase(classroomID, courseID, instructorID, classroomName, classroomDescription, classroomLessons, classroomStudents, classroomStartDate, classroomStatus) {

    let user = await getCurrentUser();
    let userinfo = await getUserInfo(user);

    if (user != null && userinfo.role != "student") {

        const classroomData = {
            classroom_id: classroomID,
            classroom_course: courseID, // can be a name only
            classroom_instructor: instructorID, // can be their name only
            classroom_name: classroomName,
            classroom_description: classroomDescription,
            classroom_lessons: classroomLessons.map(s => s.trim()).filter(Boolean),
            classroom_students: classroomStudents.map(s => s.trim()).filter(Boolean),
            classroom_startDate: classroomStartDate,
            classroom_createdDate: new Date().toISOString(),
            classroom_updatedDate: new Date().toISOString(),
            classroom_status: classroomStatus,
        };

        // Save the course data to Firestore 

        try {

            const docRef = await addDoc(collection(db, "classrooms"), classroomData);
            console.log("Course was successfully added with ID:", docRef.id);

            return docRef.id;

        } catch (error) {

            console.error("Error creating the classroom:", error);
            throw new Error("Error creating classroom");

        }
    } else {

        throw new Error("Unauthorized Access >:(");

    }

}