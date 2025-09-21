import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig.js";

/*

    const studentCourseData = {
        student_course_studentId: studentID,
        student_course_courseId: courseID,
        student_course_courseCompletion: Number.parseFloat(courseCompletion),
    };


*/

export async function getListOfCoursesFromStudent(studentID) {
  try {
    // Step 1: get student_course docs for this student
    const scQuery = query(
      collection(db, "student_course"),
      where("student_course_studentId", "==", studentID)
    );
    const scSnapshot = await getDocs(scQuery);

    // Step 2: extract all the courseID related to this studentID
    const courseIds = scSnapshot.docs.map(doc => doc.data().student_course_courseId);

    if (courseIds.length === 0) {
      return []; // no courses
    }

    // Step 3: query courses by courseID (batch if > 10)
    const chunks = [];
    for (let i = 0; i < courseIds.length; i += 10) {
      const batch = courseIds.slice(i, i + 10);
      const courseQuery = query(
        collection(db, "courses"),
        where("courseID", "in", batch)
      );
      chunks.push(getDocs(courseQuery));
    }

    // Step 4: combine results
    const results = await Promise.all(chunks);
    const courses = results.flatMap(snapshot =>
      snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    );

    return courses; // array of course documents

  } catch (error) {
    console.error("Error fetching courses for student:", error);
    throw error;
  }
}

export async function getListOfStudentsFromCourse(courseID) {
  try {
    // Step 1: get student_course docs for this student
    const scQuery = query(
      collection(db, "student_course"),
      where("student_course_courseId", "==", courseID)
    );
    const scSnapshot = await getDocs(scQuery);

    // Step 2: extract all student ID
    const studentIDs = scSnapshot.docs.map(doc => doc.data().student_course_studentId);

    if (studentIDs.length === 0) {
      return []; // no courses
    }

    // Step 3: query courses by courseID (batch if > 10)
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
      snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    );

    return students; // array of course documents
    
  } catch (error) {
    console.error("Error fetching students from courses:", error);
    throw error;
  }
}

