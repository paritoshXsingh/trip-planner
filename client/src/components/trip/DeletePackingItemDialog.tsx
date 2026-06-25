"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";

interface Props {
  onDelete: () => void;
}

export default function DeletePackingItemDialog({ onDelete }: Props) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="
            rounded-lg
            border
            border-red-200
            px-3
            py-1
            text-sm
            text-red-600
            hover:bg-red-50
            transition
          "
        >
          Delete
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Packing Item</DialogTitle>
        </DialogHeader>

        <p className="text-slate-500">
          Are you sure you want to remove this item from your packing list?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="
              rounded-xl
              bg-red-600
              px-4
              py-2
              text-white
              hover:bg-red-700
            "
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
