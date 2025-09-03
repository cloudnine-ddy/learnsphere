import express from 'express';

import {
    createStudent,
    getStudent
} from '../Controllers/studentController.js';

const router = express.Router();

// router.get('/', getProducts);
router.post('/new', createStudent);
router.get('/student/:id', getStudent);
// router.put('/update/:id', updateProduct);
// router.delete('/delete/:id', deleteProduct);

export default router;

