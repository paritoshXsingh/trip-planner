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
  onAdd: (item: string) => void;
}

export default function AddPackingItemDialog({ onAdd }: Props) {
  const [open, setOpen] = useState(false);

  const [item, setItem] = useState("");

  const handleAdd = () => {
    if (!item.trim()) return;

    onAdd(item.trim());

    setItem("");

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="
            rounded-xl
            bg-blue-600
            px-5
            py-3
            text-white
            hover:bg-blue-700
            transition
          "
        >
          + Add Item
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Packing Item</DialogTitle>
        </DialogHeader>

        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Umbrella, Sunglasses..."
          className="
            w-full
            rounded-xl
            border
            p-3
            outline-none
            focus:border-blue-600
          "
        />

        <button
          onClick={handleAdd}
          className="
            mt-4
            w-full
            rounded-xl
            bg-blue-600
            py-3
            text-white
            hover:bg-blue-700
            transition
          "
        >
          Add Item
        </button>
      </DialogContent>
    </Dialog>
  );
}
