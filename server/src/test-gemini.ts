import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function testGemini() {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Return ONLY valid JSON.

{
  "city":"Tokyo",
  "days":3
}
`;

  const result = await model.generateContent(prompt);

  console.log(result.response.text());
}

testGemini();
