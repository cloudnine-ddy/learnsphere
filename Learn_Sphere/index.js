import express from 'express';
import cors from 'cors';
import studentRoute from './Routes/studentRoute.js';

import config from './config.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      res.cookie('user', userCredential);
      res.status(200).send('login successful!');
    })
    .catch((error) => {
      res.status(error.code).send(error.message);
    })
})

app.post('/register', (req, res) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      const user = userCredential.user;
      user.displayName = req.body.displayName;

      res.cookie('user', userCredential);
      res.status(200).send('registration successful!');
    })
    .catch((error) => {
      res.status(error.code).send(error.message);
    })
})

app.use('/api', studentRoute);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);