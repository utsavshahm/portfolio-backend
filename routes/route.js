import { Router } from 'express';
const router = Router();
import submitForm from '../controllers/submitForm.js';

router.post('/contact', submitForm)

export { router };
