import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const createFallbackTrip = (
  destination: string,
  days: number,
  budgetType: string,
  interests: string[],
) => {
  return {
    itinerary: Array.from({ length: days }, (_, index) => ({
      day: index + 1,
      activities: [
        `Explore popular attractions in ${destination}`,
        `Enjoy local food and culture`,
        `Experience activities related to ${interests[0] || "travel"}`,
      ],
    })),

    budgetBreakdown: {
      flights: budgetType === "High" ? 800 : 300,
      accommodation: budgetType === "High" ? 600 : 250,
      food: budgetType === "High" ? 300 : 120,
      activities: budgetType === "High" ? 200 : 80,
      total: budgetType === "High" ? 1900 : 750,
    },

    hotels: [
      {
        name: `${destination} Central Hotel`,
        type: budgetType,
      },
    ],

    packingList: [
      "Passport",
      "Phone Charger",
      "Power Bank",
      "Comfortable Walking Shoes",
      "Water Bottle",
      "Travel Documents",
    ],
  };
};

export const generateTripPlan = async (
  destination: string,
  days: number,
  budgetType: string,
  interests: string[],
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Generate a ${days}-day travel plan for ${destination}.

Budget Type: ${budgetType}

Interests: ${interests.join(", ")}

Return ONLY valid JSON using this schema:

{
  "itinerary":[
    {
      "day":1,
      "activities":[]
    }
  ],
  "budgetBreakdown":{
    "flights":0,
    "accommodation":0,
    "food":0,
    "activities":0,
    "total":0
  },
  "hotels":[
    {
      "name":"",
      "type":""
    }
  ],
  "packingList":[]
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return {
      provider: "gemini" as const,
      plan: JSON.parse(cleaned),
    };
  } catch (error) {
    console.log("Gemini unavailable. Using fallback trip.");

    return {
      provider: "fallback" as const,
      plan: createFallbackTrip(destination, days, budgetType, interests),
    };
  }
};

export const regenerateDayPlan = async (
  destination: string,
  day: number,
  budgetType: string,
  interests: string[],
  preference?: string,
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Generate activities ONLY for Day ${day}
of a trip to ${destination}.

Budget Type: ${budgetType}

Interests:
${interests.join(", ")}

Additional Preference:
${preference || "None"}

Return ONLY valid JSON.

{
  "day": ${day},
  "activities": [
    "Activity 1",
    "Activity 2",
    "Activity 3"
  ]
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return {
      provider: "gemini" as const,
      data: JSON.parse(cleaned),
    };
  } catch (error) {
    console.log("Gemini unavailable. Using fallback day.");

    return {
      provider: "fallback" as const,
      data: {
        day,
        activities: [
          `Explore famous attractions in ${destination}`,
          `Try local cuisine`,
          `Enjoy ${preference || interests[0] || "travel experiences"}`,
          `Discover local culture and landmarks`,
        ],
      },
    };
  }
};
