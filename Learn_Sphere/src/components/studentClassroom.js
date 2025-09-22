import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig.js";

export async function addStudentClassroom(classroomID, studentID) {


    const studentClassroomData = {
        student_classroom_classroomID: classroomID,
        student_classroom_studentID: studentID,
    };

    // Save the course data to Firestore 

    try {

        const docRef = await addDoc(collection(db, "student_classroom"), studentClassroomData);
        console.log("student_classroom entry was successfully added with ID:", docRef.id);

        return docRef.id;

    } catch (error) {

        console.error("Error creating the studentClassroom:", error);
        throw new Error("Error creating studentClassroom");

    }

}

/* Data Structure
const studentClassroomData = {

        student_classroom_classroomID: classroomID,
        student_classroom_studentID: studentID,
    };

*/

export async function getListOfClassroomsFromStudent(studentID) {
  /*
  param: 
    studentID - the user 'id:'
  */ 
  try {
    // Step 1: get student_classroom docs for this student
    const scQuery = query(
      collection(db, "student_classroom"),
      where("student_classroom_studentID", "==", studentID)
    );
    const scSnapshot = await getDocs(scQuery);

    // Step 2: extract all the classroom document IDs
    const classroomIds = scSnapshot.docs.map(doc => doc.data().student_classroom_classroomID);

    if (classroomIds.length === 0) {
      return []; // no classrooms
    }

    // Step 3: query classrooms by document ID (batch if > 10)
    const chunks = [];
    for (let i = 0; i < classroomIds.length; i += 10) {
      const batch = classroomIds.slice(i, i + 10);
      const classroomQuery = query(
        collection(db, "classrooms"),
        where("classroomID", "in", batch) // query by Firestore doc IDs
      );
      chunks.push(getDocs(classroomQuery));
    }

    // Step 4: combine results into raw snapshots
    const results = await Promise.all(chunks);
    const classrooms = results.flatMap(snapshot => snapshot.docs);

    return classrooms; // array of DocumentSnapshots (need .data() later)
  } catch (error) {
    console.error("Error fetching classrooms for student:", error);
    throw error;
  }
}

export async function getListOfStudentsFromClassroom(classroomID) {
  try {
    // Step 1: get student_classroom docs for this classroom
    const scQuery = query(
      collection(db, "student_classroom"),
      where("student_classroom_classroomID", "==", classroomID)
    );
    const scSnapshot = await getDocs(scQuery);

    // Step 2: extract all student ID
    const studentIDs = scSnapshot.docs.map(doc => doc.data().student_classroom_studentID);

    if (studentIDs.length === 0) {
      return []; // no courses
    }

    // Step 3: query student by studentID (batch if > 10)
    const chunks = [];
    for (let i = 0; i < studentIDs.length; i += 10) {
      const batch = studentIDs.slice(i, i + 10);
      const studentQuery = query(
        collection(db, "users"),
        where("id", "in", batch)
      );
      chunks.push(getDocs(studentQuery));
    }

    // Step 4: combine results
    const results = await Promise.all(chunks);
    const students = results.flatMap(snapshot =>
      snapshot.docs
    );

    return students; // array of student documents
    
  } catch (error) {
    console.error("Error fetching students from classrooms:", error);
    throw error;
  }
}

export async function deleteStudentClassroom(studentID, classroomID) {
    /*
        param: 
            studentID = The "id" field of the user 
            classroomID = The "classroomID" field of the document
    */
  try {
    // Step 1: Query for the document(s)
    const scQuery = query(
      collection(db, "student_classroom"),
      where("student_classroom_studentID", "==", studentID),
      where("student_classroom_classroomID", "==", classroomID)
    );

    const scSnapshot = await getDocs(scQuery);

    if (scSnapshot.empty) {
      console.warn("No matching student_classroom found to delete.");
      return false;
    }

    // Step 2: Delete each matching doc
    const deletions = scSnapshot.docs.map((d) => 
      deleteDoc(doc(db, "student_classroom", d.id))
    );

    await Promise.all(deletions);

    console.log("✅ Successfully deleted student_classroom mapping.");
    return true;

  } catch (error) {
    console.error("Error deleting student_classroom:", error);
    throw error;
  }
}

export async function deleteStudentClassroomByClassroomID(classroomID) {

    try {
        // Search for the classroom 

        const scQuery = query(
            collection(db, "student_classroom"),
            where("student_classroom_classroomID", "==", classroomID)
        );

        const studentClassroomSnapshot = await getDocs(scQuery);

        if (!studentClassroomSnapshot.empty) {
            const deletions = studentClassroomSnapshot.docs.map((d) =>
                deleteDoc(doc(db, "student_classroom", d.id))
            );
            await Promise.all(deletions);
            console.log(`✅ Deleted ${studentClassroomSnapshot.size} student_classroom mappings for classroom ${classroomID}`);
        }

        console.log(`Removed classroom ${classroomID} from students, classrooms, and student lessons`);
    } catch (error) {
        console.error("Error deleting classroom references:", error);
        throw error;
    }
}

export async function deleteStudentClassroomByStudentID(studentID) {

    try {
        // Search for the classroom 

        const scQuery = query(
            collection(db, "student_classroom"),
            where("student_classroom_studentID", "==", studentID)
        );

        const studentClassroomSnapshot = await getDocs(scQuery);

        if (!studentClassroomSnapshot.empty) {
            const deletions = studentClassroomSnapshot.docs.map((d) =>
                deleteDoc(doc(db, "student_classroom", d.id))
            );
            await Promise.all(deletions);
            console.log(`✅ Deleted ${studentClassroomSnapshot.size} student_classroom mappings for student ${studentID}`);
        }

        console.log(`Removed student ${studentID} from students, classrooms, and student lessons`);
    } catch (error) {
        console.error("Error deleting classroom references:", error);
        throw error;
    }
}