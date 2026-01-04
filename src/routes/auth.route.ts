import express from 'express';
import { login, register } from '../controller/auth.controller';

// Initializing the router
const router = express.Router();

// Defining routes for registeration and login
router.post('/', register)
router.post('/login', login)

// Exporting the router to be used in app.ts
export default router;