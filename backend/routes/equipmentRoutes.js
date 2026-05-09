import express from "express";
import {
  getEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from "../controllers/equipmentController.js";
import { protect, authorizeRole } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getEquipment)
  .post(protect, authorizeRole("owner"), upload.single("image"), createEquipment);

router
  .route("/:id")
  .get(getEquipmentById)
  .put(protect, authorizeRole("owner", "admin"), upload.single("image"), updateEquipment)
  .delete(protect, authorizeRole("owner", "admin"), deleteEquipment);

export default router;
