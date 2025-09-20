import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig.js";

// Update classroom status
export async function updateClassroomStatus(classroomId, status) {
  const docRef = doc(db, "classrooms", classroomId);
  await updateDoc(docRef, {
    classroom_status: status,
    classroom_updatedDate: new Date().toISOString(),
  });
  console.log("Updated classroom status:", status);
}

// Update classroom name
export async function updateClassroomName(classroomId, name) {
  const docRef = doc(db, "classrooms", classroomId);
  await updateDoc(docRef, {
    classroom_name: name,
    classroom_updatedDate: new Date().toISOString(),
  });
  console.log("Updated classroom name:", name);
}

// Update classroom description
export async function updateClassroomDescription(classroomId, description) {
  const docRef = doc(db, "classrooms", classroomId);
  await updateDoc(docRef, {
    classroom_description: description,
    classroom_updatedDate: new Date().toISOString(),
  });
  console.log("Updated classroom description:", description);
}

// Update classroom students (replace whole array)
export async function updateClassroomStudents(classroomId, studentsArray) {
  const docRef = doc(db, "classrooms", classroomId);
  await updateDoc(docRef, {
    classroom_students: studentsArray.map(s => s.trim()).filter(Boolean),
    classroom_updatedDate: new Date().toISOString(),
  });
  console.log("Updated classroom students:", studentsArray);
}

// Update classroom lessons (replace whole array)
export async function updateClassroomLessons(classroomId, lessonsArray) {
  const docRef = doc(db, "classrooms", classroomId);
  await updateDoc(docRef, {
    classroom_lessons: lessonsArray.map(s => s.trim()).filter(Boolean),
    classroom_updatedDate: new Date().toISOString(),
  });
  console.log("Updated classroom lessons:", lessonsArray);
}
