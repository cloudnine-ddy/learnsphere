import {doc, deleteDoc, getDocs, updateDoc, collection} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";
import { getCurrentUser, getUserInfo } from "./manageUsers";

export async function deleteLessonFromDatabase(lessonDocId)
{
    let user = await getCurrentUser();
    let userInfo = await getUserInfo(user);

    if (user != null && userInfo.role != "student")
    {
        const docRef = doc(db, "lessons", lessonDocId);
        try {
            // Delete lesson data from Firestore
            await deleteDoc(docRef);

            console.log("Lesson deleted successfully:", lessonDocId);
            return;
        } 
        catch (error) {
            console.error("Error deleting lesson:", error);
            throw "Error deleting lesson";
        }
    }
    else
    {
        throw "Unauthorized access!";
    }
}

export async function deletePrereq(lessonIdToDelete) {
    try {
        const querySnapshot = await getDocs(collection(db, "lessons"));

        for (const lessonDoc of querySnapshot.docs) {
            const lesson = lessonDoc.data();

            if (lesson.prerequisites && lesson.prerequisites.length > 0) {
                const updatedPrereqs = lesson.prerequisites.filter(prereq => {
                    const prereqId = prereq.split(":")[0].trim(); 
                    return prereqId !== lessonIdToDelete;
                });

                if (updatedPrereqs.length !== lesson.prerequisites.length) {
                    console.log(`Removing ${lessonIdToDelete} from prerequisites for lesson: ${lessonDoc.id}`);
                    await updateDoc(doc(db, "lessons", lessonDoc.id), {
                        prerequisites: updatedPrereqs,
                        updatedAt: new Date().toISOString()
                    });
                    console.log(`Updated prerequisites for lesson: ${lessonDoc.id}`);
                }
            }
        }

        console.log(`Removed lesson ${lessonIdToDelete} from all prerequisites`);
    } catch (error) {
        console.error("Error deleting prerequisites:", error);
        throw error;
    }
}
