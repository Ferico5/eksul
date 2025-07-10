import express from 'express';
import { createAdmin } from '../controllers/AdminController.js';
import { getAdminLogin } from '../controllers/AdminLoginController.js';

const router = express.Router();

router.post('/admin/add-admin', createAdmin);
router.post('/admin/login', getAdminLogin);

export default router;
