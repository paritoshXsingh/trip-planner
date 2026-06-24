"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose Destination",
    description: "Tell TripPilot where you want to travel.",
  },
  {
    number: "02",
    title: "Set Preferences",
    description: "Select budget, trip duration and interests.",
  },
  {
    number: "03",
    title: "Generate AI Plan",
    description: "Get a complete itinerary in seconds.",
  },
  {
    number: "04",
    title: "Start Exploring",
    description: "Travel confidently with your AI-powered guide.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">How TripPilot Works</h2>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Create a personalized trip plan in less than a minute.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="
                bg-white
                rounded-2xl
                border
                p-6
                shadow-sm
                hover:shadow-lg
                transition-all
              "
            >
              <div className="text-4xl font-bold text-blue-600">
                {step.number}
              </div>

              <h3 className="text-xl font-semibold mt-4">{step.title}</h3>

              <p className="mt-3 text-slate-500">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
