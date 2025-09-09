import {initializeApp} from "firebase/app"
import {collection, doc, query, where, getDoc, getDocs, getFirestore} from "firebase/firestore";

function db()
{
    const firebaseConfig = {
        apiKey: "AIzaSyBkQNEyRcMLYQ6tgUni9hh9JN1evZpo0iM",
        authDomain: "weshowagile.firebaseapp.com",
        projectId: "weshowagile",
        storageBucket: "weshowagile.firebasestorage.app",
        messagingSenderId: "324942220550",
        appId: "1:324942220550:web:779f62ae8323962e4fe287",
        measurementId: "G-9B5LVZ9MST"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db;
}

export async function getLessons()
{
    const lessons = []
    
    const q = query(collection(db(), "lessons"), where("status", "==", "published"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        lessons.push(doc.data())
    });
    lessons.map((item) => {console.log(item)});

    return lessons;
}

export async function getLesson(id)
{
    const docRef = doc(db(), "lessons", id);
    //const q = query(collection(db(), "lessons"), where("title", "==", title));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists())
    {
        return docSnap.data();
    }
    else
    {
        return null;
    }
}