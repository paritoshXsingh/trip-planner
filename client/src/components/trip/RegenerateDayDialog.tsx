"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  onRegenerate: (preference: string) => Promise<void>;
}

export default function RegenerateDayDialog({ onRegenerate }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [preference, setPreference] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await onRegenerate(preference);

      setOpen(false);

      setPreference("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="
    px-3 py-2
    rounded-lg
    bg-blue-600
    text-white
    text-sm
    hover:bg-blue-700
    transition
  "
        >
          ✨ Regenerate Day
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Regenerate Day Plan</DialogTitle>
        </DialogHeader>

        <textarea
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          placeholder="More outdoor activities, food experiences, nightlife..."
          className="w-full border rounded p-2 min-h-[120px]"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600
  text-white
  rounded-lg
  p-3
  mt-4
  w-full
  hover:bg-blue-700
  transition"
        >
          {loading ? "Regenerating..." : "Generate New Plan"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
