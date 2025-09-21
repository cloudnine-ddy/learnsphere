import { collection, doc, query, where, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";
import {getListOfCoursesFromStudent} from "./getStudentCourse";

// To get all the courses

export async function getCourses(status, userData) {
    const courses = [];

    if (userData != null) {

        if ((status !== true || status !== false) && (typeof (status) == String && !(['Draft', 'Published', 'Archived'].includes(status)))) {
            status = true;
        }

        //if the user is a student, then only allow access to published courses
        //else, return courses by the filter selected (true indicates all lessons, false indicates no lessons)
        const q = userData.role == "student" ? query(collection(db, "courses"), where("courseStatus", "==", "Published")) :
            status === true ? query(collection(db, "courses")) : query(collection(db, "courses"), where("courseStatus", "==", status));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            courses.push(doc);
        });
    }

    return courses;

}


export async function getCourse(id, userData) {
    if (userData != null) {
        const docRef = doc(db, "courses", id);
        
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            if (docSnap.data().courseStatus != 'Published' && userData.role == 'student') {
                return null;
            }
            
            return docSnap.data();
        }
        else {
            return null;
        }
    }
}

export async function getCoursesByStudent(studentID) {
    const courses = [];

    const studentRef = doc(db, "users", studentID);
    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
        console.error("Student not found:", studentID);
        return courses;
    }

    const studentData = studentSnap.data();
    const enrolledCourseIDs = studentData.courseList || [];

    if (enrolledCourseIDs.length === 0) {
        return courses;
    }

    const courseSnapshots = await Promise.all(
        enrolledCourseIDs.map(async (courseDocId) => {
            try {
                const courseRef = doc(db, "courses", courseDocId);
                const courseSnap = await getDoc(courseRef);
                if (courseSnap.exists()) {
                    return courseSnap;
                }
                console.warn(`Course not found for ID: ${courseDocId}`);
                return null;
            } catch (error) {
                console.error(`Failed to fetch course ${courseDocId}:`, error);
                return null;
            }
        })
    );

    return courseSnapshots.filter(Boolean);
}

export async function getCoursesNonEnroll(student) { // Change 
    const allCourses = [];

    const allCourseRef = collection(db, 'courses');

    getDocs(allCourseRef).then((snapshot) => {

        snapshot.forEach((doc) => {
            allCourses.push({...doc.data(), id: doc.id})
        })
    })
    .catch( err => {
        console.log("Error when trying to get all courses. getCourse.js, getCourseNonEnroll")
        console.log(err.message)
    })

    const enrolledCourses= await getListOfCoursesFromStudent(student.id);

    // enrolledCourses is array of objects, so extract IDs
    const enrolledIds = new Set(enrolledCourses.map(c => c.id));

    // 3. Filter: keep only those not in enrolledIds
    const nonEnrolledCourses = allCourses.filter(course => !enrolledIds.has(course.id));

    return nonEnrolledCourses;
}
