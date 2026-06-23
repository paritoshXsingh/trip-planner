import { Router } from "express";
import {
  createTrip,
  getMyTrips,
  getTripById,
  deleteTrip,
} from "../controllers/trip.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createTrip);

router.get("/", protect, getMyTrips);

router.get("/:id", protect, getTripById);

router.delete("/:id", protect, deleteTrip);

export default router;
