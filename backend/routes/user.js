import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET /api/users/profile
// Protected route: Needs a valid Token
router.get('/profile', protect, getUserProfile);

export default router;