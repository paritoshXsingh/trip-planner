"use client";

import { Download } from "lucide-react";
import { exportTripAsPDF, Trip } from "@/lib/pdf";

interface ExportPdfButtonProps {
  trip: Trip;
}

export default function ExportPdfButton({ trip }: ExportPdfButtonProps) {
  return (
    <button
      onClick={() => exportTripAsPDF(trip)}
      className="
        flex
        items-center
        gap-2
        bg-green-600
        text-white
        px-5
        py-2
        rounded-xl
        hover:bg-green-700
        transition
      "
    >
      <Download className="h-4 w-4" />
      Export PDF
    </button>
  );
}
