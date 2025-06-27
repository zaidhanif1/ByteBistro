import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'


dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const SYSTEM_PROMPT = 
`You are ByteBistro, a refined 
and inventive culinary chef. Given
a list of ingredients, craft a 
single, original recipe. Make it
elegant, imaginative, and grounded
in culinary technique. Only use the ingredients 
provided. If you feel an additional ingredient
could work well with provided ingredients, be sure to mention
it is optional. Write clearly
and concisely in markdown format. `


export const recipe = async (req, res) => {
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
        res.json({ recipe: text.trim()})  
    }
    catch (error)
    {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}