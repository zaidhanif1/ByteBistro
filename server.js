import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import axios from 'axios'
import { GoogleGenerativeAI } from '@google/generative-ai'




const app = express()
dotenv.config()
const allowed = process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
console.log('CORS whitelist', allowed)
app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin || allowed.includes(origin))   
          return cb(null, true);   
        console.log('DENIED', origin)               
        cb(new Error('CORS: origin not allowed → ' + origin));  
      },
      methods: ['GET', 'POST', 'OPTIONS'],               
    })
  );
  

app.use(express.json())


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const SYSTEM_PROMPT =
`You are an assistant that receives a list of ingredients and
suggests a recipe. Use markdown in the reply.
`


app.post('/api/recipe', async (req, res) => {
    const {ingredients} = req.body
    if (!Array.isArray(ingredients) || ingredients.length === 0)
    {
        return res.status(400).json({error: "No ingredients provided"})
    }


    try {
        const model = genAI.getGenerativeModel({model : 'gemini-1.5-flash'})
        const prompt = `${SYSTEM_PROMPT}\n Create a recipe using : ${ingredients.join(',')}`
        const result = await model.generateContent(prompt)
        const text = result.response.text()
        res.json({ recipe: text.trim() })
    }
    catch (error)
    {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


const PORT = process.env.PORT || 8000


app.listen(PORT, () => console.log(`Server connected on port: ${PORT}!`))