import {doc, deleteDoc, getDocs, updateDoc, collection, getDoc, query, where} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from "./firebaseConfig";


export async function deleteToken(TokenID) {

    try {
    const tokenQuery = query(
        collection(db, "tokens"),
        where("value", "==", TokenID)
    );

    const tokenSnapshot = await getDocs(tokenQuery);

    if (tokenSnapshot.empty) {
        console.warn("No matching token found to delete.");
        return false;
    }

    const deletions = tokenSnapshot.docs.map((d) =>
        deleteDoc(doc(db, "tokens", d.id))
    );

    await Promise.all(deletions);

    console.log("✅ Successfully deleted token");
    return true;

    } catch (error) {
        console.error("Error deleting token:", error);
        throw error;
    }
    
}