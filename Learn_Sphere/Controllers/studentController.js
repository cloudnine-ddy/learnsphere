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

const db = getFirestore(firebase);

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