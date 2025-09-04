import firebase from '../firebase.js';
import Student from '../Models/Users/studentModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  getUserBy
} from "firebase/auth";

const db = getFirestore(firebase);
const auth = getAuth(firebase);

/* 
export const createStudent = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'students'), data);
    res.status(200).send('student created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = doc(db, 'students', id);
    const data = await getDoc(student);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('student not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
*/

export const registerStudent = (req, res) => {
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      auth.currentUser = userCredential.user;
      res.cookie('user', userCredential);
      res.status(200).send('login successful!');
    })
    .catch((error) => {
      res.status(error.code).send(error.message);
    })
  };

export const loginStudent = async (req, res, next) => {
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      const user = userCredential.user;
      user.displayName = req.body.displayName;

      auth.currentUser = userCredential.user;
      res.cookie('user', userCredential);
      res.status(200).send('registration successful!');
    })
    .catch((error) => {
      res.status(error.code).send(error.message);
    })
  };

export const getStudent = async(req, res, next) => {
  auth.getUser(req.body.userID)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      res.status(200).send(userRecord.Student)
    })
    .catch((error) => {
      res.status(error.code).send('Error fetching user data:', error);
    });
  }