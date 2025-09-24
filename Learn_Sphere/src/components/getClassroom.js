import { collection, query, where, getDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
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
        const q = userData.role == "student" ? query(collection(db, "classrooms"), where("classroom_status", "==", "Published")) :
            status === true ? query(collection(db, "classrooms")) : query(collection(db, "classrooms"), where("classroom_status", "==", status));

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


export async function getClassroomsNonJoin(student) {
    /* 
      student - the whole student object, e.g.,
      {id: "student123", firstName: "John", lastName: "Doe", title: "Mr.", role: "student"}
    */
    const classrooms = [];

    if (!student?.id) {
        console.error("Invalid student object:", student);
        return classrooms;
    }

    try {
        // Step 1: Get all courses the student is enrolled in
        const studentCourseQuery = query(
            collection(db, "student_course"),
            where("student_course_studentId", "==", student.id)
        );
        const studentCourseSnap = await getDocs(studentCourseQuery);

        const enrolledCourseIDs = studentCourseSnap.docs.map(docSnap => docSnap.data().student_course_courseId);

        console.log("Enrolled courses:", enrolledCourseIDs);

        if (enrolledCourseIDs.length === 0) {
            // Student is not enrolled in any course
            return classrooms;
        }

        // Step 2: Get all classrooms that are Published AND belong to student's courses
        const allClassroomSnap = await getDocs(
            query(
                collection(db, "classrooms"),
                where("classroom_status", "==", "Published")
            )
        );

        allClassroomSnap.forEach((classroomSnap) => {
            const classroomData = classroomSnap.data();
        })

        // Step 3: Get all classrooms the student has already joined
        const studentClassroomQuery = query(
            collection(db, "student_classroom"),
            where("student_classroom_student_ID", "==", student.id)
        );
        const studentClassroomSnap = await getDocs(studentClassroomQuery);
        const joinedClassroomIDs = studentClassroomSnap.docs.map(docSnap => docSnap.data().classroom_id);


        // Step 4: Filter classrooms
        allClassroomSnap.forEach((classroomSnap) => {
            const classroomData = classroomSnap.data();
            // Only include if:
            // 1. Classroom belongs to one of the student's courses
            // 2. Student has not already joined
            if (
                enrolledCourseIDs.includes(classroomData.classroom_course) &&
                !joinedClassroomIDs.includes(classroomSnap.data().classroom_id)
            ) {
                console.log("Adding classroom:", classroomSnap.data().classroom_id);
                classrooms.push(classroomSnap);
            }
        });

        return classrooms;
    } catch (error) {
        console.error("Error fetching non-joined classrooms:", error);
        return classrooms;
    }
}