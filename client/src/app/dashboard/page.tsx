"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { format } from "date-fns";
import { MapPin, Sparkles, Bot, Plane } from "lucide-react";

import { api } from "@/lib/api/axios";
import CreateTripDialog from "@/components/dashboard/CreateTripDialog";
import DeleteTripDialog from "@/components/dashboard/DeleteTripDialog";
import { toast } from "sonner";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

interface Trip {
  _id: string;
  destination: string;
  days: number;
  budgetType: string;
  createdAt: string;
  aiProvider?: "gemini" | "fallback";
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

  const deleteTrip = async (tripId: string) => {
    try {
      await api.delete(`/trips/${tripId}`);

      toast.success("Trip deleted");

      fetchTrips();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete trip");
    }
  };

  const totalTrips = trips.length;

  const geminiTrips = trips.filter(
    (trip) => trip.aiProvider === "gemini",
  ).length;

  const fallbackTrips = trips.filter(
    (trip) => trip.aiProvider === "fallback",
  ).length;

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold">My Trips</h1>

          <p className="text-slate-500 mt-2">
            Manage and explore your AI generated travel plans.
          </p>
        </div>

        <CreateTripDialog onSuccess={fetchTrips} />
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-blue-600" />

            <p className="text-slate-500 text-sm">Total Trips</p>
          </div>

          <h2 className="text-4xl font-bold mt-3">{totalTrips}</h2>
        </div>

        <div className="bg-white border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-green-600" />

            <p className="text-slate-500 text-sm">Gemini Generated</p>
          </div>

          <h2 className="text-4xl font-bold mt-3 text-green-600">
            {geminiTrips}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-amber-600" />

            <p className="text-slate-500 text-sm">Fallback Generated</p>
          </div>

          <h2 className="text-4xl font-bold mt-3 text-amber-600">
            {fallbackTrips}
          </h2>
        </div>
      </div>

      {trips.length === 0 ? (
        <div className="border rounded-3xl bg-white p-16 text-center shadow-sm">
          <h2 className="text-2xl font-semibold">No Trips Yet</h2>

          <p className="text-slate-500 mt-3">
            Create your first AI-powered travel itinerary.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="
                bg-white
                border
                rounded-3xl
                p-6
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />

                    <h2 className="text-2xl font-bold">{trip.destination}</h2>
                  </div>

                  <p className="text-slate-500 mt-2">
                    {trip.days} Days • {trip.budgetType} Budget
                  </p>
                </div>

                {trip.aiProvider === "gemini" ? (
                  <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <Sparkles className="h-3 w-3" />
                    Gemini
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    <Bot className="h-3 w-3" />
                    Fallback
                  </span>
                )}
              </div>

              <p className="mt-6 text-sm text-slate-500">
                Created {format(new Date(trip.createdAt), "dd MMM yyyy")}
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  href={`/trips/${trip._id}`}
                  className="
      inline-flex
      w-full
      justify-center
      rounded-xl
      bg-blue-600
      text-white
      py-3
      hover:bg-blue-700
      transition
    "
                >
                  View Trip
                </Link>

                <DeleteTripDialog onDelete={() => deleteTrip(trip._id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
