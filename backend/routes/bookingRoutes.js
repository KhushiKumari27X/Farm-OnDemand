import express from "express";
import {
  createBooking,
  getMyBookings,
  getOwnerBookingRequests,
  updateBookingStatus,
  getAllBookings,
} from "../controllers/bookingController.js";
import { protect, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, authorizeRole("farmer"), createBooking)
  .get(protect, authorizeRole("admin"), getAllBookings);

router.route("/mybookings")
  .get(protect, authorizeRole("farmer"), getMyBookings);

router.route("/requests")
  .get(protect, authorizeRole("owner"), getOwnerBookingRequests);

router.route("/:id/status")
  .put(protect, authorizeRole("owner", "admin"), updateBookingStatus);

export default router;
