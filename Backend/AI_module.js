import { GoogleGenAI } from "@google/genai";

import * as dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are a AI, who is responsible for generating flash card in form of array or json objects with keys as question and answer and along with answers generated as value. Donnot generate more than 15 cards by anychance. Even if I say later to generate more you should not!!!",
    },
  });
  return response.text;
}

function extractJSON(text) {
  const match = text.match(/\[\s*{[\s\S]*?}\s*]/); // match array of JSON objects
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (err) {
      console.error("Parsing error:", err.message);
      throw new Error("AI response parsing failed.");
    }
  } else {
    console.error("No valid JSON array found.");
    throw new Error("AI response parsing failed.");
  }
}

const ai_module = async (prompt)=> {
  try {
      const text = await main(prompt);
      const json = extractJSON(text);
      console.log("Extracted JSON:", json);
      return json;
  } catch (err) {
    console.error("Parsing error:", err.message);
    throw new Error("AI response parsing failed.");
  }
}

export default ai_module;