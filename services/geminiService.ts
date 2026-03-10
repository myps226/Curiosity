
import { GoogleGenAI, Type } from "@google/genai";
import { Category, Difficulty, AIPromptResponse, CuriosityTopic } from "../types";

export const generateDynamicTopic = async (
  category: Category,
  difficulty: Difficulty
): Promise<CuriosityTopic> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Generate a unique and highly specific curiosity topic for a "Curiosity Machine".
    
    Category: ${category === 'Random' ? 'Any fascinating niche field' : category}
    Depth: ${difficulty === 'Random' ? 'Medium' : difficulty}
    
    The topic should be a surprising "Why" or "How" question that sparks deep intellectual intimacy and curiosity.
    Avoid clichés. Focus on hidden patterns, forgotten history, or unusual science.
    
    Return the result as a single JSON object.
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
            question: { type: Type.STRING, description: "A punchy, fascinating curiosity question." },
            category: { type: Type.STRING, description: "The specific sub-category name." },
            prompts: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Exactly 6 deeper inquiry prompts or 'what if' questions related to the main question."
            },
            direction: { type: Type.STRING, description: "A brief guide on how to discuss this topic." },
            activity: { type: Type.STRING, description: "A simple, 1-minute mental or physical activity related to the topic." }
          },
          required: ["question", "category", "prompts", "direction", "activity"]
        }
      }
    });

    const topicData = JSON.parse(response.text || "{}");
    return {
      id: 'ai-' + Date.now(),
      ...topicData,
      // Ensure it stays within requested category if not random
      category: category !== 'Random' ? category : topicData.category
    } as CuriosityTopic;
  } catch (error) {
    console.error("Failed to generate dynamic topic:", error);
    throw error;
  }
};

export const generateAICuriosity = async (
  category: Category,
  difficulty: Difficulty
): Promise<AIPromptResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Generate a Deep Exploration list for:
    Category: ${category}
    Level: ${difficulty}
    
    Return 10 additional curiosity questions with playful explanations and exploration prompts.
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

    return JSON.parse(response.text || "{}") as AIPromptResponse;
  } catch (error) {
    console.error("Gemini API Error details:", error);
    throw error;
  }
};
