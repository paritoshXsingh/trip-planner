import { Response } from "express";
import { Trip } from "../models/trip.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const createTrip = async (req: AuthRequest, res: Response) => {
  try {
    const { destination, days, budgetType, interests } = req.body;

    const trip = await Trip.create({
      userId: req.user?.id,

      destination,
      days,
      budgetType,
      interests,

      itinerary: [],
      budgetBreakdown: {},
      hotels: [],
      packingList: [],
    });

    res.status(201).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create trip",
    });
  }
};
