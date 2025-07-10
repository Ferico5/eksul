import express from 'express';
import { addAttendance, getAttendanceByEksul } from '../controllers/AttendanceController.js';

const router = express.Router();

router.post('/attendance', addAttendance);
router.get('/attendance/:id_eksul', getAttendanceByEksul);

export default router;
