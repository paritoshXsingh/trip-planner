import { Response } from "express";
import { Trip } from "../models/trip.model";
import { AuthRequest } from "../middleware/auth.middleware";
import { generateTripPlan } from "../services/gemini.service";

export const createTrip = async (req: AuthRequest, res: Response) => {
  try {
    const { destination, days, budgetType, interests } = req.body;

    const aiPlan = await generateTripPlan(
      destination,
      days,
      budgetType,
      interests,
    );

    const trip = await Trip.create({
      userId: req.user?.id,

      destination,
      days,
      budgetType,
      interests,

      itinerary: aiPlan.itinerary,

      budgetBreakdown: aiPlan.budgetBreakdown,

      hotels: aiPlan.hotels,

      packingList: aiPlan.packingList,
    });

    res.status(201).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to generate trip",
    });
  }
};

export const getMyTrips = async (req: AuthRequest, res: Response) => {
  try {
    const trips = await Trip.find({
      userId: req.user?.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch trips",
    });
  }
};

export const getTripById = async (req: AuthRequest, res: Response) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user?.id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch trip",
    });
  }
};

export const deleteTrip = async (req: AuthRequest, res: Response) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trip deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete trip",
    });
  }
};

export const updateTrip = async (req: AuthRequest, res: Response) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user?.id,
      },
      req.body,
      {
        new: true,
      },
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update trip",
    });
  }
};

export const updateItinerary = async (req: AuthRequest, res: Response) => {
  try {
    const { itinerary } = req.body;

    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user?.id,
      },
      {
        itinerary,
      },
      {
        new: true,
      },
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update itinerary",
    });
  }
};
