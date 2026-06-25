import { Router } from "express";
import {
  createTrip,
  getMyTrips,
  getTripById,
  deleteTrip,
  updateTrip,
  updateItinerary,
  regenerateDay,
  updatePackingList,
} from "../controllers/trip.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createTrip);

router.get("/", protect, getMyTrips);

router.get("/:id", protect, getTripById);

router.put("/:id", protect, updateTrip);

router.put("/:id/itinerary", protect, updateItinerary);

router.post("/:id/regenerate-day", protect, regenerateDay);

router.put("/:id/packing-list", protect, updatePackingList);

router.delete("/:id", protect, deleteTrip);

export default router;
