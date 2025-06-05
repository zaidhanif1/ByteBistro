import 'dotenv/config';               // loads .env
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

const PORT = process.env.PORT || 8000;

// ---------- Gemini setup ----------
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY missing from .env');
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// ---------- Express setup ----------
const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174', 
    'http://127.0.0.1:5173', 
    'http://127.0.0.1:5174',
    'https://bytebistro.netlify.app'
  ],
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/', (_, res) => res.json({ status: 'ok' }));

/**
 * POST /recipe
 * Body: { "ingredients": ["eggs","tomato","basil"] }
 * -> { recipe: "## Omelette Caprese\n..." }
 */
app.post('/recipe', async (req, res) => {
  const { ingredients } = req.body;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'ingredients must be a non-empty array' });
  }

  const prompt = `
You are an assistant that receives a list of ingredients and suggests a recipe. Use markdown in the reply.

Create a recipe using: ${ingredients.join(', ')}`;

  try {
    const result = await model.generateContent(prompt);
    const recipe = result.response.text().trim();
    res.json({ recipe });
  } catch (err) {
    console.error('Gemini error:', err?.response ?? err);
    res.status(500).json({ error: 'failed to generate recipe' });
  }
});

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/recipe`);
  console.log(`🔑 Gemini API Key configured: ${process.env.GEMINI_API_KEY ? '✅ Yes' : '❌ No'}`);
});
