"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/axios";

interface Trip {
  _id: string;
  destination: string;
  days: number;
  budgetType: string;

  itinerary: {
    day: number;
    activities: string[];
  }[];

  budgetBreakdown: {
    flights: number;
    accommodation: number;
    food: number;
    activities: number;
    total: number;
  };

  hotels: {
    name: string;
    type: string;
  }[];

  packingList: string[];
}

export default function TripDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    const { id } = await params;

    const response = await api.get(`/trips/${id}`);

    setTrip(response.data.trip);
  };

  if (!trip) {
    return <div className="p-8">Loading trip...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">{trip.destination}</h1>

        <p className="text-gray-500 mt-2">
          {trip.days} Days • {trip.budgetType} Budget
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>

        <div className="space-y-4">
          {trip.itinerary.map((day) => (
            <div key={day.day} className="border rounded-lg p-4">
              <h3 className="font-bold">Day {day.day}</h3>

              <ul className="list-disc ml-5 mt-2">
                {day.activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Budget Breakdown</h2>

        <div className="border rounded-lg p-4">
          <p>Flights: ${trip.budgetBreakdown.flights}</p>

          <p>Accommodation: ${trip.budgetBreakdown.accommodation}</p>

          <p>Food: ${trip.budgetBreakdown.food}</p>

          <p>Activities: ${trip.budgetBreakdown.activities}</p>

          <p className="font-bold mt-2">Total: ${trip.budgetBreakdown.total}</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hotels</h2>

        {trip.hotels.map((hotel, index) => (
          <div key={index} className="border rounded-lg p-4 mb-2">
            <p className="font-semibold">{hotel.name}</p>

            <p>{hotel.type}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Packing List</h2>

        <ul className="list-disc ml-5">
          {trip.packingList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
