import { initializeApp } from 'firebase/app';
import config from './config.js';

const firebase = initializeApp(config.firebaseConfig);
console.log("Connecting to Firebase project:", config.firebaseConfig.projectId);

export default firebase;