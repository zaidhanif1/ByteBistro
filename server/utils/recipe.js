import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'


dotenv.config()

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
const SYSTEM_PROMPT = 
`You are ByteBistro, a refined and inventive culinary chef.
Given a list of ingredients, craft a single, original recipe.
Make it elegant, imaginative, and grounded in culinary technique.
Only use the ingredients provided. If an extra ingredient would
work well, mark it as optional.

Format rules:
- Start the response with exactly one markdown H1: "# Recipe Title"
- Do not include greetings, intros, or preamble before the title
- Write the rest of the recipe in clear, concise markdown`


export const recipe = async (req, res) => {
    const { ingredients } = req.body ?? {};

    if (!Array.isArray(ingredients) || ingredients.length === 0) 
    {
        return res.status(400).json({
            error: "ingredients must be a non-empty array",
        });
    }

    const cleanedIngredients = ingredients
        .map((ingredient) => String(ingredient).trim())
        .filter(Boolean);

    if (cleanedIngredients.length === 0) 
    {
        return res.status(400).json({
            error: "At least one valid ingredient is required",
        });
    }

    try 
    {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Create a recipe using these ingredients: ${cleanedIngredients.join(", ")}.`,
            config: {
                systemInstruction: SYSTEM_PROMPT,
            },
        });

        const text = response.text?.trim();

        if (!text) {
            throw new Error("Gemini returned an empty response");
        }

        return res.status(200).json({
            recipe: text,
        });
    } 
    catch (error) 
    {
        console.error("Gemini recipe generation error:", error);

        if (error?.status === 429) 
        {
            return res.status(429).json({
                error: "The Gemini API rate limit or quota was exceeded. Please try again later.",
            });
        }

        return res.status(500).json({
            error: "Failed to generate a recipe",
            details:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};