import { Plane } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Plane className="h-5 w-5 text-blue-600" />
          TripPilot
        </div>

        <p className="text-muted-foreground mt-3">Your AI Travel Co-Pilot</p>

        <p className="text-sm text-muted-foreground mt-6">
          © 2026 TripPilot. Built with Next.js, Express, MongoDB and Gemini AI.
        </p>
      </div>
    </footer>
  );
}
