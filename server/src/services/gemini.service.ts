import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateTripPlan = async (
  destination: string,
  days: number,
  budgetType: string,
  interests: string[],
) => {
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

  let result: any = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      result = await model.generateContent(prompt);
      break;
    } catch (error) {
      console.log(`Gemini attempt ${attempt} failed`);

      if (attempt === 3) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  if (!result) {
    throw new Error("Gemini failed after 3 attempts");
  }

  const text = result.response.text();

  console.log("Gemini Response:");
  console.log(text);

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};
