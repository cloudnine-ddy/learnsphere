import express from 'express';

import {
    registerStudent,
    loginStudent
} from '../Controllers/studentController.js';

const router = express.Router();

// router.get('/', getProducts);
router.post('/register', registerStudent);
router.post('/login', loginStudent);
// router.put('/update/:id', updateProduct);
// router.delete('/delete/:id', deleteProduct);

export default router;

