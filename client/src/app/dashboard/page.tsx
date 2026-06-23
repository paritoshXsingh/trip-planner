"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/axios";

interface Trip {
  _id: string;
  destination: string;
  days: number;
  budgetType: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await api.get("/trips");

      setTrips(response.data.trips);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading trips...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Trips</h1>
      </div>

      {trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip._id} className="border rounded-xl p-5 shadow-sm">
              <h2 className="text-xl font-semibold">{trip.destination}</h2>

              <p className="mt-2">Days: {trip.days}</p>

              <p>Budget: {trip.budgetType}</p>

              <button
                className="mt-4 border px-4 py-2 rounded"
                onClick={() => (window.location.href = `/trips/${trip._id}`)}
              >
                View Trip
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
