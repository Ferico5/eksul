import express from 'express';
import { addEksul, removeEksul, listEksul, singleEksul, updateEksul } from '../controllers/EksulController.js';

const router = express.Router();

router.post('/eksul', addEksul);
router.delete('/eksul/:id_eksul', removeEksul);
router.get('/eksul', listEksul);
router.get('/eksul/:id_eksul', singleEksul);
router.put('/eksul/:id_eksul', updateEksul);

export default router;
