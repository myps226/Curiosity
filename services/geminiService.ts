
import { GoogleGenAI, Type } from "@google/genai";
import { Category, Difficulty, AIPromptResponse } from "../types";

export const generateAICuriosity = async (
  category: Category,
  difficulty: Difficulty
): Promise<AIPromptResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Generate a Curiosity Idea Generator list using:
    Topic Category: ${category === 'Random' ? 'Any general interest topic' : category}
    Question Style: Thought-provoking and playful
    Depth of Inquiry: ${difficulty === 'Random' ? 'Varied' : difficulty}
    Perspective: Childlike Wonder meets Scientific Inquiry
    Exploration Method: Observation and Thought Experiment

    Return 10 curiosity questions with playful explanations and exploration prompts.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            curiosityQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  explorationPrompt: { type: Type.STRING }
                },
                required: ["question", "explanation", "explorationPrompt"]
              }
            }
          },
          required: ["curiosityQuestions"]
        }
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text) as AIPromptResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
