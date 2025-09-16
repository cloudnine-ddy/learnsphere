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
        const q = userData.role == "student" ? query(collection(db, "courses"), where("status", "==", "Published")) :
            status === true ? query(collection(db, "courses")) : query(collection(db, "courses"), where("status", "==", status));

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
            if (docSnap.data().status != 'Published' && userData.role == 'student') {
                return null;
            }
            
            return docSnap.data();
        }
        else {
            return null;
        }
    }
}
