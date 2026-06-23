"use client";

import { useState } from "react";
import { api } from "@/lib/api/axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  onSuccess: () => void;
}

export default function CreateTripDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    destination: "",
    days: 3,
    budgetType: "Medium",
    interests: "",
  });

  const resetForm = () => {
    setFormData({
      destination: "",
      days: 3,
      budgetType: "Medium",
      interests: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/trips", {
        destination: formData.destination,
        days: Number(formData.days),
        budgetType: formData.budgetType,
        interests: formData.interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      resetForm();

      setOpen(false);

      onSuccess();
    } catch (error) {
      console.error(error);

      alert("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition">
          + New Trip
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create AI Trip</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Destination</label>

            <input
              type="text"
              placeholder="Tokyo"
              value={formData.destination}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  destination: e.target.value,
                })
              }
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Number of Days</label>

            <input
              type="number"
              min={1}
              max={30}
              value={formData.days}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  days: Number(e.target.value),
                })
              }
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Budget Type</label>

            <select
              value={formData.budgetType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  budgetType: e.target.value,
                })
              }
              className="w-full border rounded-md p-2"
            >
              <option value="Low">Low</option>

              <option value="Medium">Medium</option>

              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Interests</label>

            <textarea
              placeholder="Food, Culture, Nightlife"
              value={formData.interests}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  interests: e.target.value,
                })
              }
              className="w-full border rounded-md p-2"
              rows={4}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-md py-2 disabled:opacity-50"
          >
            {loading
              ? "✨ Generating Your Personalized Trip..."
              : "Generate Trip"}
          </button>

          {loading && (
            <p className="text-sm text-center text-gray-500">
              This may take 5–15 seconds while AI generates your itinerary.
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
