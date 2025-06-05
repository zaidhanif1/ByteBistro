import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI  = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model  = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let ingredients;
  try {
    ({ ingredients } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'ingredients must be a non-empty array' }) };
  }

  const prompt = `
You are an assistant that receives a list of ingredients and suggests a recipe. Use markdown in the reply.

Create a recipe using: ${ingredients.join(', ')}`;

  try {
    const result  = await model.generateContent(prompt);
    const recipe  = result.response.text().trim();
    return {
      statusCode: 200,
      body: JSON.stringify({ recipe })
    };
  } catch (err) {
    console.error('Gemini error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'failed to generate recipe' }) };
  }
}
