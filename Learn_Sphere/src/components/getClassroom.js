import { collection, query, where, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig.js";

// To get all the classroom

export async function getClassrooms(status, userData) {
    const classrooms = [];

    if (userData != null) {

        if ((status !== true || status !== false) && (typeof (status) == String && !(['Draft', 'Published', 'Archived'].includes(status)))) {
            status = true;
        }

        //if the user is a student, then only allow access to published classroom
        //else, return classroom by the filter selected
        const q = userData.role == "student" ? query(collection(db, "classrooms"), where("classroomStatus", "==", "Published")) :
            status === true ? query(collection(db, "classrooms")) : query(collection(db, "classroom"), where("classroomStatus", "==", status));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            classrooms.push(doc);
        });
    }

    return classrooms;

}

export async function getClassroom(id, userData) {
    if (userData != null) {
        const docRef = doc(db, "classrooms", id);
        
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            if (docSnap.data().classroom_status != 'Published' && userData.role == 'student') {
                return null;
            }
            
            return docSnap.data();
        }
        else {
            return null;
        }
    }
}

export async function getClassroomByStudent(studentID) {
    const classrooms = [];

    const studentRef = doc(db, "users", studentID);
    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
        console.error("Student not found:", studentID);
        return classrooms;
    }

    const studentData = studentSnap.data();
    const joinedClassroomIDs = studentData.classroomList || [];

    if (joinedClassroomIDs.length === 0) {
        return classrooms;
    }

    const classroomSnapshots = await Promise.all(
        joinedClassroomIDs.map(async (classroomDocId) => {
            try {
                const classroomRef = doc(db, "classrooms", classroomDocId);
                const classroomSnap = await getDoc(classroomRef);
                if (classroomSnap.exists()) {
                    return classroomSnap;
                }
                console.warn(`Classrooms not found for ID: ${classroomDocId}`);
                return null;
            } catch (error) {
                console.error(`Failed to fetch classroom ${classroomDocId}:`, error);
                return null;
            }
        })
    );

    return courseSnapshots.filter(Boolean);
}

export async function getCoursesNonJoin(student) {
    const classrooms = [];

    if (!student?.id) {
        console.error("Invalid student object:", student);
        return classrooms;
    }

    const studentRef = doc(db, "users", student.id);
    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
        console.error("Student not found:", student.id);
        return classrooms;
    }

    const studentData = studentSnap.data();
    const joinedClassroomIDs = Array.isArray(studentData.classroomList) ? studentData.classroomList : [];

    const allClassroomSnap = await getDocs(query(collection(db, "classrooms"), where("classroomStatus", "==", "Published")));

    allClassroomSnap.forEach((docSnap) => {
        if (!joinedClassroomIDs.includes(docSnap.id)) {
            classrooms.push(docSnap);
        }
    });

    return classrooms; 
}