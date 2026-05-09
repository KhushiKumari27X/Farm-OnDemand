import express from "express";
import { getDashboardStats, getUsersByRole, deleteUser } from "../controllers/adminController.js";
import { protect, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply middleware to all admin routes
router.use(protect);
router.use(authorizeRole("admin"));

router.get("/stats", getDashboardStats);
router.get("/users/:role", getUsersByRole);
router.delete("/users/:id", deleteUser);

export default router;
