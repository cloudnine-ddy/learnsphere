import { setDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";
import { getCurrentUser, getUserInfo } from "./manageUsers";


export async function addCoursesToDatabase(courseID, courseTitle, courseDescription, courseLessons, courseTotalCreditPoint, courseSupervisor, courseStatus) {

    let user = await getCurrentUser();
    let userinfo = await getUserInfo(user);

    if (user != null && userinfo.role != "student") {
        const courseData = {
            courseID: courseID,
            courseTitle: courseTitle,
            courseDescription: courseDescription,
            courseLessons: courseLessons.map(s => s.trim()).filter(Boolean),
            courseTotalCreditpoint: Number.parseInt(courseTotalCreditPoint),
            courseSupervisor: courseSupervisor,
            courseCreateDate: new Date().toISOString(),
            courseUpdateDate: new Date().toISOString(),
            courseStatus: courseStatus,
        };

        // Save the course data to Firestore 

        const docRef = doc(db, "courses", new Date().getTime().toString()) // New Unique ID based on timestamp
        console.log(docRef)

        try {
            // Save the course to Firestore 
            await setDoc(docRef, courseData);

            console.log("Course was successfully added: ", courseData);
            return;
        }
        catch (error) {
            console.error("Error creating the lesson: ", error);
            throw "Error Creating lesson";
        }
    } else {
        throw 'Unauthorized Access >:(';
    }
}