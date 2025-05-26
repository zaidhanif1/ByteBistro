import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and
suggests a recipe.  Use markdown in the reply.`;

/**
 * 
 * @param {string[]} ingredients
 * @returns {Promise<string>}
 */
export async function getRecipeFromGemini(ingredients) {
  if (!ingredients.length) return "No ingredients provided.";

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `${SYSTEM_PROMPT}

Create a recipe using: ${ingredients.join(", ")}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();   // SDK helper
  return text.trim();
}
