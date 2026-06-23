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
  onAdd: (activity: string) => void;
}

export default function AddActivityDialog({ onAdd }: Props) {
  const [open, setOpen] = useState(false);

  const [activity, setActivity] = useState("");

  const handleAdd = () => {
    if (!activity.trim()) return;

    onAdd(activity);

    setActivity("");

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="border px-3 py-2 rounded">+ Add Activity</button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Activity</DialogTitle>
        </DialogHeader>

        <input
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Visit Eiffel Tower"
          className="w-full border rounded p-2"
        />

        <button onClick={handleAdd} className="bg-black text-white rounded p-2">
          Add Activity
        </button>
      </DialogContent>
    </Dialog>
  );
}
