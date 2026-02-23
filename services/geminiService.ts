
import { GoogleGenAI, Type } from "@google/genai";
import { RecommendationRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGameRecommendation = async (req: RecommendationRequest) => {
  const prompt = `Act as a professional gaming consultant for a high-end PS5 cafe. 
  Recommend 3 PS5 games based on the following user input:
  Mood: ${req.mood}
  Preferences: ${req.preferences}
  Complexity: ${req.complexity}
  
  Format the output as JSON with an array of objects called 'recommendations', 
  each having 'title', 'reason', and 'whyThisMood'.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  whyThisMood: { type: Type.STRING }
                },
                required: ['title', 'reason', 'whyThisMood']
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || '{"recommendations": []}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return { recommendations: [] };
  }
};
