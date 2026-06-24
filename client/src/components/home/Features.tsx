"use client";

import { Plane, Wallet, Hotel, Backpack } from "lucide-react";

import { motion } from "framer-motion";

const features = [
  {
    icon: Plane,
    title: "AI Itineraries",
    description: "Generate personalized day-by-day travel plans instantly.",
  },
  {
    icon: Wallet,
    title: "Budget Planning",
    description: "Get estimated travel costs before you book.",
  },
  {
    icon: Hotel,
    title: "Hotel Suggestions",
    description: "Discover accommodation options based on your budget.",
  },
  {
    icon: Backpack,
    title: "Packing Lists",
    description: "Receive smart packing recommendations for every trip.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Everything You Need To Travel Smarter
          </h2>

          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            TripPilot combines AI planning, budgeting and travel organization
            into one seamless experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                  bg-white
                  border
                  rounded-2xl
                  p-6
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                "
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>

                <h3 className="font-semibold text-xl mt-5">{feature.title}</h3>

                <p className="text-slate-500 mt-3">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
