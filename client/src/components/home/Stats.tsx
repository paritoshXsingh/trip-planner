import { MapPinned, Plane, Sparkles } from "lucide-react";

const stats = [
  {
    icon: Plane,
    value: "1000+",
    label: "Trips Generated",
  },
  {
    icon: MapPinned,
    value: "50+",
    label: "Destinations Planned",
  },
  {
    icon: Sparkles,
    value: "AI Powered",
    label: "Smart Recommendations",
  },
];

export default function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="
                border rounded-2xl
                p-8
                text-center
                shadow-sm
                hover:shadow-lg
                transition
                duration-300
              "
              >
                <Icon className="h-10 w-10 text-blue-600 mx-auto mb-4" />

                <h3 className="text-4xl font-bold text-slate-900">
                  {item.value}
                </h3>

                <p className="mt-2 text-slate-500">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
