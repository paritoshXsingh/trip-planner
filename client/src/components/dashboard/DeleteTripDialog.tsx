"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  onDelete: () => void;
}

export default function DeleteTripDialog({ onDelete }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="
            w-full
            border
            border-red-200
            text-red-600
            py-3
            rounded-xl
            hover:bg-red-50
            transition
          "
        >
          Delete Trip
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Trip?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. The trip itinerary, hotels, budget
            details and packing list will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
