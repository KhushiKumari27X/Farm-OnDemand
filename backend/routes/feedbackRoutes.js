import express from "express";
import { createFeedback, getFeedback } from "../controllers/feedbackController.js";
import { protect, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, createFeedback)
  .get(protect, authorizeRole("admin"), getFeedback);

export default router;
