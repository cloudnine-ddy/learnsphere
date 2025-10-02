import { doc, deleteDoc, getDocs, updateDoc, collection, getDoc, query, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";
import { getCurrentUser, getUserInfo } from "./manageUsers";


export async function deleteInstructorFromDatabase(instructorDocId) {

    try {
        // Step 1: Query for the document of the instructor
        const instructorQuery = query
            (
                collection(db, "users"),
                where("id", "==", instructorDocId),
                where("role", "==", "instructor")
            );

        const instructorSnapshot = await getDocs(instructorQuery);
        if (instructorSnapshot.empty) {
            console.log("Instructor not found");
            return;
        }

        // Step 2: Delete the instructor document
        const deletions = instructorSnapshot.docs.map((d) =>
            deleteDoc(doc(db, "users", d.id))
        );

        await Promise.all(deletions);

        console.log(`✅ Deleted ${instructorSnapshot.size} instructor documents`);

    } catch (error) {
        console.error("Error deleting instructor:", error);
        throw error;
    }

    // Change the instructor of the lessons to be "admin"


}