import { collection, query, where, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig.js";

export async function addStudentLesson(lessonID, studentID) {


    const studentLessonData = {
        student_lesson_lessonID: lessonID,
        student_lesson_studentID: studentID,
        student_lesson_completion: 0,
    };

    // Save the course data to Firestore 

    try {

        const docRef = await addDoc(collection(db, "student_lesson"), studentLessonData);
        console.log("student_lesson entry was successfully added with ID:", docRef.id);

        return docRef.id;

    } catch (error) {

        console.error("Error creating the studentLesson:", error);
        throw new Error("Error creating studentLesson");

    }

}

/* Data Structure
const studentLessonData = {

        student_lesson_lessonID: lessonID,
        student_lesson_studentID: studentID,
        student_lesson_completion: completion,
    };

*/ 

export async function getListOfLessonsFromStudent(studentID) {
  /*
  param: 
    studentID - the user 'id:'
  */ 
  try {
    // Step 1: get student_lesson docs for this student
    const scQuery = query(
      collection(db, "student_lesson"),
      where("student_lesson_studentID", "==", studentID)
    );
    const scSnapshot = await getDocs(scQuery);

    // Step 2: extract all the lesson document IDs
    const lessonIds = scSnapshot.docs.map(doc => doc.data().student_lesson_lessonID);

    if (lessonIds.length === 0) {
      return []; // no lessons
    }

    // Step 3: query lessons by document ID (batch if > 10)
    const chunks = [];
    for (let i = 0; i < lessonIds.length; i += 10) {
      const batch = lessonIds.slice(i, i + 10);
      const lessonQuery = query(
        collection(db, "lessons"),
        where("__name__", "in", batch) // query by Firestore doc IDs
      );
      chunks.push(getDocs(lessonQuery));
    }

    // Step 4: combine results into raw snapshots
    const results = await Promise.all(chunks);
    const lessons = results.flatMap(snapshot => snapshot.docs);

    return lessons; // array of DocumentSnapshots (need .data() later)
  } catch (error) {
    console.error("Error fetching lessons for student:", error);
    throw error;
  }
}

export async function getListOfStudentsFromCourse(lessonID) {
  try {
    // Step 1: get student_lesson docs for this lesson
    const scQuery = query(
      collection(db, "student_lesson"),
      where("student_lesson_lessonID", "==", lessonID)
    );
    const scSnapshot = await getDocs(scQuery);

    // Step 2: extract all student ID
    const studentIDs = scSnapshot.docs.map(doc => doc.data().student_lesson_studentID);

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
    console.error("Error fetching students from courses:", error);
    throw error;
  }
}

/* Data Structure
const studentLessonData = {

        student_lesson_lessonID: lessonID,
        student_lesson_studentID: studentID,
        student_lesson_completion: completion,
    };

*/ 

export async function deleteStudentLesson(studentID, lessonID) {
    /*
        param: 
            studentID = The "id" field of the user 
            courseID = The "courseID" field of the document
    */
  try {
    // Step 1: Query for the document(s)
    const scQuery = query(
      collection(db, "student_lesson"),
      where("student_lesson_studentID", "==", studentID),
      where("student_lesson_lessonID", "==", lessonID)
    );

    const scSnapshot = await getDocs(scQuery);

    if (scSnapshot.empty) {
      console.warn("No matching student_lesson found to delete.");
      return false;
    }

    // Step 2: Delete each matching doc
    const deletions = scSnapshot.docs.map((d) => 
      deleteDoc(doc(db, "student_lesson", d.id))
    );

    await Promise.all(deletions);

    console.log("✅ Successfully deleted student_course mapping.");
    return true;

  } catch (error) {
    console.error("Error deleting student_course:", error);
    throw error;
  }
}

