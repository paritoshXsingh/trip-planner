import { Router } from "express";
import { createTrip } from "../controllers/trip.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createTrip);

export default router;
