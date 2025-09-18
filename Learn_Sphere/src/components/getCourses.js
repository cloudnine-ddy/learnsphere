import { collection, doc, query, where, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";

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

// To get a specific Course

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

    // Step 1: Get student doc
    const studentRef = doc(db, "users", studentID);
    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
        console.error("Student not found:", studentID);
        return courses; // return empty array
    }

    const studentData = studentSnap.data();
    const enrolledCourseIDs = studentData.courseList || [];

    if (enrolledCourseIDs.length === 0) {
        return courses;
    }

    // Step 2: Fetch each course by its Firestore document ID
    for (const courseDocId of enrolledCourseIDs) {
        const courseRef = doc(db, "courses", courseDocId);
        const courseSnap = await getDoc(courseRef);
        if (courseSnap.exists()) {
            courses.push(courseSnap); // keep as DocumentSnapshot
        } else {
            console.warn(`Course not found for ID: ${courseDocId}`);
        }
    }

    return courses;
}


export async function getCoursesNonEnroll(student) {
    const courses = [];

    if (!student?.id) {
        console.error("Invalid student object:", student);
        return courses;
    }

    const studentRef = doc(db, "users", student.id);
    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
        console.error("Student not found:", student.id);
        return courses;
    }

    const studentData = studentSnap.data();
    const enrolledCourseIDs = Array.isArray(studentData.courseList) ? studentData.courseList : [];

    const allCoursesSnap = await getDocs(query(collection(db, "courses"), where("courseStatus", "==", "Published")));

    allCoursesSnap.forEach((docSnap) => {
        if (!enrolledCourseIDs.includes(docSnap.id)) {
            courses.push(docSnap);
        }
    });

    return courses; 
}
