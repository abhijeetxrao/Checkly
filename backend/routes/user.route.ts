import express from 'express'
import { registerUser, loginUser, logoutUser } from '../controller/user.controller.ts';
import { authenticate } from '../middleware/user.middleware.ts';
const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout', logoutUser)

export default router;