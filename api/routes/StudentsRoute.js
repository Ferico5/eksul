import express from 'express';
import { getStudent, getStudentById, createStudent } from '../controllers/StudentsController.js';
import { getStudentLogin } from '../controllers/StudentsLoginController.js';

const router = express.Router();

router.get('/students', getStudent);
// router.get('/count_users', countUser)
router.get('/students/:id_student', getStudentById);
router.post('/students', createStudent);
router.post('/login', getStudentLogin);

export default router;
