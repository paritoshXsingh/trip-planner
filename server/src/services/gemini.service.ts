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
        {
          time: "09:00 AM",
          description: `Visit top attractions in ${destination}`,
        },
        {
          time: "01:00 PM",
          description: `Experience ${interests[0] || "local culture"} activities`,
        },
        {
          time: "06:00 PM",
          description: "Enjoy authentic local cuisine",
        },
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
      {
        item: "Passport",
        packed: false,
        addedByUser: false,
      },
      {
        item: "Phone Charger",
        packed: false,
        addedByUser: false,
      },
      {
        item: "Power Bank",
        packed: false,
        addedByUser: false,
      },
      {
        item: "Comfortable Walking Shoes",
        packed: false,
        addedByUser: false,
      },
      {
        item: "Water Bottle",
        packed: false,
        addedByUser: false,
      },
      {
        item: "Travel Documents",
        packed: false,
        addedByUser: false,
      },
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
      "activities":[
  {
    "time":"09:00 AM",
    "description":"Visit Eiffel Tower"
  }
]
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
  "packingList":[
  {
    "item":"",
    "packed":false,
    "addedByUser":false
  }
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
  {
    "time":"09:00 AM",
    "description":"Activity 1"
  },
  {
    "time":"01:00 PM",
    "description":"Activity 2"
  },
  {
    "time":"06:00 PM",
    "description":"Activity 3"
  }
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
          {
            time: "09:00 AM",
            description: preference
              ? `Focus on ${preference} experiences in ${destination}`
              : `Visit must-see attractions in ${destination}`,
          },
          {
            time: "01:00 PM",
            description: `Enjoy activities related to ${interests[0] || "local culture"}`,
          },
          {
            time: "06:00 PM",
            description: `Try highly rated local restaurants and food spots`,
          },
          {
            time: "08:00 PM",
            description: `Explore hidden gems and cultural landmarks in ${destination}`,
          },
        ],
      },
    };
  }
};
