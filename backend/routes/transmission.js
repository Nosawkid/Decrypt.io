import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
    sendTransmission,
    getMyTransmissions,
    getSentTransmissions, // <--- Import these
    getStarredTransmissions,
    getLostTransmissions,
    readTransmission,
    toggleStar
} from "../controllers/transmissionControllers.js";

const router = express.Router();

// Base: /api/transmissions

// Lists
router.get("/inbox", protect, getMyTransmissions);
router.get("/sent", protect, getSentTransmissions);
router.get("/starred", protect, getStarredTransmissions);
router.get("/lost", protect, getLostTransmissions);

// Actions
router.post("/send", protect, sendTransmission);
router.post("/read/:id", protect, readTransmission); // Decrypt
router.put("/star/:id", protect, toggleStar); // Toggle Star

export default router;