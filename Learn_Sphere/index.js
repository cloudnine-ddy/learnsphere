import express from 'express';
import cors from 'cors';
import studentRoute from './Routes/studentRoute.js';

import config from './config.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', studentRoute);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);