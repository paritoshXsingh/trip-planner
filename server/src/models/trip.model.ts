import mongoose, { Schema, Document } from "mongoose";

export interface ITrip extends Document {
  userId: mongoose.Types.ObjectId;
  destination: string;
  days: number;
  budgetType: "Low" | "Medium" | "High";
  interests: string[];

  itinerary: any[];

  budgetBreakdown: {
    flights: {
      type: Number;
      default: 0;
    };
    accommodation: {
      type: Number;
      default: 0;
    };
    food: {
      type: Number;
      default: 0;
    };
    activities: {
      type: Number;
      default: 0;
    };
    total: {
      type: Number;
      default: 0;
    };
  };

  hotels: any[];

  packingList: string[];
}

const tripSchema = new Schema<ITrip>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    budgetType: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    interests: [
      {
        type: String,
      },
    ],

    itinerary: [
      {
        type: Object,
      },
    ],

    budgetBreakdown: {
      flights: Number,
      accommodation: Number,
      food: Number,
      activities: Number,
      total: Number,
    },

    hotels: [
      {
        type: Object,
      },
    ],

    packingList: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Trip = mongoose.model<ITrip>("Trip", tripSchema);
