import { getAuth, signInWithEmailAndPassword, deleteUser, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import {collection, doc, query, where, getDoc, setDoc, getDocs} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { auth, db } from "./firebaseConfig";
import { use } from "react";

export async function signInUser(email, password)
{
    let user = null;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        user = userCredential.user; // This is the authenticated user
        cookieStore.set('user', userCredential);
      })
      .catch((error) => {
        throw "Cannot sign in user! " + error;
      });
    
    console.log(user);
    return user;
}

export async function registerUser(firstName, lastName, email, password, title, selectedRole)
{
    let user = null;
    // Create user using Firebase Authentication
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        user = userCredential.user;
        cookieStore.set('user', userCredential);
        console.log("User created successfully:", user); // Debugging log

        let userData = {
            id: user.uid,
            firstName: firstName,
            lastName: lastName,
            title: title,
            role: selectedRole
        };

        // Save user data to Firestore
        let docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
            .then(() => {
                console.log("Document successfully written!"); // Debugging log
            })
            .catch((error) => {
                throw ("Error writing document:", error);
            });
        })
        .catch((error) => {
            throw ("Cannot create user! " + error);
        });
    console.log(user);
    return user;
}

export async function getCurrentUser()
{
    let userCredential = await cookieStore.get('user');

    if (userCredential)
    {
        return userCredential.user;
    }
    else
    {
        return null
    }
}

export async function getUserInfo(id)
{
    //get the user credentials to look for
    const docRef = doc(db, "lessons", id);
    const docSnap = await getDoc(docRef);

    //if they exist, return the credentials
    if (docSnap.exists())
    {
        return docSnap;
    }
    else
    {
        return null;
    }
}