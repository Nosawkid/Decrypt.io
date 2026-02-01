import express from 'express';
import {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser
} from '../controllers/authControllers.js';

const router = express.Router();

// POST /api/auth/register
// Creates a new agent and sends the induction email
router.post("/register", registerUser);

// POST /api/auth/login
// Returns Access Token (JSON) and sets Refresh Token (Cookie)
router.post("/login", loginUser);

// GET /api/auth/refresh
// Uses the Cookie to issue a new Access Token silently
router.get("/refresh", refreshToken);

// POST /api/auth/logout
// Clears the HttpOnly cookie so the user is truly logged out
router.post("/logout", logoutUser);

export default router;