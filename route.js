import { Router } from 'express';
const router = Router();
import submitForm from './submitForm.js';

router.post('/contact', submitForm)

export { router };
