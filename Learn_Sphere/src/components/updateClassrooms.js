import { doc, updateDoc, getDoc, query, where, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig.js";

import { getCurrentUser, getUserInfo } from "./manageUsers";

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
  // Query for the classroom with the matching classroom_id field
  const q = query(
    collection(db, "classrooms"),
    where("classroom_id", "==", classroomId)
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    console.warn("No classroom found with classroom_id:", classroomId);
    return;
  }

  // Assuming classroom_id is unique, so we only update the first match
  const docRef = snap.docs[0].ref;

  await updateDoc(docRef, {
    classroom_students: studentsArray.map((s) => s.trim()).filter(Boolean),
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








// Jorden Add this
export async function updateClassroomInDatabase(classroomId, updates) {
  let user = await getCurrentUser();
  let userInfo = await getUserInfo(user);

  if (user != null && userInfo.role !== "student") {
    try {
      const docRef = doc(db, "classrooms", classroomId);

      // Ensure updatedAt is refreshed automatically
      updates.classroom_updatedDate = new Date().toISOString();

      await updateDoc(docRef, updates);

      console.log("Classroom updated successfully:", classroomId);
      return;
    } catch (error) {
      console.error("Error updating classroom:", error);
      throw "Error updating classroom";
    }
  } else {
    throw "Unauthorized access!";
  }
}

export async function updateInstructorInClassroom(oldInstructor, newInstructor) {

  try {

    // Find all the lessons with the instructor in the lessons
    const classroomQuery = query(
      collection(db, "classrooms"),
      where("classroom_instructor", "==", oldInstructor)
    );

    const classroomSnapshot = await getDocs(classroomQuery);

    if (classroomSnapshot.empty) {
      console.log(`No ${oldInstructor}found in any Classroom`);
      return;
    }

    const updates = classroomSnapshot.docs.map((d) =>
      updateDoc(doc(db, "classrooms", d.id), {
        classroom_instructor: newInstructor,
      })
    );

    await Promise.all(updates);

    console.log(`✅ Updated ${classroomSnapshot.size} lessons`);

  } catch (error) {
    console.error("Error updating instructor:", error);
    throw error;
  }

}