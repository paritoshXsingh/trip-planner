"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api/axios";

import AddActivityDialog from "@/components/trip/AddActivityDialog";
import DeleteActivityDialog from "@/components/trip/DeleteActivityDialog";
import RegenerateDayDialog from "@/components/trip/RegenerateDayDialog";

import { toast } from "sonner";

import { MapPin, Sparkles, Bot } from "lucide-react";
import TripDetailsSkeleton from "@/components/trip/TripDetailsSkeleton";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PackingChecklist from "@/components/trip/PackingChecklist";
import ExportPdfButton from "@/components/trip/ExportPdfButton";

interface Activity {
  time?: string;
  description: string;
}
interface Trip {
  _id: string;

  destination: string;

  days: number;

  budgetType: string;

  aiProvider?: "gemini" | "fallback";

  itinerary: {
    day: number;
    activities: (string | Activity)[];
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

  packingList: {
    item: string;
    packed: boolean;
    addedByUser: boolean;
  }[];
}

export default function TripDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [trip, setTrip] = useState<Trip | null>(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const { id } = await params;

        const response = await api.get(`/trips/${id}`);

        setTrip(response.data.trip);
      } catch (error) {
        console.error(error);

        toast.error("Failed to load trip");
      }
    };

    void loadTrip();
  }, [params]);

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    if (!trip) return;

    const updatedTrip = structuredClone(trip);

    updatedTrip.itinerary[dayIndex].activities.splice(activityIndex, 1);

    setTrip(updatedTrip);
  };

  const saveItinerary = async () => {
    if (!trip) return;

    try {
      setSaving(true);

      await api.put(`/trips/${trip._id}/itinerary`, {
        itinerary: trip.itinerary,
      });

      toast.success("Itinerary saved successfully");
    } catch (error) {
      console.error(error);

      toast.error("Failed to save itinerary");
    } finally {
      setSaving(false);
    }
  };

  const regenerateDay = async (day: number, preference: string) => {
    if (!trip) return;

    try {
      const response = await api.post(`/trips/${trip._id}/regenerate-day`, {
        day,
        preference,
      });

      const updatedTrip = response.data.trip;

      setTrip(updatedTrip);

      if (response.data.provider === "gemini") {
        toast.success("✨ Day regenerated using Gemini");
      } else {
        toast.success("🤖 Day regenerated using Fallback");
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to regenerate day");
    }
  };

  if (!trip) {
    return <TripDetailsSkeleton />;
  }

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Header */}

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-7 w-7 text-blue-600" />

            <h1 className="text-5xl font-bold">{trip.destination}</h1>
          </div>

          <p className="text-slate-500">
            {trip.days} Days • {trip.budgetType} Budget
          </p>

          {trip.aiProvider === "gemini" ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 text-green-700 px-4 py-2">
              <Sparkles className="h-4 w-4" />
              Gemini Generated
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-700 px-4 py-2">
              <Bot className="h-4 w-4" />
              Fallback Generated
            </div>
          )}
        </div>

        {/* Itinerary */}

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">🗓 Itinerary</h2>

            <div className="flex gap-3">
              <ExportPdfButton trip={trip} />

              <button
                onClick={saveItinerary}
                disabled={saving}
                className="
        bg-blue-600
        text-white
        px-5
        py-2
        rounded-xl
        hover:bg-blue-700
        transition
      "
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {trip.itinerary.map((day, dayIndex) => (
              <div
                key={day.day}
                className="
                bg-white
                border
                rounded-3xl
                p-6
                shadow-sm
              "
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Day {day.day}</h3>

                  <RegenerateDayDialog
                    onRegenerate={(preference) =>
                      regenerateDay(day.day, preference)
                    }
                  />
                </div>

                <div className="space-y-3">
                  {day.activities.map((activity, activityIndex) => (
                    <div
                      key={activityIndex}
                      className="
                        flex
                        items-center
                        justify-between
                        border
                        rounded-xl
                        p-3
                      "
                    >
                      <div className="flex flex-col flex-1">
                        {typeof activity === "string" ? (
                          <span>{activity}</span>
                        ) : (
                          <>
                            {activity.time && (
                              <span className="text-xs font-medium text-blue-600">
                                {activity.time}
                              </span>
                            )}

                            <span className="font-medium">
                              {activity.description}
                            </span>
                          </>
                        )}
                      </div>

                      <DeleteActivityDialog
                        onDelete={() => removeActivity(dayIndex, activityIndex)}
                      />
                    </div>
                  ))}

                  <AddActivityDialog
                    onAdd={(activity) => {
                      const updatedTrip = structuredClone(trip);

                      updatedTrip.itinerary[dayIndex].activities.push({
                        time: "",
                        description: activity,
                      });

                      setTrip(updatedTrip);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Budget */}

        <section>
          <h2 className="text-3xl font-bold mb-6">💰 Budget Breakdown</h2>

          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-white border rounded-2xl p-4">
              <p className="text-slate-500">Flights</p>

              <h3 className="text-2xl font-bold">
                ${trip.budgetBreakdown.flights}
              </h3>
            </div>

            <div className="bg-white border rounded-2xl p-4">
              <p className="text-slate-500">Accommodation</p>

              <h3 className="text-2xl font-bold">
                ${trip.budgetBreakdown.accommodation}
              </h3>
            </div>

            <div className="bg-white border rounded-2xl p-4">
              <p className="text-slate-500">Food</p>

              <h3 className="text-2xl font-bold">
                ${trip.budgetBreakdown.food}
              </h3>
            </div>

            <div className="bg-white border rounded-2xl p-4">
              <p className="text-slate-500">Activities</p>

              <h3 className="text-2xl font-bold">
                ${trip.budgetBreakdown.activities}
              </h3>
            </div>

            <div className="bg-blue-600 text-white rounded-2xl p-4">
              <p>Total</p>

              <h3 className="text-2xl font-bold">
                ${trip.budgetBreakdown.total}
              </h3>
            </div>
          </div>
        </section>

        {/* Hotels */}

        <section>
          <h2 className="text-3xl font-bold mb-6">🏨 Hotels</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {trip.hotels.map((hotel, index) => (
              <div
                key={index}
                className="
                bg-white
                border
                rounded-2xl
                p-5
              "
              >
                <h3 className="font-semibold text-lg">{hotel.name}</h3>

                <p className="text-slate-500 mt-2">{hotel.type}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packing */}

        <section>
          <h2 className="text-3xl font-bold mb-6">🎒 Packing Checklist</h2>

          <PackingChecklist
            key={trip._id + JSON.stringify(trip.packingList)}
            tripId={trip._id}
            packingList={trip.packingList}
          />
        </section>
      </div>
    </ProtectedRoute>
  );
}
